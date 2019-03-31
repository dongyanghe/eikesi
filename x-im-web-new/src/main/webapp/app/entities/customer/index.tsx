import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Customer from 'app/entities/customer/customer';
import CustomerDetail from 'app/entities/customer/customer-detail';
import CustomerUpdate from 'app/entities/customer/customer-update';
import CustomerDeleteDialog from 'app/entities/customer/customer-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CustomerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CustomerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CustomerDetail} />
      <ErrorBoundaryRoute path={match.url} component={Customer} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CustomerDeleteDialog} />
  </>
);

export default Routes;
