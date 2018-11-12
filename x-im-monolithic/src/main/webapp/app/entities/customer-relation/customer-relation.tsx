import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './customer-relation.reducer';
import { ICustomerRelation } from 'app/shared/model/customer-relation.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerRelationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class CustomerRelation extends React.Component<ICustomerRelationProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { customerRelationList, match } = this.props;
    return (
      <div>
        <h2 id="customer-relation-heading">
          <Translate contentKey="imApp.customerRelation.home.title">Customer Relations</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="imApp.customerRelation.home.createLabel">Create new Customer Relation</Translate>
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
                  <Translate contentKey="imApp.customerRelation.remarkName">Remark Name</Translate>
                </th>
                <th>
                  <Translate contentKey="imApp.customerRelation.py">Py</Translate>
                </th>
                <th>
                  <Translate contentKey="imApp.customerRelation.pinYin">Pin Yin</Translate>
                </th>
                <th>
                  <Translate contentKey="imApp.customerRelation.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="imApp.customerRelation.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="imApp.customerRelation.customer">Customer</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {customerRelationList.map((customerRelation, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${customerRelation.id}`} color="link" size="sm">
                      {customerRelation.id}
                    </Button>
                  </td>
                  <td>{customerRelation.remarkName}</td>
                  <td>{customerRelation.py}</td>
                  <td>{customerRelation.pinYin}</td>
                  <td>{customerRelation.type}</td>
                  <td>
                    <TextFormat type="date" value={customerRelation.createdDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    {customerRelation.customer ? (
                      <Link to={`customer/${customerRelation.customer.id}`}>{customerRelation.customer.firstName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${customerRelation.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${customerRelation.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${customerRelation.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ customerRelation }: IRootState) => ({
  customerRelationList: customerRelation.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerRelation);
