import React, { useContext, useEffect, useState } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import OperationList from './OperationList';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import InfiniteScroll from 'react-infinite-scroller';
import OperationFilters from './OperationFilters';
import OperationListItemPlaceholder from './OperationListItemPlaceholder';

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

  return (
    <Grid>
      <Grid.Column width={10}>
        {loadingInitial && page === 0 ? (
          <OperationListItemPlaceholder />
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!loadingNext && page + 1 < totalPages}
            initialLoad={false}
          >
            <OperationList />
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <OperationFilters />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(OperationDashboard);
