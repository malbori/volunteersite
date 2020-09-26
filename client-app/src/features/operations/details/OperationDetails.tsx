import React, { useContext } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import OperationStore from '../../../app/stores/operationStore';
import { observer } from 'mobx-react-lite';

const OperationDetails: React.FC = () => {
    const operationStore = useContext(OperationStore);
    const { selectedOperation: operation, openEditForm, cancelSelectedOperation } = operationStore;
    return (
        <Card fluid>
            <Image
                src={`/assets/categoryImages/${operation!.category}.jpg`}
                wrapped
                ui={false}
            />
            <Card.Content>
                <Card.Header>{operation!.title}</Card.Header>
                <Card.Meta>
                    <span>{operation!.date}</span>
                </Card.Meta>
                <Card.Description>{operation!.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button
                        onClick={() => openEditForm(operation!.id)}
                        basic
                        color='blue'
                        content='Edit'
                    />
                    <Button
                        onClick={cancelSelectedOperation}
                        basic
                        color='grey'
                        content='Cancel'
                    />
                </Button.Group>
            </Card.Content>
        </Card>
    );
};

export default observer(OperationDetails);
