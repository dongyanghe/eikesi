import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FlockRelation from './flock-relation';
import FlockRelationDetail from './flock-relation-detail';
import FlockRelationUpdate from './flock-relation-update';
import FlockRelationDeleteDialog from './flock-relation-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FlockRelationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FlockRelationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FlockRelationDetail} />
      <ErrorBoundaryRoute path={match.url} component={FlockRelation} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FlockRelationDeleteDialog} />
  </>
);

export default Routes;
