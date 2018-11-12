import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './current-message.reducer';
import { ICurrentMessage } from 'app/shared/model/current-message.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICurrentMessageProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class CurrentMessage extends React.Component<ICurrentMessageProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { currentMessageList, match } = this.props;
    return (
      <div>
        <h2 id="current-message-heading">
          <Translate contentKey="imApp.currentMessage.home.title">Current Messages</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="imApp.currentMessage.home.createLabel">Create new Current Message</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="imApp.currentMessage.content">Content</Translate>
                </th>
                <th>
                  <Translate contentKey="imApp.currentMessage.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="imApp.currentMessage.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="imApp.currentMessage.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="imApp.currentMessage.createdId">Created Id</Translate>
                </th>
                <th>
                  <Translate contentKey="imApp.currentMessage.targetDate">Target Date</Translate>
                </th>
                <th>
                  <Translate contentKey="imApp.currentMessage.targetId">Target Id</Translate>
                </th>
                <th>
                  <Translate contentKey="imApp.currentMessage.dialogue">Dialogue</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {currentMessageList.map((currentMessage, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${currentMessage.id}`} color="link" size="sm">
                      {currentMessage.id}
                    </Button>
                  </td>
                  <td>{currentMessage.content}</td>
                  <td>{currentMessage.status}</td>
                  <td>{currentMessage.type}</td>
                  <td>
                    <TextFormat type="date" value={currentMessage.createdDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{currentMessage.createdId}</td>
                  <td>
                    <TextFormat type="date" value={currentMessage.targetDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{currentMessage.targetId}</td>
                  <td>
                    {currentMessage.dialogue ? (
                      <Link to={`dialogue/${currentMessage.dialogue.id}`}>{currentMessage.dialogue.targetId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${currentMessage.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${currentMessage.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${currentMessage.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ currentMessage }: IRootState) => ({
  currentMessageList: currentMessage.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentMessage);
