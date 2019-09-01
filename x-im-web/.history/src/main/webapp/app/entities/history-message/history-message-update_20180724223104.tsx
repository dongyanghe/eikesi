import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './history-message.reducer';
import { IHistoryMessage } from 'app/shared/model/history-message.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IHistoryMessageUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IHistoryMessageUpdateState {
  isNew: boolean;
}

export class HistoryMessageUpdate extends React.Component<IHistoryMessageUpdateProps, IHistoryMessageUpdateState> {
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
    values.targetDate = new Date(values.targetDate);

    if (errors.length === 0) {
      const { historyMessageEntity } = this.props;
      const entity = {
        ...historyMessageEntity,
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
    this.props.history.push('/entity/history-message');
  };

  render() {
    const { historyMessageEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="imWebGatewayApp.historyMessage.home.createOrEditLabel">
              <Translate contentKey="imWebGatewayApp.historyMessage.home.createOrEditLabel">Create or edit a HistoryMessage</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : historyMessageEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="history-message-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="contentLabel" for="content">
                    <Translate contentKey="imWebGatewayApp.historyMessage.content">Content</Translate>
                  </Label>
                  <AvField
                    id="history-message-content"
                    type="text"
                    name="content"
                    validate={{
                      minLength: { value: 2, errorMessage: translate('entity.validation.minlength', { min: 2 }) },
                      maxLength: { value: 14, errorMessage: translate('entity.validation.maxlength', { max: 14 }) }
                    }}
                  />
                  <UncontrolledTooltip target="contentLabel">
                    <Translate contentKey="imWebGatewayApp.historyMessage.help.content" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="status">
                    <Translate contentKey="imWebGatewayApp.historyMessage.status">Status</Translate>
                  </Label>
                  <AvField
                    id="history-message-status"
                    type="text"
                    name="status"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                      maxLength: { value: 2, errorMessage: translate('entity.validation.maxlength', { max: 2 }) }
                    }}
                  />
                  <UncontrolledTooltip target="statusLabel">
                    <Translate contentKey="imWebGatewayApp.historyMessage.help.status" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="createdDateLabel" for="createdDate">
                    <Translate contentKey="imWebGatewayApp.historyMessage.createdDate">Created Date</Translate>
                  </Label>
                  <AvInput
                    id="history-message-createdDate"
                    type="datetime-local"
                    className="form-control"
                    name="createdDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.historyMessageEntity.createdDate)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                  <UncontrolledTooltip target="createdDateLabel">
                    <Translate contentKey="imWebGatewayApp.historyMessage.help.createdDate" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="createdIdLabel" for="createdId">
                    <Translate contentKey="imWebGatewayApp.historyMessage.createdId">Created Id</Translate>
                  </Label>
                  <AvField
                    id="history-message-createdId"
                    type="number"
                    className="form-control"
                    name="createdId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                  <UncontrolledTooltip target="createdIdLabel">
                    <Translate contentKey="imWebGatewayApp.historyMessage.help.createdId" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="targetDateLabel" for="targetDate">
                    <Translate contentKey="imWebGatewayApp.historyMessage.targetDate">Target Date</Translate>
                  </Label>
                  <AvInput
                    id="history-message-targetDate"
                    type="datetime-local"
                    className="form-control"
                    name="targetDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.historyMessageEntity.targetDate)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                  <UncontrolledTooltip target="targetDateLabel">
                    <Translate contentKey="imWebGatewayApp.historyMessage.help.targetDate" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="targetIdLabel" for="targetId">
                    <Translate contentKey="imWebGatewayApp.historyMessage.targetId">Target Id</Translate>
                  </Label>
                  <AvField
                    id="history-message-targetId"
                    type="number"
                    className="form-control"
                    name="targetId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                  <UncontrolledTooltip target="targetIdLabel">
                    <Translate contentKey="imWebGatewayApp.historyMessage.help.targetId" />
                  </UncontrolledTooltip>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/history-message" replace color="info">
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
  historyMessageEntity: storeState.historyMessage.entity,
  loading: storeState.historyMessage.loading,
  updating: storeState.historyMessage.updating
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
)(HistoryMessageUpdate);
