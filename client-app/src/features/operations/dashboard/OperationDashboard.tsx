import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import OperationList from "./OperationList";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";

const OperationDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadOperations, loadingInitial } = rootStore.operationStore;
  useEffect(() => {
    loadOperations();
  }, [loadOperations]);

  if (loadingInitial)
    return <LoadingComponent content="Loading operations..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <OperationList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Operation filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(OperationDashboard);
