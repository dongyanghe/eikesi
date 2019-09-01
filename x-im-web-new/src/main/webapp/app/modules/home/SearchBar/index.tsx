
import React from 'react';
import { connect } from 'react-redux';

import { IRootState } from 'app/shared/reducers';
import { searchToogle } from 'app/shared/reducers/app';
import { chatTo } from 'app/shared/reducers/chat';
import './style.scss';
import ErrorBoundary from './../../../shared/error/error-boundary';
const mapStateToProps = ({ app, applicationProfile, locale, snackbar }: IRootState) => ({
    searching: app.isSearchShow,
    result: {   //  后台检索返回
        query: '',
        friend: [],
        groups: []
    }
  });

  const mapDispatchToProps = {
    searchToogle,
    getPlaceholder: () => [],
    chat: (user: any) => {
        chatTo(user);
        searchToogle(false);
        const searchChatHistoryListStr = localStorage.getItem('searchChatHistoryList') || '[]';
        const searchChatHistoryList = JSON.parse(searchChatHistoryListStr);
        searchChatHistoryList.push(user);
        localStorage.setItem('searchChatHistoryList', JSON.stringify(searchChatHistoryList));
    },
    clear: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        e.stopPropagation();
        localStorage.setItem('searchChatHistoryList', null);
        searchToogle(false);
    }
};

export interface IProps extends StateProps, DispatchProps { }
export class SearchBar extends React.Component<IProps> {
    timer;
    searchRef;
    dropdownRef;
    filter = (e?: any | IHTMLInputEvent) => () => {
      const text = e.target.value;
      console.warn('SearchBar filter unrealized：', text);
    }

    handleBlur = (e?: any | IHTMLInputEvent) => () => {
      const value = e.target.value;
        setTimeout(() => {
            if (!value) {
                this.props.searchToogle(false);
            }
        }, 500);
    }

    chatTo = user => () => {
        this.props.chat(user);
        this.searchRef.value = '';
        (document.querySelector('#messageInput') as HTMLInputElement).focus();
    }

    highlight = offset => () => {
        console.warn('SearchBar filter unrealized：', offset);
    }

    navigation = e => () => {
        const { result, getPlaceholder } = this.props;
        const searchChatHistoryListStr = localStorage.getItem('searchChatHistoryList') || '[]';
        const searchChatHistoryList = JSON.parse(searchChatHistoryListStr);
        // User press ESC
        if (e.keyCode === 27) {
            e.target.blur();
        }

        if (![
            38, // Up
            40, // Down
            13 // Enter
        ].includes(e.keyCode)) {
            return;
        }

        switch (e.keyCode) {
            case 38:
                // Up
                this.highlight(-1);
                break;

            case 40:
                // Down
                this.highlight(1);
                break;

            case 13:
                const active = this.dropdownRef.querySelector(`.${'user'}.${'active'}`);

                if (!active) {
                    break;
                }
                this.chatTo([...result.friend, ...result.groups, ...searchChatHistoryList, ...getPlaceholder()].find(user => user.UserName === active.dataset.userid));
                break;
            default:
                    console.error('SearchBar switch unrealized：', e.keyCode);
            }
    }

    renderUser(user) {
        return (
            <div
                className={'user'}
                onClick={this.chatTo(user)} data-userid={user.UserName}>
                <img src={user.HeadImgUrl} />

                <div className={'info'}>
                    <p
                        className={'username'}
                        dangerouslySetInnerHTML={{ __html: user.RemarkName || user.NickName }} />

                    <span
                        className={'signature'}
                        dangerouslySetInnerHTML={{ __html: user.Signature || 'No Signature' }} />
                </div>
            </div>
        );
    }

    renderList(list, title) {
        if (!list.length) return false;

        return (
            <div>
                <header>
                    <h3>{title}</h3>
                </header>
                {
                    list.map((e, index) => (
                        <div key={index}>
                            {this.renderUser(e)}
                        </div>
                    ))
                }
            </div>
        );
    }

    renderHistory(list) {
        return (
            <div>
                <header>
                    <h3>History</h3>

                    <a
                        href=""
                        onClick={this.props.clear}>
                        CLEAR
                    </a>
                </header>
                {
                    list.map((e, index) => (
                        <div key={index}>
                            {this.renderUser(e)}
                        </div>
                    ))
                }
            </div>
        );
    }

    renderPlaceholder() {
        const list = this.props.getPlaceholder();

        return list.map((e, index) => (
            <div key={index}>
                {this.renderList(e.list, e.prefix)}
            </div>
        ));
    }

    render() {
        const { searching, result } = this.props;

        const searchChatHistoryListStr = localStorage.getItem('searchChatHistoryList') || '[]';
        const searchChatHistoryList = JSON.parse(searchChatHistoryListStr);
        return (
            <div className={'container'}>
                <i className="icon-ion-ios-search-strong" />
                <input
                    id="search"
                    onBlur={this.handleBlur(event)}
                    onFocus={this.filter(event)}
                    onInput={this.filter(this.searchRef.value)}
                    onKeyUp={this.navigation(event)}
                    placeholder="Search ..."
                    ref={this.searchRef}
                    type="text" />
                {
                    searching && (
                        <div
                            className={'dropdown'}
                            ref={this.dropdownRef}>
                            {
                                !result.query && (searchChatHistoryList.length ? this.renderHistory(searchChatHistoryList) : this.renderPlaceholder())
                            }

                            {this.renderList(result.friend, 'Friend')}
                            {this.renderList(result.groups, 'Group')}
                        </div>
                    )
                }
            </div>
        );
    }
}

interface IHTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
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
  )(SearchBar);
