import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import HistoryMessage from './history-message';
import CurrentMessage from './current-message';
import Dialogue from './dialogue';
import CustomerRelation from './customer-relation';
import FlockRelation from './flock-relation';
import CustomerFlock from './customer-flock';
import Customer from './customer';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/history-message`} component={HistoryMessage} />
      <ErrorBoundaryRoute path={`${match.url}/current-message`} component={CurrentMessage} />
      <ErrorBoundaryRoute path={`${match.url}/dialogue`} component={Dialogue} />
      <ErrorBoundaryRoute path={`${match.url}/customer-relation`} component={CustomerRelation} />
      <ErrorBoundaryRoute path={`${match.url}/flock-relation`} component={FlockRelation} />
      <ErrorBoundaryRoute path={`${match.url}/customer-flock`} component={CustomerFlock} />
      <ErrorBoundaryRoute path={`${match.url}/customer`} component={Customer} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
