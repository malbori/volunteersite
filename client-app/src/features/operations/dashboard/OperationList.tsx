import React, { useContext, Fragment } from 'react';
import { Item, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import OperationListItem from './OperationListItem';
import { RootStoreContext } from '../../../app/stores/rootStore';
import {format} from 'date-fns';

const OperationList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { operationsByDate } = rootStore.operationStore;
  return (
    <Fragment>
      {operationsByDate.map(([group, operations]) => (
        <Fragment key={group}>
          <Label size='large' color='blue'>
            {format(Date.parse(group), 'eeee do MMMM')}
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