import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './flock-relation.reducer';
import { IFlockRelation } from 'app/shared/model/flock-relation.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFlockRelationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class FlockRelation extends React.Component<IFlockRelationProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { flockRelationList, match } = this.props;
    return (
      <div>
        <h2 id="flock-relation-heading">
          <Translate contentKey="imApp.flockRelation.home.title">Flock Relations</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="imApp.flockRelation.home.createLabel">Create new Flock Relation</Translate>
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
                  <Translate contentKey="imApp.flockRelation.remarkName">Remark Name</Translate>
                </th>
                <th>
                  <Translate contentKey="imApp.flockRelation.py">Py</Translate>
                </th>
                <th>
                  <Translate contentKey="imApp.flockRelation.pinYin">Pin Yin</Translate>
                </th>
                <th>
                  <Translate contentKey="imApp.flockRelation.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="imApp.flockRelation.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="imApp.flockRelation.customer">Customer</Translate>
                </th>
                <th>
                  <Translate contentKey="imApp.flockRelation.customerFlock">Customer Flock</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {flockRelationList.map((flockRelation, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${flockRelation.id}`} color="link" size="sm">
                      {flockRelation.id}
                    </Button>
                  </td>
                  <td>{flockRelation.remarkName}</td>
                  <td>{flockRelation.py}</td>
                  <td>{flockRelation.pinYin}</td>
                  <td>{flockRelation.type}</td>
                  <td>
                    <TextFormat type="date" value={flockRelation.createdDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    {flockRelation.customer ? (
                      <Link to={`customer/${flockRelation.customer.id}`}>{flockRelation.customer.firstName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {flockRelation.customerFlock ? (
                      <Link to={`customer-flock/${flockRelation.customerFlock.id}`}>{flockRelation.customerFlock.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${flockRelation.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${flockRelation.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${flockRelation.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ flockRelation }: IRootState) => ({
  flockRelationList: flockRelation.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlockRelation);
