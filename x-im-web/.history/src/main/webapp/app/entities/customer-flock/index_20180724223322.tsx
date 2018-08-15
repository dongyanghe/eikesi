import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CustomerFlock from './customer-flock';
import CustomerFlockDetail from './customer-flock-detail';
import CustomerFlockUpdate from './customer-flock-update';
import CustomerFlockDeleteDialog from './customer-flock-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CustomerFlockUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CustomerFlockUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CustomerFlockDetail} />
      <ErrorBoundaryRoute path={match.url} component={CustomerFlock} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CustomerFlockDeleteDialog} />
  </>
);

export default Routes;
