import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDialogue } from 'app/shared/model/dialogue.model';
import { getEntities as getDialogues } from 'app/entities/dialogue/dialogue.reducer';
import { getEntity, updateEntity, createEntity, reset } from './current-message.reducer';
import { ICurrentMessage } from 'app/shared/model/current-message.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ICurrentMessageUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ICurrentMessageUpdateState {
  isNew: boolean;
  dialogueId: number;
}

export class CurrentMessageUpdate extends React.Component<ICurrentMessageUpdateProps, ICurrentMessageUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      dialogueId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getDialogues();
  }

  saveEntity = (event, errors, values) => {
    values.createdDate = new Date(values.createdDate);
    values.targetDate = new Date(values.targetDate);

    if (errors.length === 0) {
      const { currentMessageEntity } = this.props;
      const entity = {
        ...currentMessageEntity,
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
    this.props.history.push('/entity/current-message');
  };

  dialogueUpdate = element => {
    const targetId = element.target.value.toString();
    if (targetId === '') {
      this.setState({
        dialogueId: -1
      });
    } else {
      for (const i in this.props.dialogues) {
        if (targetId === this.props.dialogues[i].targetId.toString()) {
          this.setState({
            dialogueId: this.props.dialogues[i].id
          });
        }
      }
    }
  };

  render() {
    const { currentMessageEntity, dialogues, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="manageGatewayApp.currentMessage.home.createOrEditLabel">
              <Translate contentKey="manageGatewayApp.currentMessage.home.createOrEditLabel">Create or edit a CurrentMessage</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : currentMessageEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="current-message-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="contentLabel" for="content">
                    <Translate contentKey="manageGatewayApp.currentMessage.content">Content</Translate>
                  </Label>
                  <AvField
                    id="current-message-content"
                    type="text"
                    name="content"
                    validate={{
                      minLength: { value: 2, errorMessage: translate('entity.validation.minlength', { min: 2 }) },
                      maxLength: { value: 14, errorMessage: translate('entity.validation.maxlength', { max: 14 }) }
                    }}
                  />
                  <UncontrolledTooltip target="contentLabel">
                    <Translate contentKey="manageGatewayApp.currentMessage.help.content" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="status">
                    <Translate contentKey="manageGatewayApp.currentMessage.status">Status</Translate>
                  </Label>
                  <AvField
                    id="current-message-status"
                    type="text"
                    name="status"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                      maxLength: { value: 2, errorMessage: translate('entity.validation.maxlength', { max: 2 }) }
                    }}
                  />
                  <UncontrolledTooltip target="statusLabel">
                    <Translate contentKey="manageGatewayApp.currentMessage.help.status" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel" for="type">
                    <Translate contentKey="manageGatewayApp.currentMessage.type">Type</Translate>
                  </Label>
                  <AvField
                    id="current-message-type"
                    type="text"
                    name="type"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                      maxLength: { value: 2, errorMessage: translate('entity.validation.maxlength', { max: 2 }) }
                    }}
                  />
                  <UncontrolledTooltip target="typeLabel">
                    <Translate contentKey="manageGatewayApp.currentMessage.help.type" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="createdDateLabel" for="createdDate">
                    <Translate contentKey="manageGatewayApp.currentMessage.createdDate">Created Date</Translate>
                  </Label>
                  <AvInput
                    id="current-message-createdDate"
                    type="datetime-local"
                    className="form-control"
                    name="createdDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.currentMessageEntity.createdDate)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                  <UncontrolledTooltip target="createdDateLabel">
                    <Translate contentKey="manageGatewayApp.currentMessage.help.createdDate" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="createdIdLabel" for="createdId">
                    <Translate contentKey="manageGatewayApp.currentMessage.createdId">Created Id</Translate>
                  </Label>
                  <AvField
                    id="current-message-createdId"
                    type="number"
                    className="form-control"
                    name="createdId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                  <UncontrolledTooltip target="createdIdLabel">
                    <Translate contentKey="manageGatewayApp.currentMessage.help.createdId" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="targetDateLabel" for="targetDate">
                    <Translate contentKey="manageGatewayApp.currentMessage.targetDate">Target Date</Translate>
                  </Label>
                  <AvInput
                    id="current-message-targetDate"
                    type="datetime-local"
                    className="form-control"
                    name="targetDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.currentMessageEntity.targetDate)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                  <UncontrolledTooltip target="targetDateLabel">
                    <Translate contentKey="manageGatewayApp.currentMessage.help.targetDate" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="targetIdLabel" for="targetId">
                    <Translate contentKey="manageGatewayApp.currentMessage.targetId">Target Id</Translate>
                  </Label>
                  <AvField
                    id="current-message-targetId"
                    type="number"
                    className="form-control"
                    name="targetId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                  <UncontrolledTooltip target="targetIdLabel">
                    <Translate contentKey="manageGatewayApp.currentMessage.help.targetId" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label for="dialogue.targetId">
                    <Translate contentKey="manageGatewayApp.currentMessage.dialogue">Dialogue</Translate>
                  </Label>
                  <AvInput
                    id="current-message-dialogue"
                    type="select"
                    className="form-control"
                    name="dialogueId"
                    onChange={this.dialogueUpdate}
                  >
                    <option value="" key="0" />
                    {dialogues
                      ? dialogues.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.targetId}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/current-message" replace color="info">
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
  dialogues: storeState.dialogue.entities,
  currentMessageEntity: storeState.currentMessage.entity,
  loading: storeState.currentMessage.loading,
  updating: storeState.currentMessage.updating
});

const mapDispatchToProps = {
  getDialogues,
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
)(CurrentMessageUpdate);
