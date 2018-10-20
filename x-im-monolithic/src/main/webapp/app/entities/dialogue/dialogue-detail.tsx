import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './dialogue.reducer';
import { IDialogue } from 'app/shared/model/dialogue.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDialogueDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DialogueDetail extends React.Component<IDialogueDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { dialogueEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="imApp.dialogue.detail.title">Dialogue</Translate> [<b>{dialogueEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="createdDate">
                <Translate contentKey="imApp.dialogue.createdDate">Created Date</Translate>
              </span>
              <UncontrolledTooltip target="createdDate">
                <Translate contentKey="imApp.dialogue.help.createdDate" />
              </UncontrolledTooltip>
            </dt>
            <dd>
              <TextFormat value={dialogueEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createdId">
                <Translate contentKey="imApp.dialogue.createdId">Created Id</Translate>
              </span>
              <UncontrolledTooltip target="createdId">
                <Translate contentKey="imApp.dialogue.help.createdId" />
              </UncontrolledTooltip>
            </dt>
            <dd>{dialogueEntity.createdId}</dd>
            <dt>
              <span id="targetId">
                <Translate contentKey="imApp.dialogue.targetId">Target Id</Translate>
              </span>
              <UncontrolledTooltip target="targetId">
                <Translate contentKey="imApp.dialogue.help.targetId" />
              </UncontrolledTooltip>
            </dt>
            <dd>{dialogueEntity.targetId}</dd>
            <dt>
              <span id="targetType">
                <Translate contentKey="imApp.dialogue.targetType">Target Type</Translate>
              </span>
              <UncontrolledTooltip target="targetType">
                <Translate contentKey="imApp.dialogue.help.targetType" />
              </UncontrolledTooltip>
            </dt>
            <dd>{dialogueEntity.targetType}</dd>
          </dl>
          <Button tag={Link} to="/entity/dialogue" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/dialogue/${dialogueEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ dialogue }: IRootState) => ({
  dialogueEntity: dialogue.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogueDetail);
