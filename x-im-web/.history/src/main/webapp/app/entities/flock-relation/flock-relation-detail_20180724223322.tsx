import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './flock-relation.reducer';
import { IFlockRelation } from 'app/shared/model/flock-relation.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFlockRelationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class FlockRelationDetail extends React.Component<IFlockRelationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { flockRelationEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="imWebGatewayApp.flockRelation.detail.title">FlockRelation</Translate> [<b>{flockRelationEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="remarkName">
                <Translate contentKey="imWebGatewayApp.flockRelation.remarkName">Remark Name</Translate>
              </span>
              <UncontrolledTooltip target="remarkName">
                <Translate contentKey="imWebGatewayApp.flockRelation.help.remarkName" />
              </UncontrolledTooltip>
            </dt>
            <dd>{flockRelationEntity.remarkName}</dd>
            <dt>
              <span id="py">
                <Translate contentKey="imWebGatewayApp.flockRelation.py">Py</Translate>
              </span>
              <UncontrolledTooltip target="py">
                <Translate contentKey="imWebGatewayApp.flockRelation.help.py" />
              </UncontrolledTooltip>
            </dt>
            <dd>{flockRelationEntity.py}</dd>
            <dt>
              <span id="pinYin">
                <Translate contentKey="imWebGatewayApp.flockRelation.pinYin">Pin Yin</Translate>
              </span>
              <UncontrolledTooltip target="pinYin">
                <Translate contentKey="imWebGatewayApp.flockRelation.help.pinYin" />
              </UncontrolledTooltip>
            </dt>
            <dd>{flockRelationEntity.pinYin}</dd>
            <dt>
              <span id="type">
                <Translate contentKey="imWebGatewayApp.flockRelation.type">Type</Translate>
              </span>
              <UncontrolledTooltip target="type">
                <Translate contentKey="imWebGatewayApp.flockRelation.help.type" />
              </UncontrolledTooltip>
            </dt>
            <dd>{flockRelationEntity.type}</dd>
            <dt>
              <span id="createdDate">
                <Translate contentKey="imWebGatewayApp.flockRelation.createdDate">Created Date</Translate>
              </span>
              <UncontrolledTooltip target="createdDate">
                <Translate contentKey="imWebGatewayApp.flockRelation.help.createdDate" />
              </UncontrolledTooltip>
            </dt>
            <dd>
              <TextFormat value={flockRelationEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="imWebGatewayApp.flockRelation.customer">Customer</Translate>
            </dt>
            <dd>{flockRelationEntity.customerFirstName ? flockRelationEntity.customerFirstName : ''}</dd>
            <dt>
              <Translate contentKey="imWebGatewayApp.flockRelation.customerFlock">Customer Flock</Translate>
            </dt>
            <dd>{flockRelationEntity.customerFlockName ? flockRelationEntity.customerFlockName : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/flock-relation" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/flock-relation/${flockRelationEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ flockRelation }: IRootState) => ({
  flockRelationEntity: flockRelation.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlockRelationDetail);
