import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './current-message.reducer';
import { ICurrentMessage } from 'app/shared/model/current-message.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICurrentMessageDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CurrentMessageDetail extends React.Component<ICurrentMessageDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { currentMessageEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="imApp.currentMessage.detail.title">CurrentMessage</Translate> [<b>{currentMessageEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="content">
                <Translate contentKey="imApp.currentMessage.content">Content</Translate>
              </span>
              <UncontrolledTooltip target="content">
                <Translate contentKey="imApp.currentMessage.help.content" />
              </UncontrolledTooltip>
            </dt>
            <dd>{currentMessageEntity.content}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="imApp.currentMessage.status">Status</Translate>
              </span>
              <UncontrolledTooltip target="status">
                <Translate contentKey="imApp.currentMessage.help.status" />
              </UncontrolledTooltip>
            </dt>
            <dd>{currentMessageEntity.status}</dd>
            <dt>
              <span id="type">
                <Translate contentKey="imApp.currentMessage.type">Type</Translate>
              </span>
              <UncontrolledTooltip target="type">
                <Translate contentKey="imApp.currentMessage.help.type" />
              </UncontrolledTooltip>
            </dt>
            <dd>{currentMessageEntity.type}</dd>
            <dt>
              <span id="createdDate">
                <Translate contentKey="imApp.currentMessage.createdDate">Created Date</Translate>
              </span>
              <UncontrolledTooltip target="createdDate">
                <Translate contentKey="imApp.currentMessage.help.createdDate" />
              </UncontrolledTooltip>
            </dt>
            <dd>
              <TextFormat value={currentMessageEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createdId">
                <Translate contentKey="imApp.currentMessage.createdId">Created Id</Translate>
              </span>
              <UncontrolledTooltip target="createdId">
                <Translate contentKey="imApp.currentMessage.help.createdId" />
              </UncontrolledTooltip>
            </dt>
            <dd>{currentMessageEntity.createdId}</dd>
            <dt>
              <span id="targetDate">
                <Translate contentKey="imApp.currentMessage.targetDate">Target Date</Translate>
              </span>
              <UncontrolledTooltip target="targetDate">
                <Translate contentKey="imApp.currentMessage.help.targetDate" />
              </UncontrolledTooltip>
            </dt>
            <dd>
              <TextFormat value={currentMessageEntity.targetDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="targetId">
                <Translate contentKey="imApp.currentMessage.targetId">Target Id</Translate>
              </span>
              <UncontrolledTooltip target="targetId">
                <Translate contentKey="imApp.currentMessage.help.targetId" />
              </UncontrolledTooltip>
            </dt>
            <dd>{currentMessageEntity.targetId}</dd>
            <dt>
              <Translate contentKey="imApp.currentMessage.dialogue">Dialogue</Translate>
            </dt>
            <dd>{currentMessageEntity.dialogue ? currentMessageEntity.dialogue.targetId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/current-message" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/current-message/${currentMessageEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ currentMessage }: IRootState) => ({
  currentMessageEntity: currentMessage.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentMessageDetail);
