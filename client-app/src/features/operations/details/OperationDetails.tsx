import React, { useContext, useEffect } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import OperationStore from '../../../app/stores/operationStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { Link } from 'react-router-dom';

interface DetailParams {
  id: string;
}

const OperationDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
  const operationStore = useContext(OperationStore);
  const {
    operation,
    loadOperation,
    loadingInitial
  } = operationStore;

  useEffect(() => {
    loadOperation(match.params.id);
  }, [loadOperation, match.params.id]);

  if (loadingInitial || !operation) return <LoadingComponent content='Loading operation...' />

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${operation!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{operation!.title}</Card.Header>
        <Card.Meta>
          <span>{operation!.date}</span>
        </Card.Meta>
        <Card.Description>{operation!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to={`/manage/${operation.id}`}
            basic
            color='blue'
            content='Edit'
          />
          <Button
            onClick={() => history.push('/operations')}
            basic
            color='grey'
            content='Cancel'
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(OperationDetails);
