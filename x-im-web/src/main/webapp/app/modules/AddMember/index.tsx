import React, { Component } from 'react';
import { Modal, ModalBody } from 'app/shared/Modal';
import { connect } from 'react-redux';
import han from 'han';
import { IRootState } from 'app/shared/reducers';
import { showMessage } from 'app/shared/reducers/snackbar';
import { process, sendMessage } from 'app/shared/reducers/chat';
import { batchSendToogle } from 'app/shared/reducers/app';
import { getSearchEntities, getEntity, getEntities, updateEntity, createEntity, reset, CustomerRelationState } from 'app/shared/reducers/customer-relation.reducer';
import classnames from 'classnames';
import './style.scss';
import UserList from 'app/shared/UserList';
import helper from 'app/shared/util/helper';

@inject(stores => ({
    show: stores.addmember.show,
    searching: stores.addmember.query,
    getList: () => {
        var { addmember, contacts } = stores;

        if (addmember.query) {
            return addmember.list;
        }

        return contacts.memberList.filter(
            e => !helper.isChatRoom(e.UserName)
                && !helper.isFileHelper(e)
                && e.UserName !== stores.session.user.User.UserName
        );
    },
    addMember: async(userids) => {
        var roomid = stores.chat.user.UserName;

        return stores.addmember.addMember(roomid, userids);
    },
    getUser: (userid) => {
        return stores.contacts.memberList.find(e => e.UserName === userid);
    },
    search: stores.addmember.search,
    close: () => {
        stores.addmember.reset();
        stores.addmember.toggle(false);
    },
}))
export interface IProps extends StateProps, DispatchProps { }
export interface IState {
    user: { //  群信息
        MemberList: []
    };
    list: [];   //  所有关系成员
    filtered: [];   //  检索后的关系成员列表
    selected: [];   //  选择后的关系成员列表
}
export default class AddMember extends Component {
    state = {
        selected: [],
    };

    close() {
        this.props.close();
        this.setState({
            selected: [],
        });
    }

    async add(userids) {
        await this.props.addMember(userids);
        this.close();
    }

    renderList() {
        var self = this;
        var { show, searching, search, getList } = this.props;

        if (!show) {
            return false;
        }

        return (
            <UserList {...{
                ref: 'users',

                search,
                getList,
                searching,
                max: -1,

                onChange(selected) {
                    self.setState({
                        selected,
                    });
                }
            }} />
        );
    }

    render() {
        return (
            <Modal
                fullscreen={true}
                onCancel={e => this.close()}
                show={this.props.show}>
                <ModalBody className={classes.container}>
                    Add Members

                    <div className={classes.avatars}>
                        {
                            this.state.selected.map((e, index) => {
                                var user = this.props.getUser(e);
                                return (
                                    <img
                                        key={index}
                                        onClick={ev => this.refs.users.removeSelected(e)}
                                        src={user.HeadImgUrl} />
                                );
                            })
                        }
                    </div>

                    {this.renderList()}

                    <div>
                        <button
                            disabled={!this.state.selected.length}
                            onClick={e => this.add(this.state.selected)}>
                            Add
                        </button>

                        <button onClick={e => this.close()}>Cancel</button>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}
