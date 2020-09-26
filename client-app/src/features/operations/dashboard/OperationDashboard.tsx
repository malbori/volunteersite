import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import OperationList from './OperationList';
import OperationDetails from '../details/OperationDetails';
import OperationForm from '../form/OperationForm';
import { observer } from 'mobx-react-lite';
import OperationStore from '../../../app/stores/operationStore';

const OperationDashboard: React.FC = () => {
  const operationStore = useContext(OperationStore);
  const {editMode, selectedOperation} = operationStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <OperationList />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedOperation && !editMode && (
          <OperationDetails />
        )}
        {editMode && (
          <OperationForm
            key={(selectedOperation && selectedOperation.id) || 0}
            operation={selectedOperation!}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(OperationDashboard);
