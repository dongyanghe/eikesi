import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { chatTo, markedRead, sticky, removeChat } from 'app/shared/reducers/chat';
import classNames from 'classnames/bind';
import moment from 'moment';

import './style.scss';
import helper from 'app/shared/util/helper';

moment.updateLocale('zh-cn', {
  relativeTime: {
    future: 'dans %s',
    past: '%s',
    m: '1 min',
    mm: '%d mins',
    h: 'an hour',
    hh: '%d h',
    s: 'now',
    ss: '%d s',
    d: 'un jour',
    dd: '%d jours',
    M: 'un mois',
    MM: '%d mois',
    y: 'un an',
    yy: '%d ans'
  }
});
export interface IProps extends StateProps, DispatchProps {}
export class Chats extends React.Component<IProps> {
  containerRef;
  getTheLastestMessage(userid) {
    const list = this.props.messages.get(userid);
    let res;

    if (list) {
      // Make sure all chatset has be loaded
      res = list.data.slice(-1)[0];
    }

    return res;
  }

  hasUnreadMessage = userid => {
    const list = this.props.messages.get(userid);

    if (list) {
      return list.data.length !== (list.unread || 0);
    }
  };

  showContextMenu = user => () => {
    console.error('Chats showContextMenu unrealized：', user);
  };

  componentDidUpdate() {
    const active = this.containerRef.querySelector(`.chat .active`);

    if (active) {
      const rect4active = active.getBoundingClientRect();
      const rect4viewport = this.containerRef.getBoundingClientRect();

      // Keep the conversation always in the viewport
      if (!(rect4active.top >= rect4viewport.top && rect4active.bottom <= rect4viewport.bottom)) {
        active.scrollIntoViewIfNeeded();
      }
    }
  }

  render() {
    const { loading, chats, selected, searching } = this.props;

    if (loading) return false;

    return (
      <div className={'container'}>
        <div className={'chats'} ref={this.containerRef}>
          {!searching &&
            chats.map((e, index) => {
              const message = this.getTheLastestMessage(e.UserName) || {};
              const muted = helper.isMuted(e);
              const isTop = helper.isTop(e);

              return (
                <div
                  className={classNames('chat', {
                    ['sticky']: isTop,
                    ['active']: selected && selected.UserName === e.UserName
                  })}
                  key={index}
                  onContextMenu={this.showContextMenu(e)}
                  onClick={this.props.chatTo(e)}
                >
                  <div className={'inner'}>
                    <div
                      className={classNames('dot', {
                        ['green']: !muted && this.hasUnreadMessage(e.UserName),
                        ['red']: muted && this.hasUnreadMessage(e.UserName)
                      })}
                    >
                      <img className="disabledDrag" src={e.HeadImgUrl} />
                    </div>

                    <div className={'info'}>
                      <p className={'username'} dangerouslySetInnerHTML={{ __html: e.RemarkName || e.NickName }} />

                      <span className={'message'} dangerouslySetInnerHTML={{ __html: helper.getMessageContent(message) || 'No Message' }} />
                    </div>
                  </div>

                  <span className={'times'}>{message.CreateTime ? moment(message.CreateTime * 1000).fromNow() : ''}</span>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication, customerRelation, chat, app }: IRootState) => ({
  chats: chat.sessions,
  selected: chat.user,
  messages: chat.messagesMap,
  loading: customerRelation.loading,
  searching: app.isSearchShow
});

const mapDispatchToProps = { chatTo, markedRead, sticky, removeChat };

//  用于把当前 Redux store state 映射到展示组件的 props 中
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
/**
 * 主页面
 * index.tsx激活render
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chats);
