import { observable, action, computed, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import { IOperation } from '../models/operation';
import agent from '../api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';
import {RootStore} from './rootStore';

export default class OperationStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable operationRegistry = new Map();
  @observable operation: IOperation | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get operationsByDate() {
    return this.groupOperationsByDate(Array.from(this.operationRegistry.values()))
  }

  groupOperationsByDate(operations: IOperation[]) {
    const sortedOperations = operations.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    )
    return Object.entries(sortedOperations.reduce((operations, operation) => {
      const date = operation.date.toISOString().split('T')[0];
      operations[date] = operations[date] ? [...operations[date], operation] : [operation];
      return operations;
    }, {} as {[key: string]: IOperation[]}));
  }

  @action loadOperations = async () => {
    this.loadingInitial = true;
    try {
      const operations = await agent.Operations.list();
      runInAction('loading operations', () => {
        operations.forEach(operation => {
          operation.date = new Date(operation.date);
          this.operationRegistry.set(operation.id, operation);
        });
        this.loadingInitial = false;
      })
    } catch (error) {
      runInAction('load operations error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action loadOperation = async (id: string) => {
    let operation = this.getOperation(id);
    if (operation) {
      this.operation = operation;
      return operation;
    } else {
      this.loadingInitial = true;
      try {
        operation = await agent.Operations.details(id);
        runInAction('getting operation',() => {
          operation.date = new Date(operation.date);
          this.operation = operation;
          this.operationRegistry.set(operation.id, operation);
          this.loadingInitial = false;
        })
        return operation;
      } catch (error) {
        runInAction('get operation error', () => {
          this.loadingInitial = false;
        })
        console.log(error);
      }
    }
  }

  @action clearOperation = () => {
    this.operation = null;
  }

  getOperation = (id: string) => {
    return this.operationRegistry.get(id);
  }

  @action createOperation = async (operation: IOperation) => {
    this.submitting = true;
    try {
      await agent.Operations.create(operation);
      runInAction('create operation', () => {
        this.operationRegistry.set(operation.id, operation);
        this.submitting = false;
      })
      history.push(`/operations/${operation.id}`)
    } catch (error) {
      runInAction('create operation error', () => {
        this.submitting = false;
      })
      toast.error('Problem submitting data');
      console.log(error.response);
    }
  };

  @action editOperation = async (operation: IOperation) => {
    this.submitting = true;
    try {
      await agent.Operations.update(operation);
      runInAction('editing operation', () => {
        this.operationRegistry.set(operation.id, operation);
        this.operation = operation;
        this.submitting = false;
      })
      history.push(`/operations/${operation.id}`)
    } catch (error) {
      runInAction('edit operation error', () => {
        this.submitting = false;
      })
      toast.error('Problem submitting data');
      console.log(error);
    }
  };

  @action deleteOperation = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Operations.delete(id);
      runInAction('deleting operation', () => {
        this.operationRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete operation error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}
