import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './dialogue.reducer';
import { IDialogue } from 'app/shared/model/dialogue.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IDialogueUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IDialogueUpdateState {
  isNew: boolean;
}

export class DialogueUpdate extends React.Component<IDialogueUpdateProps, IDialogueUpdateState> {
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
      const { dialogueEntity } = this.props;
      const entity = {
        ...dialogueEntity,
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
    this.props.history.push('/entity/dialogue');
  };

  render() {
    const { dialogueEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="manageGatewayApp.dialogue.home.createOrEditLabel">
              <Translate contentKey="manageGatewayApp.dialogue.home.createOrEditLabel">Create or edit a Dialogue</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : dialogueEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="dialogue-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="createdDateLabel" for="createdDate">
                    <Translate contentKey="manageGatewayApp.dialogue.createdDate">Created Date</Translate>
                  </Label>
                  <AvInput
                    id="dialogue-createdDate"
                    type="datetime-local"
                    className="form-control"
                    name="createdDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.dialogueEntity.createdDate)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                  <UncontrolledTooltip target="createdDateLabel">
                    <Translate contentKey="manageGatewayApp.dialogue.help.createdDate" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="createdIdLabel" for="createdId">
                    <Translate contentKey="manageGatewayApp.dialogue.createdId">Created Id</Translate>
                  </Label>
                  <AvField
                    id="dialogue-createdId"
                    type="number"
                    className="form-control"
                    name="createdId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                  <UncontrolledTooltip target="createdIdLabel">
                    <Translate contentKey="manageGatewayApp.dialogue.help.createdId" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="targetIdLabel" for="targetId">
                    <Translate contentKey="manageGatewayApp.dialogue.targetId">Target Id</Translate>
                  </Label>
                  <AvField
                    id="dialogue-targetId"
                    type="number"
                    className="form-control"
                    name="targetId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                  <UncontrolledTooltip target="targetIdLabel">
                    <Translate contentKey="manageGatewayApp.dialogue.help.targetId" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="targetTypeLabel" for="targetType">
                    <Translate contentKey="manageGatewayApp.dialogue.targetType">Target Type</Translate>
                  </Label>
                  <AvField
                    id="dialogue-targetType"
                    type="text"
                    name="targetType"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                      maxLength: { value: 2, errorMessage: translate('entity.validation.maxlength', { max: 2 }) }
                    }}
                  />
                  <UncontrolledTooltip target="targetTypeLabel">
                    <Translate contentKey="manageGatewayApp.dialogue.help.targetType" />
                  </UncontrolledTooltip>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/dialogue" replace color="info">
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
  dialogueEntity: storeState.dialogue.entity,
  loading: storeState.dialogue.loading,
  updating: storeState.dialogue.updating
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
)(DialogueUpdate);
