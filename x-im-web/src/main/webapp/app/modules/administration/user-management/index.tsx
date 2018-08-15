import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import UserManagement from 'app/modules/administration/user-management/user-management';
import UserManagementDetail from 'app/modules/administration/user-management/user-management-detail';
import UserManagementUpdate from 'app/modules/administration/user-management/user-management-update';
import UserManagementDeleteDialog from 'app/modules/administration/user-management/user-management-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserManagementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:login/edit`} component={UserManagementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:login`} component={UserManagementDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserManagement} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:login/delete`} component={UserManagementDeleteDialog} />
  </>
);

export default Routes;
