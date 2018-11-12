import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './history-message.reducer';
import { IHistoryMessage } from 'app/shared/model/history-message.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHistoryMessageDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class HistoryMessageDetail extends React.Component<IHistoryMessageDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { historyMessageEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="imApp.historyMessage.detail.title">HistoryMessage</Translate> [<b>{historyMessageEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="content">
                <Translate contentKey="imApp.historyMessage.content">Content</Translate>
              </span>
              <UncontrolledTooltip target="content">
                <Translate contentKey="imApp.historyMessage.help.content" />
              </UncontrolledTooltip>
            </dt>
            <dd>{historyMessageEntity.content}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="imApp.historyMessage.status">Status</Translate>
              </span>
              <UncontrolledTooltip target="status">
                <Translate contentKey="imApp.historyMessage.help.status" />
              </UncontrolledTooltip>
            </dt>
            <dd>{historyMessageEntity.status}</dd>
            <dt>
              <span id="createdDate">
                <Translate contentKey="imApp.historyMessage.createdDate">Created Date</Translate>
              </span>
              <UncontrolledTooltip target="createdDate">
                <Translate contentKey="imApp.historyMessage.help.createdDate" />
              </UncontrolledTooltip>
            </dt>
            <dd>
              <TextFormat value={historyMessageEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createdId">
                <Translate contentKey="imApp.historyMessage.createdId">Created Id</Translate>
              </span>
              <UncontrolledTooltip target="createdId">
                <Translate contentKey="imApp.historyMessage.help.createdId" />
              </UncontrolledTooltip>
            </dt>
            <dd>{historyMessageEntity.createdId}</dd>
            <dt>
              <span id="targetDate">
                <Translate contentKey="imApp.historyMessage.targetDate">Target Date</Translate>
              </span>
              <UncontrolledTooltip target="targetDate">
                <Translate contentKey="imApp.historyMessage.help.targetDate" />
              </UncontrolledTooltip>
            </dt>
            <dd>
              <TextFormat value={historyMessageEntity.targetDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="targetId">
                <Translate contentKey="imApp.historyMessage.targetId">Target Id</Translate>
              </span>
              <UncontrolledTooltip target="targetId">
                <Translate contentKey="imApp.historyMessage.help.targetId" />
              </UncontrolledTooltip>
            </dt>
            <dd>{historyMessageEntity.targetId}</dd>
          </dl>
          <Button tag={Link} to="/entity/history-message" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/history-message/${historyMessageEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ historyMessage }: IRootState) => ({
  historyMessageEntity: historyMessage.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryMessageDetail);
