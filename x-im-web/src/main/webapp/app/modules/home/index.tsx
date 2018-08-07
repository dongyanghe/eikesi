import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import classnames from 'classnames';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const { account } = this.props;
    return (
      <Row>
        <Col md="9" className="container">
          <div className={classnames('inner', {
            'hideConversation': !this.props.showConversation
          })}>
            <div className={'left'}>
              <SearchBar />
              <Chats />

              {
                this.props.showRedIcon && (
                  <div
                    className={'addChat'}
                    onClick={() => this.props.newChat()}>
                    <i className="icon-ion-android-add" />
                  </div>
                )
              }
            </div>

            <div className={'right'}>
              <ChatContent />
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
