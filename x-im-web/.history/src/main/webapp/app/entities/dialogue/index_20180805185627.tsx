import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Dialogue from 'app/entities/dialogue/dialogue';
import DialogueDetail from 'app/entities/dialogue/dialogue-detail';
import DialogueUpdate from 'app/entities/dialogue/dialogue-update';
import DialogueDeleteDialog from 'app/entities/dialogue/dialogue-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DialogueUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DialogueUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DialogueDetail} />
      <ErrorBoundaryRoute path={match.url} component={Dialogue} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={DialogueDeleteDialog} />
  </>
);

export default Routes;
