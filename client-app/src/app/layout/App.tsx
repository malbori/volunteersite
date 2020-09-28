import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import OperationDashboard from '../../features/operations/dashboard/OperationDashboard';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import OperationForm from '../../features/operations/form/OperationForm';
import OperationDetails from '../../features/operations/details/OperationDetails';
import NotFound from './NotFound';

const App: React.FC<RouteComponentProps> = ({ location }) => {


  return (
    <Fragment>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path={'/(.+)'} render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/operations' component={OperationDashboard} />
              <Route path='/operations/:id' component={OperationDetails} />
              <Route
                key={location.key}
                path={['/createOperation', '/manage/:id']}
                component={OperationForm}
              />
            </Container>
          </Fragment>
        )}
        />
        <Route component={NotFound} />
      </Switch>

    </Fragment>
  );
};

export default withRouter(observer(App));
