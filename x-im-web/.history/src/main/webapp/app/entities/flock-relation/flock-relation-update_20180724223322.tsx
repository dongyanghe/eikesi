import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { ICustomerFlock } from 'app/shared/model/customer-flock.model';
import { getEntities as getCustomerFlocks } from 'app/entities/customer-flock/customer-flock.reducer';
import { getEntity, updateEntity, createEntity, reset } from './flock-relation.reducer';
import { IFlockRelation } from 'app/shared/model/flock-relation.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IFlockRelationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IFlockRelationUpdateState {
  isNew: boolean;
  customerId: number;
  customerFlockId: number;
}

export class FlockRelationUpdate extends React.Component<IFlockRelationUpdateProps, IFlockRelationUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      customerId: 0,
      customerFlockId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCustomers();
    this.props.getCustomerFlocks();
  }

  saveEntity = (event, errors, values) => {
    values.createdDate = new Date(values.createdDate);

    if (errors.length === 0) {
      const { flockRelationEntity } = this.props;
      const entity = {
        ...flockRelationEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/flock-relation');
  };

  customerUpdate = element => {
    const firstName = element.target.value.toString();
    if (firstName === '') {
      this.setState({
        customerId: -1
      });
    } else {
      for (const i in this.props.customers) {
        if (firstName === this.props.customers[i].firstName.toString()) {
          this.setState({
            customerId: this.props.customers[i].id
          });
        }
      }
    }
  };

  customerFlockUpdate = element => {
    const name = element.target.value.toString();
    if (name === '') {
      this.setState({
        customerFlockId: -1
      });
    } else {
      for (const i in this.props.customerFlocks) {
        if (name === this.props.customerFlocks[i].name.toString()) {
          this.setState({
            customerFlockId: this.props.customerFlocks[i].id
          });
        }
      }
    }
  };

  render() {
    const { flockRelationEntity, customers, customerFlocks, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="imWebGatewayApp.flockRelation.home.createOrEditLabel">
              <Translate contentKey="imWebGatewayApp.flockRelation.home.createOrEditLabel">Create or edit a FlockRelation</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : flockRelationEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="flock-relation-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="remarkNameLabel" for="remarkName">
                    <Translate contentKey="imWebGatewayApp.flockRelation.remarkName">Remark Name</Translate>
                  </Label>
                  <AvField
                    id="flock-relation-remarkName"
                    type="text"
                    name="remarkName"
                    validate={{
                      minLength: { value: 2, errorMessage: translate('entity.validation.minlength', { min: 2 }) },
                      maxLength: { value: 14, errorMessage: translate('entity.validation.maxlength', { max: 14 }) }
                    }}
                  />
                  <UncontrolledTooltip target="remarkNameLabel">
                    <Translate contentKey="imWebGatewayApp.flockRelation.help.remarkName" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="pyLabel" for="py">
                    <Translate contentKey="imWebGatewayApp.flockRelation.py">Py</Translate>
                  </Label>
                  <AvField
                    id="flock-relation-py"
                    type="text"
                    name="py"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                      maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                    }}
                  />
                  <UncontrolledTooltip target="pyLabel">
                    <Translate contentKey="imWebGatewayApp.flockRelation.help.py" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="pinYinLabel" for="pinYin">
                    <Translate contentKey="imWebGatewayApp.flockRelation.pinYin">Pin Yin</Translate>
                  </Label>
                  <AvField
                    id="flock-relation-pinYin"
                    type="text"
                    name="pinYin"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                      maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                    }}
                  />
                  <UncontrolledTooltip target="pinYinLabel">
                    <Translate contentKey="imWebGatewayApp.flockRelation.help.pinYin" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel" for="type">
                    <Translate contentKey="imWebGatewayApp.flockRelation.type">Type</Translate>
                  </Label>
                  <AvField
                    id="flock-relation-type"
                    type="text"
                    name="type"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                      maxLength: { value: 2, errorMessage: translate('entity.validation.maxlength', { max: 2 }) }
                    }}
                  />
                  <UncontrolledTooltip target="typeLabel">
                    <Translate contentKey="imWebGatewayApp.flockRelation.help.type" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="createdDateLabel" for="createdDate">
                    <Translate contentKey="imWebGatewayApp.flockRelation.createdDate">Created Date</Translate>
                  </Label>
                  <AvInput
                    id="flock-relation-createdDate"
                    type="datetime-local"
                    className="form-control"
                    name="createdDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.flockRelationEntity.createdDate)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                  <UncontrolledTooltip target="createdDateLabel">
                    <Translate contentKey="imWebGatewayApp.flockRelation.help.createdDate" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label for="customer.firstName">
                    <Translate contentKey="imWebGatewayApp.flockRelation.customer">Customer</Translate>
                  </Label>
                  <AvInput
                    id="flock-relation-customer"
                    type="select"
                    className="form-control"
                    name="customerId"
                    onChange={this.customerUpdate}
                  >
                    <option value="" key="0" />
                    {customers
                      ? customers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.firstName}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="customerFlock.name">
                    <Translate contentKey="imWebGatewayApp.flockRelation.customerFlock">Customer Flock</Translate>
                  </Label>
                  <AvInput
                    id="flock-relation-customerFlock"
                    type="select"
                    className="form-control"
                    name="customerFlockId"
                    onChange={this.customerFlockUpdate}
                  >
                    <option value="" key="0" />
                    {customerFlocks
                      ? customerFlocks.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/flock-relation" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  customers: storeState.customer.entities,
  customerFlocks: storeState.customerFlock.entities,
  flockRelationEntity: storeState.flockRelation.entity,
  loading: storeState.flockRelation.loading,
  updating: storeState.flockRelation.updating
});

const mapDispatchToProps = {
  getCustomers,
  getCustomerFlocks,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlockRelationUpdate);
