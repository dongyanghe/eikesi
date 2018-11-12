import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './dialogue.reducer';
import { IDialogue } from 'app/shared/model/dialogue.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDialogueProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Dialogue extends React.Component<IDialogueProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { dialogueList, match } = this.props;
    return (
      <div>
        <h2 id="dialogue-heading">
          <Translate contentKey="imApp.dialogue.home.title">Dialogues</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="imApp.dialogue.home.createLabel">Create new Dialogue</Translate>
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
                  <Translate contentKey="imApp.dialogue.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="imApp.dialogue.createdId">Created Id</Translate>
                </th>
                <th>
                  <Translate contentKey="imApp.dialogue.targetId">Target Id</Translate>
                </th>
                <th>
                  <Translate contentKey="imApp.dialogue.targetType">Target Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {dialogueList.map((dialogue, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${dialogue.id}`} color="link" size="sm">
                      {dialogue.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={dialogue.createdDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{dialogue.createdId}</td>
                  <td>{dialogue.targetId}</td>
                  <td>{dialogue.targetType}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${dialogue.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${dialogue.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${dialogue.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ dialogue }: IRootState) => ({
  dialogueList: dialogue.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dialogue);
