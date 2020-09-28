import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import OperationStore from '../../../app/stores/operationStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import OperationDetailedHeader from './OperationDetailedHeader';
import OperationDetailedInfo from './OperationDetailedInfo';
import OperationDetailedChat from './OperationDetailedChat';
import OperationDetailedSidebar from './OperationDetailedSidebar';

interface DetailParams {
  id: string;
}

const OperationDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const operationStore = useContext(OperationStore);
  const { operation, loadOperation, loadingInitial } = operationStore;

  useEffect(() => {
    loadOperation(match.params.id);
  }, [loadOperation, match.params.id, history]);

  if (loadingInitial) return <LoadingComponent content='Loading operation...' />;

  if (!operation) return <h2>Event not found</h2>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <OperationDetailedHeader operation={operation} />
        <OperationDetailedInfo operation={operation} />
        <OperationDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <OperationDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(OperationDetails);
