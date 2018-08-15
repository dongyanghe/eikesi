import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from 'app/entities/customer/customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class CustomerDetail extends React.Component<ICustomerDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { customerEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="imWebGatewayApp.customer.detail.title">Customer</Translate> [<b>{customerEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="mobile">
                <Translate contentKey="imWebGatewayApp.customer.mobile">Mobile</Translate>
              </span>
              <UncontrolledTooltip target="mobile">
                <Translate contentKey="imWebGatewayApp.customer.help.mobile" />
              </UncontrolledTooltip>
            </dt>
            <dd>{customerEntity.mobile}</dd>
            <dt>
              <span id="firstName">
                <Translate contentKey="imWebGatewayApp.customer.firstName">First Name</Translate>
              </span>
              <UncontrolledTooltip target="firstName">
                <Translate contentKey="imWebGatewayApp.customer.help.firstName" />
              </UncontrolledTooltip>
            </dt>
            <dd>{customerEntity.firstName}</dd>
            <dt>
              <span id="lastName">
                <Translate contentKey="imWebGatewayApp.customer.lastName">Last Name</Translate>
              </span>
              <UncontrolledTooltip target="lastName">
                <Translate contentKey="imWebGatewayApp.customer.help.lastName" />
              </UncontrolledTooltip>
            </dt>
            <dd>{customerEntity.lastName}</dd>
            <dt>
              <span id="py">
                <Translate contentKey="imWebGatewayApp.customer.py">Py</Translate>
              </span>
              <UncontrolledTooltip target="py">
                <Translate contentKey="imWebGatewayApp.customer.help.py" />
              </UncontrolledTooltip>
            </dt>
            <dd>{customerEntity.py}</dd>
            <dt>
              <span id="pinYin">
                <Translate contentKey="imWebGatewayApp.customer.pinYin">Pin Yin</Translate>
              </span>
              <UncontrolledTooltip target="pinYin">
                <Translate contentKey="imWebGatewayApp.customer.help.pinYin" />
              </UncontrolledTooltip>
            </dt>
            <dd>{customerEntity.pinYin}</dd>
            <dt>
              <span id="passwordHash">
                <Translate contentKey="imWebGatewayApp.customer.passwordHash">Password Hash</Translate>
              </span>
              <UncontrolledTooltip target="passwordHash">
                <Translate contentKey="imWebGatewayApp.customer.help.passwordHash" />
              </UncontrolledTooltip>
            </dt>
            <dd>{customerEntity.passwordHash}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="imWebGatewayApp.customer.email">Email</Translate>
              </span>
              <UncontrolledTooltip target="email">
                <Translate contentKey="imWebGatewayApp.customer.help.email" />
              </UncontrolledTooltip>
            </dt>
            <dd>{customerEntity.email}</dd>
            <dt>
              <span id="imageUrl">
                <Translate contentKey="imWebGatewayApp.customer.imageUrl">Image Url</Translate>
              </span>
              <UncontrolledTooltip target="imageUrl">
                <Translate contentKey="imWebGatewayApp.customer.help.imageUrl" />
              </UncontrolledTooltip>
            </dt>
            <dd>{customerEntity.imageUrl}</dd>
            <dt>
              <span id="activated">
                <Translate contentKey="imWebGatewayApp.customer.activated">Activated</Translate>
              </span>
              <UncontrolledTooltip target="activated">
                <Translate contentKey="imWebGatewayApp.customer.help.activated" />
              </UncontrolledTooltip>
            </dt>
            <dd>{customerEntity.activated ? 'true' : 'false'}</dd>
            <dt>
              <span id="langKey">
                <Translate contentKey="imWebGatewayApp.customer.langKey">Lang Key</Translate>
              </span>
              <UncontrolledTooltip target="langKey">
                <Translate contentKey="imWebGatewayApp.customer.help.langKey" />
              </UncontrolledTooltip>
            </dt>
            <dd>{customerEntity.langKey}</dd>
            <dt>
              <span id="activationKey">
                <Translate contentKey="imWebGatewayApp.customer.activationKey">Activation Key</Translate>
              </span>
              <UncontrolledTooltip target="activationKey">
                <Translate contentKey="imWebGatewayApp.customer.help.activationKey" />
              </UncontrolledTooltip>
            </dt>
            <dd>{customerEntity.activationKey}</dd>
            <dt>
              <span id="resetKey">
                <Translate contentKey="imWebGatewayApp.customer.resetKey">Reset Key</Translate>
              </span>
              <UncontrolledTooltip target="resetKey">
                <Translate contentKey="imWebGatewayApp.customer.help.resetKey" />
              </UncontrolledTooltip>
            </dt>
            <dd>{customerEntity.resetKey}</dd>
            <dt>
              <span id="resetDate">
                <Translate contentKey="imWebGatewayApp.customer.resetDate">Reset Date</Translate>
              </span>
              <UncontrolledTooltip target="resetDate">
                <Translate contentKey="imWebGatewayApp.customer.help.resetDate" />
              </UncontrolledTooltip>
            </dt>
            <dd>
              <TextFormat value={customerEntity.resetDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createdBy">
                <Translate contentKey="imWebGatewayApp.customer.createdBy">Created By</Translate>
              </span>
              <UncontrolledTooltip target="createdBy">
                <Translate contentKey="imWebGatewayApp.customer.help.createdBy" />
              </UncontrolledTooltip>
            </dt>
            <dd>{customerEntity.createdBy}</dd>
            <dt>
              <span id="createdDate">
                <Translate contentKey="imWebGatewayApp.customer.createdDate">Created Date</Translate>
              </span>
              <UncontrolledTooltip target="createdDate">
                <Translate contentKey="imWebGatewayApp.customer.help.createdDate" />
              </UncontrolledTooltip>
            </dt>
            <dd>
              <TextFormat value={customerEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/entity/customer" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/customer/${customerEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ customer }: IRootState) => ({
  customerEntity: customer.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDetail);
