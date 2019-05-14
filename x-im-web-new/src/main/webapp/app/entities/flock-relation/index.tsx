import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FlockRelation from 'app/entities/flock-relation/flock-relation';
import FlockRelationDetail from 'app/entities/flock-relation/flock-relation-detail';
import FlockRelationUpdate from 'app/entities/flock-relation/flock-relation-update';
import FlockRelationDeleteDialog from 'app/entities/flock-relation/flock-relation-delete-dialog';

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
