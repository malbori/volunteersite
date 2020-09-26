import React, { useContext } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import OperationStore from '../../../app/stores/operationStore';

const OperationList: React.FC = () => {
  const operationStore = useContext(OperationStore);
  const { operationsByDate, selectOperation, deleteOperation, submitting, target } = operationStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {operationsByDate.map(operation => (
          <Item key={operation.id}>
            <Item.Content>
              <Item.Header as='a'>{operation.title}</Item.Header>
              <Item.Meta>{operation.date}</Item.Meta>
              <Item.Description>
                <div>{operation.description}</div>
                <div>
                  {operation.city}, {operation.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectOperation(operation.id)}
                  floated='right'
                  content='View'
                  color='blue'
                />
                <Button
                  name={operation.id}
                  loading={target === operation.id && submitting}
                  onClick={(e) => deleteOperation(e, operation.id)}
                  floated='right'
                  content='Delete'
                  color='red'
                />
                <Label basic content={operation.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(OperationList);
