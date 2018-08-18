
import React, { Component } from 'react';
import { Modal, ModalBody } from 'app/shared/Modal';

import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { getSession, login } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import { setLocale, setIsShowImWindows } from 'app/shared/reducers/locale';
import './style.css';
import UserList from 'app/shared/UserList';
import helper from 'app/shared/util/helper';

import { newChatToogle } from 'app/shared/reducers/app';
import { getSearchEntities, getEntity, getEntities, updateEntity, createEntity, reset, CustomerRelationState } from 'app/shared/reducers/customer-relation.reducer';
import { chatTo } from 'app/shared/reducers/chat';
import { createEntity as createCustomerFlock } from 'app/shared/reducers/customer-flock.reducer';

export interface IProps extends StateProps, DispatchProps { }
class NewChat extends React.Component<IProps> {
    state = {
        query: '',
        selected: []
    };
    userRef;
    /**
     * 发起单聊或群聊
     */
    async chat() {
        const selected = this.state.selected;

        if (selected.length === 1) {
            this.props.chatTo(this.props.getUser(selected[0]));
        } else {
            // You can not create a chat room by another chat room
            // let user = await this.props.createChatRoom(selected.filter(e => !helper.isChatRoom(e)));
            // this.props.chatTo(user);
        }

        this.close();
        setTimeout(() => {
            document.querySelector('#messageInput').focus();
        });
    }
    /**
     * 关闭窗口并清空数据
     */
    close() {
        this.setState({
            ...this.state,
            query: ''
        });
        //  @wait:情况已查列表
        newChatToogle(false);
        this.setState({
            selected: []
        });
    }
    /**
     * 用户列表
     */
    renderList = () => {
        const { show, search, getList } = this.props;
        const { query } = this.state;
        const onChange = (selected: []) => {
            this.setState({
                query,
                selected
            });
        };
        if (!show) {
            return false;
        }
        return (
            <UserList {...{
                ref: this.userRef,
                search,
                getList,
                query,
                onChange
            }} />
        );
    }

    render() {
        return (
            <Modal
                fullscreen={true}
                onCancel={e => this.close()}
                show={this.props.show}>
                <ModalBody className={'container'}>
                    New Chat ({this.state.selected.length} / 20)

                    <div className={'avatars'}>
                        {
                            this.state.selected.map((e, index) => {
                                this.props.getUser(e);
                                const customerRelation = this.props.customerRelation;
                                // @wait: customer待级联 customerRelation.customer.HeadImgUrl
                                return (
                                    <img
                                        key={index}
                                        onClick={ev => this.userRef.removeSelected(e)}
                                        src={''} />
                                );
                            })
                        }
                    </div>

                    {this.renderList()}

                    <div>
                        <button
                            disabled={!this.state.selected.length}
                            onClick={e => this.chat()}>
                            聊天
                        </button>

                        <button onClick={e => this.close()}>Cancel</button>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}
const mapStateToProps = ({ app, authentication, applicationProfile, snackbarState }: IRootState, { entity }: CustomerRelationState) => ({
    show: app.isNewChatShow,
    getList: () => getEntities,
    getUser: getEntity,
    customerRelation: entity,
    search: getSearchEntities,
    createChatRoom: createCustomerFlock,
    chatTo: (user: any) => chatTo(user)
  });
const mapDispatchToProps = { setLocale, getSession, getProfile };
//  用于把当前 Redux store state 映射到展示组件的 props 中
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewChat);
