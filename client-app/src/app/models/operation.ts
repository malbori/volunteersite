export interface IOperation {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
    isGoing: boolean;
    isHost: boolean;
    attendees: IAttendee[]
}

export interface IOperationFormValues extends Partial<IOperation> {
    time?: Date;
}

export class OperationFormValues implements IOperationFormValues {
    id?: string = undefined;
    title: string = '';
    category: string = '';
    description: string = '';
    date?: Date = undefined;
    time?: Date = undefined;
    city: string = '';
    venue: string = '';

    constructor(init?: IOperationFormValues) {
        if (init && init.date) {
            init.time = init.date;
        }  
        Object.assign(this, init);
    }
}

export interface IAttendee {
    username: string;
    displayName: string;
    image: string;
    isHost: boolean;
}