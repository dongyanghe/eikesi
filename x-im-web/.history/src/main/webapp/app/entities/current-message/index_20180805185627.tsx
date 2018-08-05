import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CurrentMessage from 'app/entities/current-message/current-message';
import CurrentMessageDetail from 'app/entities/current-message/current-message-detail';
import CurrentMessageUpdate from 'app/entities/current-message/current-message-update';
import CurrentMessageDeleteDialog from 'app/entities/current-message/current-message-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CurrentMessageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CurrentMessageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CurrentMessageDetail} />
      <ErrorBoundaryRoute path={match.url} component={CurrentMessage} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CurrentMessageDeleteDialog} />
  </>
);

export default Routes;
