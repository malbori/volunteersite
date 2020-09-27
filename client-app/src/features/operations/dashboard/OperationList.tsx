import React, { useContext, Fragment } from 'react';
import { Item, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import OperationStore from '../../../app/stores/operationStore';
import OperationListItem from './OperationListItem';

const OperationList: React.FC = () => {
  const operationStore = useContext(OperationStore);
  const { operationsByDate } = operationStore;
  return (
    <Fragment>
      {operationsByDate.map(([group, operations]) => (
        <Fragment key={group}>
          <Label size='large' color='blue'>
            {group}
          </Label>
          <Item.Group divided>
            {operations.map(operation => (
              <OperationListItem key={operation.id} operation={operation} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(OperationList);
