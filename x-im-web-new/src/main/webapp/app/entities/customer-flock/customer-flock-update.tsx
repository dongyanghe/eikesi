import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from 'app/entities/customer-flock/customer-flock.reducer';
import { ICustomerFlock } from 'app/shared/model/customer-flock.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
// import { keysToValues } from 'app/shared/util/entity-utils';

export interface ICustomerFlockUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string}> {}

export interface ICustomerFlockUpdateState {
  isNew: boolean;
}

export class CustomerFlockUpdate extends React.Component<ICustomerFlockUpdateProps, ICustomerFlockUpdateState> {
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
    values.createdDate = new Date(values.createdDate);

    if (errors.length === 0) {
      const { customerFlockEntity } = this.props;
      const entity = {
        ...customerFlockEntity,
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
    this.props.history.push('/entity/customer-flock');
  };

  render() {
    const { customerFlockEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="imWebGatewayApp.customerFlock.home.createOrEditLabel">
              <Translate contentKey="imWebGatewayApp.customerFlock.home.createOrEditLabel">Create or edit a CustomerFlock</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : customerFlockEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="customer-flock-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="imWebGatewayApp.customerFlock.name">Name</Translate>
                  </Label>
                  <AvField
                    id="customer-flock-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 2, errorMessage: translate('entity.validation.minlength', { min: 2 }) },
                      maxLength: { value: 14, errorMessage: translate('entity.validation.maxlength', { max: 14 }) }
                    }}
                  />
                  <UncontrolledTooltip target="nameLabel">
                    <Translate contentKey="imWebGatewayApp.customerFlock.help.name" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="pyLabel" for="py">
                    <Translate contentKey="imWebGatewayApp.customerFlock.py">Py</Translate>
                  </Label>
                  <AvField
                    id="customer-flock-py"
                    type="text"
                    name="py"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                      maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                    }}
                  />
                  <UncontrolledTooltip target="pyLabel">
                    <Translate contentKey="imWebGatewayApp.customerFlock.help.py" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="pinYinLabel" for="pinYin">
                    <Translate contentKey="imWebGatewayApp.customerFlock.pinYin">Pin Yin</Translate>
                  </Label>
                  <AvField
                    id="customer-flock-pinYin"
                    type="text"
                    name="pinYin"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                      maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                    }}
                  />
                  <UncontrolledTooltip target="pinYinLabel">
                    <Translate contentKey="imWebGatewayApp.customerFlock.help.pinYin" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="imageUrlLabel" for="imageUrl">
                    <Translate contentKey="imWebGatewayApp.customerFlock.imageUrl">Image Url</Translate>
                  </Label>
                  <AvField
                    id="customer-flock-imageUrl"
                    type="text"
                    name="imageUrl"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                    }}
                  />
                  <UncontrolledTooltip target="imageUrlLabel">
                    <Translate contentKey="imWebGatewayApp.customerFlock.help.imageUrl" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="createdDateLabel" for="createdDate">
                    <Translate contentKey="imWebGatewayApp.customerFlock.createdDate">Created Date</Translate>
                  </Label>
                  <AvInput
                    id="customer-flock-createdDate"
                    type="datetime-local"
                    className="form-control"
                    name="createdDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.customerFlockEntity.createdDate)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                  <UncontrolledTooltip target="createdDateLabel">
                    <Translate contentKey="imWebGatewayApp.customerFlock.help.createdDate" />
                  </UncontrolledTooltip>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/customer-flock" replace color="info">
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
  customerFlockEntity: storeState.customerFlock.entity,
  loading: storeState.customerFlock.loading,
  updating: storeState.customerFlock.updating
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
)(CustomerFlockUpdate);
