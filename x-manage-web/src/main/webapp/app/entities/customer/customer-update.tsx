import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ICustomerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ICustomerUpdateState {
  isNew: boolean;
}

export class CustomerUpdate extends React.Component<ICustomerUpdateProps, ICustomerUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    values.resetDate = new Date(values.resetDate);
    values.createdDate = new Date(values.createdDate);

    if (errors.length === 0) {
      const { customerEntity } = this.props;
      const entity = {
        ...customerEntity,
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
    this.props.history.push('/entity/customer');
  };

  render() {
    const { customerEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="manageGatewayApp.customer.home.createOrEditLabel">
              <Translate contentKey="manageGatewayApp.customer.home.createOrEditLabel">Create or edit a Customer</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : customerEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="customer-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="mobileLabel" for="mobile">
                    <Translate contentKey="manageGatewayApp.customer.mobile">Mobile</Translate>
                  </Label>
                  <AvField
                    id="customer-mobile"
                    type="text"
                    name="mobile"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 6, errorMessage: translate('entity.validation.minlength', { min: 6 }) },
                      maxLength: { value: 18, errorMessage: translate('entity.validation.maxlength', { max: 18 }) }
                    }}
                  />
                  <UncontrolledTooltip target="mobileLabel">
                    <Translate contentKey="manageGatewayApp.customer.help.mobile" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="firstNameLabel" for="firstName">
                    <Translate contentKey="manageGatewayApp.customer.firstName">First Name</Translate>
                  </Label>
                  <AvField
                    id="customer-firstName"
                    type="text"
                    name="firstName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 2, errorMessage: translate('entity.validation.minlength', { min: 2 }) },
                      maxLength: { value: 14, errorMessage: translate('entity.validation.maxlength', { max: 14 }) }
                    }}
                  />
                  <UncontrolledTooltip target="firstNameLabel">
                    <Translate contentKey="manageGatewayApp.customer.help.firstName" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="lastName">
                    <Translate contentKey="manageGatewayApp.customer.lastName">Last Name</Translate>
                  </Label>
                  <AvField
                    id="customer-lastName"
                    type="text"
                    name="lastName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 2, errorMessage: translate('entity.validation.minlength', { min: 2 }) },
                      maxLength: { value: 14, errorMessage: translate('entity.validation.maxlength', { max: 14 }) }
                    }}
                  />
                  <UncontrolledTooltip target="lastNameLabel">
                    <Translate contentKey="manageGatewayApp.customer.help.lastName" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="pyLabel" for="py">
                    <Translate contentKey="manageGatewayApp.customer.py">Py</Translate>
                  </Label>
                  <AvField
                    id="customer-py"
                    type="text"
                    name="py"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                      maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                    }}
                  />
                  <UncontrolledTooltip target="pyLabel">
                    <Translate contentKey="manageGatewayApp.customer.help.py" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="pinYinLabel" for="pinYin">
                    <Translate contentKey="manageGatewayApp.customer.pinYin">Pin Yin</Translate>
                  </Label>
                  <AvField
                    id="customer-pinYin"
                    type="text"
                    name="pinYin"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                      maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                    }}
                  />
                  <UncontrolledTooltip target="pinYinLabel">
                    <Translate contentKey="manageGatewayApp.customer.help.pinYin" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="passwordHashLabel" for="passwordHash">
                    <Translate contentKey="manageGatewayApp.customer.passwordHash">Password Hash</Translate>
                  </Label>
                  <AvField
                    id="customer-passwordHash"
                    type="text"
                    name="passwordHash"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                      maxLength: { value: 60, errorMessage: translate('entity.validation.maxlength', { max: 60 }) }
                    }}
                  />
                  <UncontrolledTooltip target="passwordHashLabel">
                    <Translate contentKey="manageGatewayApp.customer.help.passwordHash" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="email">
                    <Translate contentKey="manageGatewayApp.customer.email">Email</Translate>
                  </Label>
                  <AvField
                    id="customer-email"
                    type="text"
                    name="email"
                    validate={{
                      minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                      maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                    }}
                  />
                  <UncontrolledTooltip target="emailLabel">
                    <Translate contentKey="manageGatewayApp.customer.help.email" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="imageUrlLabel" for="imageUrl">
                    <Translate contentKey="manageGatewayApp.customer.imageUrl">Image Url</Translate>
                  </Label>
                  <AvField
                    id="customer-imageUrl"
                    type="text"
                    name="imageUrl"
                    validate={{
                      minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                      maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                    }}
                  />
                  <UncontrolledTooltip target="imageUrlLabel">
                    <Translate contentKey="manageGatewayApp.customer.help.imageUrl" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="activatedLabel" check>
                    <AvInput id="customer-activated" type="checkbox" className="form-control" name="activated" />
                    <Translate contentKey="manageGatewayApp.customer.activated">Activated</Translate>
                  </Label>
                  <UncontrolledTooltip target="activatedLabel">
                    <Translate contentKey="manageGatewayApp.customer.help.activated" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="langKeyLabel" for="langKey">
                    <Translate contentKey="manageGatewayApp.customer.langKey">Lang Key</Translate>
                  </Label>
                  <AvField
                    id="customer-langKey"
                    type="text"
                    name="langKey"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                      maxLength: { value: 6, errorMessage: translate('entity.validation.maxlength', { max: 6 }) }
                    }}
                  />
                  <UncontrolledTooltip target="langKeyLabel">
                    <Translate contentKey="manageGatewayApp.customer.help.langKey" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="activationKeyLabel" for="activationKey">
                    <Translate contentKey="manageGatewayApp.customer.activationKey">Activation Key</Translate>
                  </Label>
                  <AvField
                    id="customer-activationKey"
                    type="text"
                    name="activationKey"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                      maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                    }}
                  />
                  <UncontrolledTooltip target="activationKeyLabel">
                    <Translate contentKey="manageGatewayApp.customer.help.activationKey" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="resetKeyLabel" for="resetKey">
                    <Translate contentKey="manageGatewayApp.customer.resetKey">Reset Key</Translate>
                  </Label>
                  <AvField
                    id="customer-resetKey"
                    type="text"
                    name="resetKey"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                      maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                    }}
                  />
                  <UncontrolledTooltip target="resetKeyLabel">
                    <Translate contentKey="manageGatewayApp.customer.help.resetKey" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="resetDateLabel" for="resetDate">
                    <Translate contentKey="manageGatewayApp.customer.resetDate">Reset Date</Translate>
                  </Label>
                  <AvInput
                    id="customer-resetDate"
                    type="datetime-local"
                    className="form-control"
                    name="resetDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.customerEntity.resetDate)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                  <UncontrolledTooltip target="resetDateLabel">
                    <Translate contentKey="manageGatewayApp.customer.help.resetDate" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="createdByLabel" for="createdBy">
                    <Translate contentKey="manageGatewayApp.customer.createdBy">Created By</Translate>
                  </Label>
                  <AvField
                    id="customer-createdBy"
                    type="text"
                    name="createdBy"
                    validate={{
                      minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                      maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
                    }}
                  />
                  <UncontrolledTooltip target="createdByLabel">
                    <Translate contentKey="manageGatewayApp.customer.help.createdBy" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="createdDateLabel" for="createdDate">
                    <Translate contentKey="manageGatewayApp.customer.createdDate">Created Date</Translate>
                  </Label>
                  <AvInput
                    id="customer-createdDate"
                    type="datetime-local"
                    className="form-control"
                    name="createdDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.customerEntity.createdDate)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                  <UncontrolledTooltip target="createdDateLabel">
                    <Translate contentKey="manageGatewayApp.customer.help.createdDate" />
                  </UncontrolledTooltip>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/customer" replace color="info">
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
  customerEntity: storeState.customer.entity,
  loading: storeState.customer.loading,
  updating: storeState.customer.updating
});

const mapDispatchToProps = {
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
)(CustomerUpdate);
