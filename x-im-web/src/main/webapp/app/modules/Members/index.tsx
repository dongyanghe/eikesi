
import React, { Component } from 'react';
import { Modal, ModalBody } from 'app/shared/Modal';
import { connect } from 'react-redux';
import han from 'han';
import { IRootState } from 'app/shared/reducers';
import { newMemberToogle } from 'app/shared/reducers/app';
import { getSearchEntities, getEntity, getEntities, updateEntity, createEntity, reset, CustomerRelationState } from 'app/shared/reducers/customer-relation.reducer';
import './style.scss';
import helper from 'app/shared/util/helper';

export interface IProps extends StateProps, DispatchProps { }
export interface IState {
    user: {
        MemberList: []
    };
    list: [];
    filtered: [];
    query: string;
  }
class Members extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
      }
    /**
     * 显示/隐藏用户信息
     */
    toggle = (show = this.props.show, user = this.state.user) => {
        let list: [] = [];
        newMemberToogle(show);
        this.setState({
            user
        });
        if (show === false) {
            this.setState({
                query: '',
                filtered: []
            });
            return;
        }
        this.setState({
            list: user.MemberList
        });
        Promise.all(
            user.MemberList.map(async e => {
                const pallet = e.pallet;
                if (!pallet) {
                    e.pallet = await helper.getPallet(e.HeadImgUrl);
                }
                list.push(e);
            })
        ).then(() => {
            this.setState({
                list
            });
        });
    }
    /**
     * 快速搜索
     */
    search = (query = '') => {
        let filtered: [] = [];
        this.setState({
            query
        });

        if (query) {
            filtered = this.state.list.filter(e => {
                return han.letter(e.NickName).toLowerCase().indexOf(han.letter(query.toLocaleLowerCase())) > -1;
            });
            this.setState({
                filtered
            });

            return;
        }
        this.setState({
            filtered: []
        });
    }

    render() {
        const { user, searching, list, filtered } = this.props;
        if (!this.props.show) {
            return false;
        }
        return (
            <div className={'container'} >
                <header>
                    <span dangerouslySetInnerHTML={{ __html: `Group '${user.NickName}' has ${list.length} members` }} />

                    <span>
                        <i
                            className="icon-ion-android-add"
                            onClick={e => this.props.addMember()}
                            style={{
                                marginRight: 20
                            }} />
                        <i
                            className="icon-ion-android-close"
                            onClick={e => this.toggle(false)} />
                    </span>
                </header>

                <ul className={'list'}>
                    {
                        (searching && filtered.length === 0) && (
                            <div className={'notfound'}>
                                <img src="assets/images/crash.png" />
                                <h1>找不到匹配的人： '{searching}'</h1>
                            </div>
                        )
                    }

                    {
                        (searching ? filtered : list).map((e, index) => {
                            const pallet = e.pallet || [];
                            const frontColor = pallet[1] || [0, 0, 0];

                            return (
                                <li
                                    key={index}
                                    onClick={ev => this.props.showUserinfo(e)}
                                    style={{
                                        color: `rgb(
                                            ${frontColor[0]},
                                            ${frontColor[1]},
                                            ${frontColor[2]}
                                        )`
                                    }}>
                                    <div
                                        className={'cover'}
                                        style={{
                                            backgroundImage: `url(${e.HeadImgUrl})`,
                                        }} />
                                    <span
                                        className={'username'}
                                        dangerouslySetInnerHTML={{ __html: e.NickName }} />
                                </li>
                            );
                        })
                    }
                </ul>

                <div className={'footer'}>
                    <input
                        autoFocus={true}
                        id="messageInput"
                        maxLength={30}
                        onInput={e => this.search(e.target.value)}
                        placeholder="请输入搜索关键字..."
                        type="text" />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ app, authentication, applicationProfile, chat, customerRelation }: IRootState) => ({
    show: app.isMembersShow,
    account: authentication.account
});
const mapDispatchToProps = {
    showUserinfo: async (user: any, account) => {
        const caniremove = helper.isChatRoomOwner(stores.members.user);

        if (user.UserName === account.UserName) {
            user = account;
        } else {
            stores.contacts.memberList.find(e => {
                // Try to find contact in contacts
                if (e.UserName === user.UserName) {
                    return (user = e);
                }
            });
        }

        stores.userinfo.toggle(true, user, caniremove);
    },
    addMember: () => {
        stores.members.toggle(false);
        stores.addmember.toggle(true);
    }
};
//  用于把当前 Redux store state 映射到展示组件的 props 中
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Members);