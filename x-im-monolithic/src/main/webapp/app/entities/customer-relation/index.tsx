import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CustomerRelation from './customer-relation';
import CustomerRelationDetail from './customer-relation-detail';
import CustomerRelationUpdate from './customer-relation-update';
import CustomerRelationDeleteDialog from './customer-relation-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CustomerRelationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CustomerRelationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CustomerRelationDetail} />
      <ErrorBoundaryRoute path={match.url} component={CustomerRelation} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CustomerRelationDeleteDialog} />
  </>
);

export default Routes;
