import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './customer-relation.reducer';
import { ICustomerRelation } from 'app/shared/model/customer-relation.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerRelationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICustomerRelationState {
  search: string;
}

export class CustomerRelation extends React.Component<ICustomerRelationProps, ICustomerRelationState> {
  state: ICustomerRelationState = {
    search: ''
  };

  componentDidMount() {
    this.props.getEntities();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.props.getEntities();
    this.setState({
      search: ''
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

  render() {
    const { customerRelationList, match } = this.props;
    return (
      <div>
        <h2 id="customer-relation-heading">
          <Translate contentKey="imWebGatewayApp.customerRelation.home.title">Customer Relations</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="imWebGatewayApp.customerRelation.home.createLabel">Create new Customer Relation</Translate>
          </Link>
        </h2>
        <Row>
          <Col sm="12">
            <AvForm onSubmit={this.search}>
              <AvGroup>
                <InputGroup>
                  <AvInput
                    type="text"
                    name="search"
                    value={this.state.search}
                    onChange={this.handleSearch}
                    placeholder={translate('imWebGatewayApp.customerRelation.home.search')}
                  />
                  <Button className="input-group-addon">
                    <FontAwesomeIcon icon="search" />
                  </Button>
                  <Button type="reset" className="input-group-addon" onClick={this.clear}>
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </InputGroup>
              </AvGroup>
            </AvForm>
          </Col>
        </Row>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="imWebGatewayApp.customerRelation.remarkName">Remark Name</Translate>
                </th>
                <th>
                  <Translate contentKey="imWebGatewayApp.customerRelation.py">Py</Translate>
                </th>
                <th>
                  <Translate contentKey="imWebGatewayApp.customerRelation.pinYin">Pin Yin</Translate>
                </th>
                <th>
                  <Translate contentKey="imWebGatewayApp.customerRelation.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="imWebGatewayApp.customerRelation.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="imWebGatewayApp.customerRelation.customer">Customer</Translate>
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
                    {customerRelation.customerFirstName ? (
                      <Link to={`customer/${customerRelation.customerId}`}>{customerRelation.customerFirstName}</Link>
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
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerRelation);
