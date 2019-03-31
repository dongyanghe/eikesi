import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from 'app/entities/customer-relation/customer-relation.reducer';
import { ICustomerRelation } from 'app/shared/model/customer-relation.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerRelationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string}> {}

export class CustomerRelationDetail extends React.Component<ICustomerRelationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { customerRelationEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="imWebGatewayApp.customerRelation.detail.title">CustomerRelation</Translate> [<b>
              {customerRelationEntity.id}
            </b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="remarkName">
                <Translate contentKey="imWebGatewayApp.customerRelation.remarkName">Remark Name</Translate>
              </span>
              <UncontrolledTooltip target="remarkName">
                <Translate contentKey="imWebGatewayApp.customerRelation.help.remarkName" />
              </UncontrolledTooltip>
            </dt>
            <dd>{customerRelationEntity.remarkName}</dd>
            <dt>
              <span id="py">
                <Translate contentKey="imWebGatewayApp.customerRelation.py">Py</Translate>
              </span>
              <UncontrolledTooltip target="py">
                <Translate contentKey="imWebGatewayApp.customerRelation.help.py" />
              </UncontrolledTooltip>
            </dt>
            <dd>{customerRelationEntity.py}</dd>
            <dt>
              <span id="pinYin">
                <Translate contentKey="imWebGatewayApp.customerRelation.pinYin">Pin Yin</Translate>
              </span>
              <UncontrolledTooltip target="pinYin">
                <Translate contentKey="imWebGatewayApp.customerRelation.help.pinYin" />
              </UncontrolledTooltip>
            </dt>
            <dd>{customerRelationEntity.pinYin}</dd>
            <dt>
              <span id="type">
                <Translate contentKey="imWebGatewayApp.customerRelation.type">Type</Translate>
              </span>
              <UncontrolledTooltip target="type">
                <Translate contentKey="imWebGatewayApp.customerRelation.help.type" />
              </UncontrolledTooltip>
            </dt>
            <dd>{customerRelationEntity.type}</dd>
            <dt>
              <span id="createdDate">
                <Translate contentKey="imWebGatewayApp.customerRelation.createdDate">Created Date</Translate>
              </span>
              <UncontrolledTooltip target="createdDate">
                <Translate contentKey="imWebGatewayApp.customerRelation.help.createdDate" />
              </UncontrolledTooltip>
            </dt>
            <dd>
              <TextFormat value={customerRelationEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="imWebGatewayApp.customerRelation.customer">Customer</Translate>
            </dt>
            <dd>{customerRelationEntity.customerFirstName ? customerRelationEntity.customerFirstName : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/customer-relation" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/customer-relation/${customerRelationEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ customerRelation }: IRootState) => ({
  customerRelationEntity: customerRelation.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerRelationDetail);
