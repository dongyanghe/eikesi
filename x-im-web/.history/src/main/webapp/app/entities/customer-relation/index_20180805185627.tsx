import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CustomerRelation from 'app/entities/customer-relation/customer-relation';
import CustomerRelationDetail from 'app/entities/customer-relation/customer-relation-detail';
import CustomerRelationUpdate from 'app/entities/customer-relation/customer-relation-update';
import CustomerRelationDeleteDialog from 'app/entities/customer-relation/customer-relation-delete-dialog';

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
