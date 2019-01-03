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
import { getEntity, updateEntity, createEntity, reset } from 'app/entities/customer-relation/customer-relation.reducer';
import { ICustomerRelation } from 'app/shared/model/customer-relation.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ICustomerRelationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ICustomerRelationUpdateState {
  isNew: boolean;
  customerId: number;
}

export class CustomerRelationUpdate extends React.Component<ICustomerRelationUpdateProps, ICustomerRelationUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      customerId: 0,
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
  }

  saveEntity = (event, errors, values) => {
    values.createdDate = new Date(values.createdDate);

    if (errors.length === 0) {
      const { customerRelationEntity } = this.props;
      const entity = {
        ...customerRelationEntity,
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
    this.props.history.push('/entity/customer-relation');
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

  render() {
    const { customerRelationEntity, customers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="imWebGatewayApp.customerRelation.home.createOrEditLabel">
              <Translate contentKey="imWebGatewayApp.customerRelation.home.createOrEditLabel">Create or edit a CustomerRelation</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : customerRelationEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="customer-relation-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="remarkNameLabel" for="remarkName">
                    <Translate contentKey="imWebGatewayApp.customerRelation.remarkName">Remark Name</Translate>
                  </Label>
                  <AvField
                    id="customer-relation-remarkName"
                    type="text"
                    name="remarkName"
                    validate={{
                      minLength: { value: 2, errorMessage: translate('entity.validation.minlength', { min: 2 }) },
                      maxLength: { value: 14, errorMessage: translate('entity.validation.maxlength', { max: 14 }) }
                    }}
                  />
                  <UncontrolledTooltip target="remarkNameLabel">
                    <Translate contentKey="imWebGatewayApp.customerRelation.help.remarkName" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="pyLabel" for="py">
                    <Translate contentKey="imWebGatewayApp.customerRelation.py">Py</Translate>
                  </Label>
                  <AvField
                    id="customer-relation-py"
                    type="text"
                    name="py"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                      maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                    }}
                  />
                  <UncontrolledTooltip target="pyLabel">
                    <Translate contentKey="imWebGatewayApp.customerRelation.help.py" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="pinYinLabel" for="pinYin">
                    <Translate contentKey="imWebGatewayApp.customerRelation.pinYin">Pin Yin</Translate>
                  </Label>
                  <AvField
                    id="customer-relation-pinYin"
                    type="text"
                    name="pinYin"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                      maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                    }}
                  />
                  <UncontrolledTooltip target="pinYinLabel">
                    <Translate contentKey="imWebGatewayApp.customerRelation.help.pinYin" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel" for="type">
                    <Translate contentKey="imWebGatewayApp.customerRelation.type">Type</Translate>
                  </Label>
                  <AvField
                    id="customer-relation-type"
                    type="text"
                    name="type"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                      maxLength: { value: 2, errorMessage: translate('entity.validation.maxlength', { max: 2 }) }
                    }}
                  />
                  <UncontrolledTooltip target="typeLabel">
                    <Translate contentKey="imWebGatewayApp.customerRelation.help.type" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="createdDateLabel" for="createdDate">
                    <Translate contentKey="imWebGatewayApp.customerRelation.createdDate">Created Date</Translate>
                  </Label>
                  <AvInput
                    id="customer-relation-createdDate"
                    type="datetime-local"
                    className="form-control"
                    name="createdDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.customerRelationEntity.createdDate)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                  <UncontrolledTooltip target="createdDateLabel">
                    <Translate contentKey="imWebGatewayApp.customerRelation.help.createdDate" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label for="customer.firstName">
                    <Translate contentKey="imWebGatewayApp.customerRelation.customer">Customer</Translate>
                  </Label>
                  <AvInput
                    id="customer-relation-customer"
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
                <Button tag={Link} id="cancel-save" to="/entity/customer-relation" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
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
  customerRelationEntity: storeState.customerRelation.entity,
  loading: storeState.customerRelation.loading,
  updating: storeState.customerRelation.updating
});

const mapDispatchToProps = {
  getCustomers,
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
)(CustomerRelationUpdate);
