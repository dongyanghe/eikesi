import React, { Component } from 'react';
import { Modal, ModalBody } from 'app/shared/Modal';
import { connect } from 'react-redux';
import han from 'han';
import { IRootState } from 'app/shared/reducers';
import { addMemberToogle } from 'app/shared/reducers/app';
import { getSearchEntities as getSearchCustomerRelation, updateEntity as updateCustomerRelation, resetSerchEntitieList } from 'app/shared/reducers/customer-relation.reducer';
import './style.scss';
import UserList from 'app/shared/UserList';
import helper from 'app/shared/util/helper';

export interface IProps extends StateProps, DispatchProps { }
export interface IState {
    searching: '';
    selected: any[];   //  选择后的关系成员列表
}
class AddMember extends React.Component<IProps, IState> {
    userListRef;
    getList = (): ReadonlyArray<any> => {
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
    /**
     * 将选中的用户列表加入该群
     * @defect: userids是数组
     */
    addMember = async (userids: any) => {
        // const roomid = this.props.chatMember.id;

        // return this.props.createFlockRelation({ customerFlockId: this.props.chatMember.id, customerId: userids }, userids);
    }

    getUser = (userId: number) => this.props.customerRelationList.find(e => e.id === userId);

    close = (): void => {
        this.userListRef.value = '';
        this.props.resetSerchEntitieList();
        this.props.addMemberToogle(false);
        this.setState({
            searching: '',
            selected: []
        });
    }

    async add(userids) {
        await this.addMember(userids);
        this.close();
    }

    renderList = () => {
        if (!this.props.isAddMembersShow) {
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
                onCancel={e => this.close()}
                show={this.props.isAddMembersShow}>
                <ModalBody className={'container'}>
                    添加群成员

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
                            onClick={e => this.add(this.state.selected)}>
                            添加
                        </button>

                        <button onClick={e => this.close()}>取消</button>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}

const mapStateToProps = ({ app, authentication, chat, customerRelation, flockRelation }: IRootState) => ({
    account: authentication.account,
    isAddMembersShow: app.isAddMembersShow,
    customerRelationList: customerRelation.entities,    //  用户所有关系成员列表
    serchCustomerRelationList: customerRelation.serchEntitieList, //  用户检索后的关系成员列表
    chatMember: chat.user
});
const mapDispatchToProps = {
    // createFlockRelation,
    getSearchCustomerRelation,
    addMemberToogle,
    resetSerchEntitieList
};
//  用于把当前 Redux store state 映射到展示组件的 props 中
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddMember);
