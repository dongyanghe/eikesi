import React, { Component } from 'react';
import { Modal, ModalBody } from 'app/shared/Modal';
import { connect } from 'react-redux';
import han from 'han';
import { IRootState } from 'app/shared/reducers';
import './style.scss';
import { forwardToogle } from 'app/shared/reducers/app';
import { sendMessage } from 'app/shared/reducers/chat';
import UserList from 'app/shared/UserList';
import { getSearchEntities, getEntity, getEntities, updateEntity, createEntity as createFlockRelation, reset } from 'app/shared/reducers/flock-relation.reducer';
import { getSearchEntities as getSearchCustomerRelation, getEntity as getCustomerRelation, resetSerchEntitieList } from 'app/shared/reducers/customer-relation.reducer';
import classnames from 'classnames';
import helper from 'app/shared/util/helper';

export interface IProps extends StateProps, DispatchProps { }
export interface IState {
    searching: '';
    selected: [];   //  选择后的关系成员列表
}
class Forward extends React.Component<IProps, IState> {
    userListRef;
    getList = () => {
        //  如果有查询直接读取查询列表
        if (this.props.serchCustomerRelationList && this.props.serchCustomerRelationList.length) {
            return this.props.serchCustomerRelationList;
        }
        //  返回用户成员列表，排除群成员等
        return this.props.customerRelationList.filter(
            e => !helper.isChatRoom(e.id)
                && !helper.isFileHelper(e)
                && e.id !== this.props.account.id
        );
    }

    getUser = (userId: number) => this.props.customerRelationList.find(e => e.id === userId);

    close = () => {
        this.props.forwardToogle(false);
        this.setState({
            searching: '',
            selected: []
        });
    }

    send = (userids: []) => {
        userids.map(e => {
            const message = this.props.selectedMessage;
            const user = { id: e };
            this.props.sendMessage(user, message, true);
        });
        this.props.forwardToogle(false);
    }

    renderList() {
        if (!this.props.isForwardShow) {
            return false;
        }

        return (
            <UserList {...{
                ref: this.userListRef,
                search: this.props.getSearchCustomerRelation,
                getList: this.getList,
                searching: this.state.searching,
                max: -1,

                onChange(selected) {
                    this.setState({
                        selected
                    });
                }
            }} />
        );
    }

    render() {
        return (
            <Modal
                fullscreen={true}
                onCancel={e => this.props.forwardToogle(false)}
                show={this.props.isForwardShow}>
                <ModalBody className={'container'}>
                    转发消息

                    <div className={'avatars'}>
                        {
                            this.state.selected.map((e, index) => {
                                const user = this.getUser(e);
                                return (
                                    <img
                                        key={index}
                                        onClick={ev => this.userListRef.users.removeSelected(e)}
                                        src={'user.HeadImgUrl'} />
                                );
                            })
                        }
                    </div>

                    {this.renderList()}

                    <div>
                        <button
                            disabled={!this.state.selected.length}
                            onClick={e => this.send(this.state.selected)}>
                            发送
                        </button>

                        <button onClick={e => this.props.forwardToogle(false)}>取消</button>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}
const mapStateToProps = ({ app, authentication, chat, customerRelation, flockRelation }: IRootState) => ({
    account: authentication.account,
    isForwardShow: app.isForwardShow,
    selectedMessage: chat.selectedMessage,
    customerRelationList: customerRelation.entities,    //  用户所有关系成员列表
    serchCustomerRelationList: customerRelation.serchEntitieList, //  用户检索后的关系成员列表
    chatMember: chat.user
});
const mapDispatchToProps = {
    getCustomerRelation,
    getSearchCustomerRelation,
    forwardToogle,
    resetSerchEntitieList,
    sendMessage
};
//  用于把当前 Redux store state 映射到展示组件的 props 中
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Forward);
