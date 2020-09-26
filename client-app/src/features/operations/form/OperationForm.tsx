import React, { useState, FormEvent, useContext } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IOperation } from '../../../app/models/operation';
import { v4 as uuid } from 'uuid';
import OperationStore from '../../../app/stores/operationStore';
import { observer } from 'mobx-react-lite';

interface IProps {
    operation: IOperation;
}

const OperationForm: React.FC<IProps> = ({
    operation: initialFormState,
}) => {
    const operationStore = useContext(OperationStore);
    const { createOperation, editOperation, submitting, cancelFormOpen } = operationStore;
    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState;
        } else {
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            };
        }
    };

    const [operation, setOperation] = useState<IOperation>(initializeForm);

    const handleSubmit = () => {
        if (operation.id.length === 0) {
            let newOperation = {
                ...operation,
                id: uuid()
            };
            createOperation(newOperation);
        } else {
            editOperation(operation);
        }
    };

    const handleInputChange = (
        event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.currentTarget;
        setOperation({ ...operation, [name]: value });
    };

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    onChange={handleInputChange}
                    name='title'
                    placeholder='Title'
                    value={operation.title}
                />
                <Form.TextArea
                    onChange={handleInputChange}
                    name='description'
                    rows={2}
                    placeholder='Description'
                    value={operation.description}
                />
                <Form.Input
                    onChange={handleInputChange}
                    name='category'
                    placeholder='Category'
                    value={operation.category}
                />
                <Form.Input
                    onChange={handleInputChange}
                    name='date'
                    type='datetime-local'
                    placeholder='Date'
                    value={operation.date}
                />
                <Form.Input
                    onChange={handleInputChange}
                    name='city'
                    placeholder='City'
                    value={operation.city}
                />
                <Form.Input
                    onChange={handleInputChange}
                    name='venue'
                    placeholder='Venue'
                    value={operation.venue}
                />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button
                    onClick={cancelFormOpen}
                    floated='right'
                    type='button'
                    content='Cancel'
                />
            </Form>
        </Segment>
    );
};

export default observer(OperationForm);
