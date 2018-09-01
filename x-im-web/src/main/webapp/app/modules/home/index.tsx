import './home.scss';

import React from 'react';
import { IRootState } from 'app/shared/reducers';
import { getSession, login } from 'app/shared/reducers/authentication';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import classnames from 'classnames';
import { newChatToogle } from 'app/shared/reducers/app';
import { toggleConversation } from 'app/shared/reducers/chat';
import ChatContent from 'app/modules/home/ChatContent';
import Chats from 'app/modules/home/Chats';
import SearchBar from 'app/modules/home/SearchBar';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
  }

  render() {
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
                    onClick={() => this.props.newChatToogle(true)}>
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

const mapStateToProps = ({ settings, chat, app }: IRootState) => ({
  showConversation: chat.showConversation,
  showRedIcon: settings.showRedIcon,
  toggle: () => app.isNewChatShow
});

const mapDispatchToProps = { newChatToogle, toggleConversation };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
