import { observable, action, computed, runInAction, reaction, toJS } from "mobx";
import { SyntheticEvent } from "react";
import { IOperation } from "../models/operation";
import agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";
import { setOperationProps, createAttendee } from "../common/util/util";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

const LIMIT = 3;

export default class OperationStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.predicate.keys(),
      () => {
        this.page = 0;
        this.operationRegistry.clear();
        this.loadOperations();
      }
    )
  }

  @observable operationRegistry = new Map();
  @observable operation: IOperation | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";
  @observable loading = false;
  @observable.ref hubConnection: HubConnection | null = null;
  @observable operationCount = 0;
  @observable page = 0;
  @observable predicate = new Map();

  @action setPredicate = (predicate: string, value: string | Date) => {
    this.predicate.clear();
    if (predicate !== 'all') {
      this.predicate.set(predicate, value);
    }
  }

  @computed get axiosParams() {
    const params = new URLSearchParams();
    params.append('limit', String(LIMIT));
    params.append('offset', `${this.page ? this.page * LIMIT : 0}`);
    this.predicate.forEach((value, key) => {
      if (key === 'startDate') {
        params.append(key, value.toISOString())
      } else {
        params.append(key, value)
      }
    })
    return params;
  }

  @computed get totalPages() {
    return Math.ceil(this.operationCount / LIMIT);
  }

  @action setPage = (page: number) => {
    this.page = page;
  };

  @action createHubConnection = (operationId: string) => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_API_CHAT_URL!, {
        accessTokenFactory: () => this.rootStore.commonStore.token!,
      })
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log(this.hubConnection!.state))
      .then(() => {
        if (this.hubConnection!.state === "Connected") {
          this.hubConnection!.invoke("AddToGroup", operationId);
        }
      })
      .catch((error) => console.log("Error establishing connection: ", error));

    this.hubConnection.on("ReceiveComment", (comment) => {
      runInAction(() => {
        this.operation!.comments.push(comment);
      });
    });
    this.hubConnection.on("Send", (Message) => {
      toast.info(Message);
    });
  };

  @action stopHubConnection = () => {
    this.hubConnection!.invoke("RemoveFromGroup", this.operation!.id)
      .then(() => {
        this.hubConnection!.stop();
      })
      .then(() => console.log("Connection stopped"))
      .catch((err) => console.log(err));
  };

  @action addComment = async (values: any) => {
    values.operationId = this.operation!.id;
    try {
      await this.hubConnection!.invoke("SendComment", values);
    } catch (error) {
      console.log(error);
    }
  };

  @computed get operationsByDate() {
    return this.groupOperationsByDate(
      Array.from(this.operationRegistry.values())
    );
  }

  groupOperationsByDate(operations: IOperation[]) {
    const sortedOperations = operations.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    return Object.entries(
      sortedOperations.reduce((operations, operation) => {
        const date = operation.date.toISOString().split("T")[0];
        operations[date] = operations[date]
          ? [...operations[date], operation]
          : [operation];
        return operations;
      }, {} as { [key: string]: IOperation[] })
    );
  }

  @action loadOperations = async () => {
    this.loadingInitial = true;
    try {

      const operationsEnvelope = await agent.Operations.list(this.axiosParams);
      const { operations, operationCount } = operationsEnvelope;

      runInAction("loading operations", () => {
        operations.forEach((operation) => {
          setOperationProps(operation, this.rootStore.userStore.user!);
          this.operationRegistry.set(operation.id, operation);
        });
        this.operationCount = operationCount;
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("load operations error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadOperation = async (id: string) => {
    let operation = this.getOperation(id);
    if (operation) {
      this.operation = operation;
      return toJS(operation);
    } else {
      this.loadingInitial = true;
      try {
        operation = await agent.Operations.details(id);
        runInAction("getting operation", () => {
          setOperationProps(operation, this.rootStore.userStore.user!);
          this.operation = operation;
          this.operationRegistry.set(operation.id, operation);
          this.loadingInitial = false;
        });
        return operation;
      } catch (error) {
        runInAction("get operation error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action clearOperation = () => {
    this.operation = null;
  };

  getOperation = (id: string) => {
    return this.operationRegistry.get(id);
  };

  @action createOperation = async (operation: IOperation) => {
    this.submitting = true;
    try {
      await agent.Operations.create(operation);
      const attendee = createAttendee(this.rootStore.userStore.user!);
      attendee.isHost = true;
      let attendees = [];
      attendees.push(attendee);
      operation.attendees = attendees;
      operation.comments = [];
      operation.isHost = true;
      runInAction("creating operation", () => {
        this.operationRegistry.set(operation.id, operation);
        this.submitting = false;
      });
      history.push(`/operations/${operation.id}`);
    } catch (error) {
      runInAction("create operation error", () => {
        this.submitting = false;
      });
      toast.error("Problem submitting data");
      console.log(error.response);
    }
  };
  @action editOperation = async (operation: IOperation) => {
    this.submitting = true;
    try {
      await agent.Operations.update(operation);
      runInAction("editig operation", () => {
        this.operationRegistry.set(operation.id, operation);
        this.operation = operation;
        this.submitting = false;
      });
      history.push(`/operations/${operation.id}`);
    } catch (error) {
      runInAction("edit operation error", () => {
        this.submitting = false;
      });
      toast.error("Problem submittig data");
      console.log(error.response);
    }
  };
  @action deleteOperation = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Operations.delete(id);
      runInAction("deleting operation", () => {
        this.operationRegistry.delete(id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction(" delete operation error", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };
  @action attendOperation = async () => {
    const attendee = createAttendee(this.rootStore.userStore.user!);
    this.loading = true;
    try {
      await agent.Operations.attend(this.operation!.id);
      runInAction(() => {
        if (this.operation) {
          this.operation.attendees.push(attendee);
          this.operation.isGoing = true;
          this.operationRegistry.set(this.operation.isGoing, this.operation);
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("Problem singing up to operation");
    }
  };
  @action cancelAttendance = async () => {
    this.loading = true;
    try {
      await agent.Operations.unattend(this.operation!.id);
      runInAction(() => {
        if (this.operation) {
          this.operation.attendees = this.operation.attendees.filter(
            (a) => a.userName !== this.rootStore.userStore.user!.username
          );
          this.operation.isGoing = false;
          this.operationRegistry.set(this.operation.isGoing, this.operation);
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error("Problem cancelling attendance");
    }
  };
}
