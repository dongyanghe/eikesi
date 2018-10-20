import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './customer-flock.reducer';
import { ICustomerFlock } from 'app/shared/model/customer-flock.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerFlockDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CustomerFlockDetail extends React.Component<ICustomerFlockDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { customerFlockEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="imApp.customerFlock.detail.title">CustomerFlock</Translate> [<b>{customerFlockEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="imApp.customerFlock.name">Name</Translate>
              </span>
              <UncontrolledTooltip target="name">
                <Translate contentKey="imApp.customerFlock.help.name" />
              </UncontrolledTooltip>
            </dt>
            <dd>{customerFlockEntity.name}</dd>
            <dt>
              <span id="py">
                <Translate contentKey="imApp.customerFlock.py">Py</Translate>
              </span>
              <UncontrolledTooltip target="py">
                <Translate contentKey="imApp.customerFlock.help.py" />
              </UncontrolledTooltip>
            </dt>
            <dd>{customerFlockEntity.py}</dd>
            <dt>
              <span id="pinYin">
                <Translate contentKey="imApp.customerFlock.pinYin">Pin Yin</Translate>
              </span>
              <UncontrolledTooltip target="pinYin">
                <Translate contentKey="imApp.customerFlock.help.pinYin" />
              </UncontrolledTooltip>
            </dt>
            <dd>{customerFlockEntity.pinYin}</dd>
            <dt>
              <span id="imageUrl">
                <Translate contentKey="imApp.customerFlock.imageUrl">Image Url</Translate>
              </span>
              <UncontrolledTooltip target="imageUrl">
                <Translate contentKey="imApp.customerFlock.help.imageUrl" />
              </UncontrolledTooltip>
            </dt>
            <dd>{customerFlockEntity.imageUrl}</dd>
            <dt>
              <span id="createdDate">
                <Translate contentKey="imApp.customerFlock.createdDate">Created Date</Translate>
              </span>
              <UncontrolledTooltip target="createdDate">
                <Translate contentKey="imApp.customerFlock.help.createdDate" />
              </UncontrolledTooltip>
            </dt>
            <dd>
              <TextFormat value={customerFlockEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
          </dl>
          <Button tag={Link} to="/entity/customer-flock" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/customer-flock/${customerFlockEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ customerFlock }: IRootState) => ({
  customerFlockEntity: customerFlock.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerFlockDetail);
