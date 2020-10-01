import React, { useContext, useEffect, useState } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import OperationList from './OperationList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';
import InfiniteScroll from 'react-infinite-scroller';
//import OperationFilters from './OperationFilters';

const OperationDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadOperations,
    loadingInitial,
    setPage,
    page,
    totalPages
  } = rootStore.operationStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadOperations().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadOperations();
  }, [loadOperations]);

  if (loadingInitial && page === 0)
    return <LoadingComponent content='Loading operations' />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <InfiniteScroll
          pageStart={0}
          loadMore={handleGetNext}
          hasMore={!loadingNext && page + 1 < totalPages}
          initialLoad={false}
        >
          <OperationList />
        </InfiniteScroll>
      </Grid.Column>
      <Grid.Column width={6}>
        {/* <OperationFilters /> */}
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(OperationDashboard);
