import React, { useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import OperationDashboard from '../../features/operations/dashboard/OperationDashboard';
import { LoadingComponent } from './LoadingComponent';
import { observer } from 'mobx-react-lite';
import OperationStore from '../stores/operationStore';

const App = () => {
  const operationStore = useContext(OperationStore)

  useEffect(() => {
    operationStore.loadOperations();
  }, [operationStore]);

  if (operationStore.loadingInitial) return <LoadingComponent content='Loading operations' />

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <OperationDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
