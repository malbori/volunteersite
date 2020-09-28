import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import OperationDashboard from '../../features/operations/dashboard/OperationDashboard';
import { observer } from 'mobx-react-lite';
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch
} from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import OperationForm from '../../features/operations/form/OperationForm';
import OperationDetails from '../../features/operations/details/OperationDetails';
import NotFound from './NotFound';
import {ToastContainer} from 'react-toastify';

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route exact path='/operations' component={OperationDashboard} />
                <Route path='/operations/:id' component={OperationDetails} />
                <Route
                  key={location.key}
                  path={['/createOperation', '/manage/:id']}
                  component={OperationForm}
                />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
