import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import UserManagement from 'app/modules/administration/user-management';
import Logs from 'app/modules/administration/logs/logs';
import Health from 'app/modules/administration/health/health';
import Metrics from 'app/modules/administration/metrics/metrics';
import Configuration from 'app/modules/administration/configuration/configuration';
import Audits from 'app/modules/administration/audits/audits';
import Docs from 'app/modules/administration/docs/docs';
import Gateway from 'app/modules/administration/gateway/gateway';

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/user-management`} component={UserManagement} />
    <ErrorBoundaryRoute exact path={`${match.url}/health`} component={Health} />
    <ErrorBoundaryRoute exact path={`${match.url}/gateway`} component={Gateway} />
    <ErrorBoundaryRoute exact path={`${match.url}/metrics`} component={Metrics} />
    <ErrorBoundaryRoute exact path={`${match.url}/docs`} component={Docs} />
    <ErrorBoundaryRoute exact path={`${match.url}/configuration`} component={Configuration} />
    <ErrorBoundaryRoute exact path={`${match.url}/audits`} component={Audits} />
    <ErrorBoundaryRoute exact path={`${match.url}/logs`} component={Logs} />
  </div>
);

export default Routes;
