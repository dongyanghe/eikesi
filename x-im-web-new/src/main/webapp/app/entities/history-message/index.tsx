import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import HistoryMessage from 'app/entities/history-message/history-message';
import HistoryMessageDetail from 'app/entities/history-message/history-message-detail';
import HistoryMessageUpdate from 'app/entities/history-message/history-message-update';
import HistoryMessageDeleteDialog from 'app/entities/history-message/history-message-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={HistoryMessageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={HistoryMessageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={HistoryMessageDetail} />
      <ErrorBoundaryRoute path={match.url} component={HistoryMessage} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={HistoryMessageDeleteDialog} />
  </>
);

export default Routes;
