import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './flock-relation.reducer';
import { IFlockRelation } from 'app/shared/model/flock-relation.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFlockRelationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IFlockRelationState {
  search: string;
}

export class FlockRelation extends React.Component<IFlockRelationProps, IFlockRelationState> {
  state: IFlockRelationState = {
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
    const { flockRelationList, match } = this.props;
    return (
      <div>
        <h2 id="flock-relation-heading">
          <Translate contentKey="imWebGatewayApp.flockRelation.home.title">Flock Relations</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="imWebGatewayApp.flockRelation.home.createLabel">Create new Flock Relation</Translate>
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
                    placeholder={translate('imWebGatewayApp.flockRelation.home.search')}
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
                  <Translate contentKey="imWebGatewayApp.flockRelation.remarkName">Remark Name</Translate>
                </th>
                <th>
                  <Translate contentKey="imWebGatewayApp.flockRelation.py">Py</Translate>
                </th>
                <th>
                  <Translate contentKey="imWebGatewayApp.flockRelation.pinYin">Pin Yin</Translate>
                </th>
                <th>
                  <Translate contentKey="imWebGatewayApp.flockRelation.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="imWebGatewayApp.flockRelation.createdDate">Created Date</Translate>
                </th>
                <th>
                  <Translate contentKey="imWebGatewayApp.flockRelation.customer">Customer</Translate>
                </th>
                <th>
                  <Translate contentKey="imWebGatewayApp.flockRelation.customerFlock">Customer Flock</Translate>
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
                    {flockRelation.customerFirstName ? (
                      <Link to={`customer/${flockRelation.customerId}`}>{flockRelation.customerFirstName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {flockRelation.customerFlockName ? (
                      <Link to={`customerFlock/${flockRelation.customerFlockId}`}>{flockRelation.customerFlockName}</Link>
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
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlockRelation);
