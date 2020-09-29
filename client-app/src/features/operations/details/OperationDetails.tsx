import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import OperationDetailedHeader from './OperationDetailedHeader';
import OperationDetailedInfo from './OperationDetailedInfo';
import OperationDetailedChat from './OperationDetailedChat';
import OperationDetailedSidebar from './OperationDetailedSidebar';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface DetailParams {
  id: string;
}

const OperationDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const { operation, loadOperation, loadingInitial } = rootStore.operationStore;

  useEffect(() => {
    loadOperation(match.params.id);
  }, [loadOperation, match.params.id, history]);

  if (loadingInitial) return <LoadingComponent content='Loading operation...' />;

  if (!operation) return <h2>Operation not found</h2>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <OperationDetailedHeader operation={operation} />
        <OperationDetailedInfo operation={operation} />
        <OperationDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <OperationDetailedSidebar attendees={operation.attendees} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(OperationDetails);
