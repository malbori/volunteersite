import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IOperation } from '../../../app/models/operation';
import { v4 as uuid } from 'uuid';
import OperationStore from '../../../app/stores/operationStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';

interface DetailParams {
    id: string;
}

const OperationForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {

    const operationStore = useContext(OperationStore);
    
    const {
        createOperation,
        editOperation,
        submitting,
        operation: initialFormState,
        loadOperation,
        clearOperation
    } = operationStore;

    const [operation, setOperation] = useState<IOperation>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (match.params.id && operation.id.length === 0) {
            loadOperation(match.params.id).then(
                () => initialFormState && setOperation(initialFormState)
            );
        }
        return () => {
            clearOperation()
        }
    }, [loadOperation, clearOperation, match.params.id, initialFormState, operation.id.length]);

    const handleSubmit = () => {
        if (operation.id.length === 0) {
            let newOperation = {
                ...operation,
                id: uuid()
            };
            createOperation(newOperation).then(() => history.push(`/operations/${newOperation.id}`))
        } else {
            editOperation(operation).then(() => history.push(`/operations/${operation.id}`));
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
                <Button
                    loading={submitting}
                    floated='right'
                    positive
                    type='submit'
                    content='Submit'
                />
                <Button
                    onClick={() => history.push('/operations')}
                    floated='right'
                    type='button'
                    content='Cancel'
                />
            </Form>
        </Segment>
    );
};

export default observer(OperationForm);
