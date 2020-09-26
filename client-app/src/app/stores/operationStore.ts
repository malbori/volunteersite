import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IOperation } from '../models/operation';
import agent from '../api/agent';

// enabling strict mobx
// make sure observable values are changed only within actions
configure({ enforceActions: 'always' });

class OperationStore {
    @observable operationRegistry = new Map();
    @observable operations: IOperation[] = [];
    @observable selectedOperation: IOperation | undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';


    //return events by ordered date
    @computed get operationsByDate() {
        return Array.from(this.operationRegistry.values()).sort(
            (a, b) => Date.parse(a.date) - Date.parse(b.date)
        );
    }

    // load the events
    @action loadOperations = async () => {
        this.loadingInitial = true;
        try {
            const operations = await agent.Operations.list();
            runInAction('loading events', () => {
                operations.forEach(operation => {
                    operation.date = operation.date.split('.')[0];
                    this.operationRegistry.set(operation.id, operation);
                });
                this.loadingInitial = false;
            })

        } catch (error) {
            runInAction('load events error', () => {
                this.loadingInitial = false;
            })
        }
    };

    @action createOperation = async (operation: IOperation) => {
        this.submitting = true;
        try {
            await agent.Operations.create(operation);
            runInAction('create event', () => {
                this.operationRegistry.set(operation.id, operation);
                this.editMode = false;
                this.submitting = false;
            })
        } catch (error) {
            runInAction('create event error', () => {
                this.submitting = false;
            })
            console.log(error);
        }
    };

    @action editOperation = async (operation: IOperation) => {
        this.submitting = true;
        try {
            await agent.Operations.update(operation);
            runInAction('editing event', () => {
                this.operationRegistry.set(operation.id, operation);
                this.selectedOperation = operation;
                this.editMode = false;
                this.submitting = false;
            })

        } catch (error) {
            runInAction('edit event error', () => {
                this.submitting = false;
            })
            console.log(error);
        }
    };

    @action deleteOperation = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Operations.delete(id);
            runInAction('deleting event', () => {
                this.operationRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            })
        } catch (error) {
            runInAction('delete event error', () => {
                this.submitting = false;
                this.target = '';
            })
            console.log(error);
        }
    }

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedOperation = undefined;
    };

    @action openEditForm = (id: string) => {
        this.selectedOperation = this.operationRegistry.get(id);
        this.editMode = true;
    }

    @action cancelSelectedOperation = () => {
        this.selectedOperation = undefined;
    }

    @action cancelFormOpen = () => {
        this.editMode = false;
    }

    @action selectOperation = (id: string) => {
        this.selectedOperation = this.operationRegistry.get(id);
        this.editMode = false;
    };
}

export default createContext(new OperationStore());
