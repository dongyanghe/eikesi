
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import pinyin from 'han';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { getSession, login } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import { setLocale, setIsShowImWindows } from 'app/shared/reducers/locale';
import './style.scss';
import Avatar from 'app/shared/Avatar';
import { Modal, ModalBody } from 'app/shared/Modal';
import helper from 'app/shared/util/helper';
import showMessage from 'app/shared/reducers/snackbar';

export interface IProps extends StateProps, DispatchProps { }
export interface IState {
    isShow: boolean;
    remove: boolean;
    showEdit: boolean;
  }
export class UserInfo extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            remove: false,
            showEdit: false
        };
    }
    toggleEdit(showEdit = !this.state.showEdit) {
        this.setState({ showEdit });
    }

    toggle = () => console.warn('UserInfo toggle unrealized：');

    handleClose = () => console.warn('UserInfo handleClose unrealized：');

    handleError(e) {
        e.target.src = 'http://i.pravatar.cc/200';
    }

    async handleEnter(e) {
        console.warn('UserInfo handleEnter unrealized：', e);
    }

    handleAction(user) {
        console.warn('UserInfo handleEnter unrealized：', user);
    }

    render() {
        const { UserName, HeadImgUrl, NickName, RemarkName, Signature, City, Province } = this.props.user;
        const isFriend = false; //  helper.isContact(this.props.user);
        const pallet = this.props.pallet;
        const isme = this.props.isme();
        let background = pallet[0];
        let gradient = 'none';
        let fontColor = '#777';
        let buttonColor = '#777';

        if (background) {
            const pallet4font = pallet[1] || [0, 0, 0];
            const pallet4button = pallet[2] || [0, 0, 0];

            gradient = `
                -webkit-linear-gradient(top, rgb(${background[0]}, ${background[1]}, ${background[2]}) 5%, rgba(${background[0]}, ${background[1]}, ${background[2]}, 0) 15%),
                -webkit-linear-gradient(bottom, rgb(${background[0]}, ${background[1]}, ${background[2]}) 5%, rgba(${background[0]}, ${background[1]}, ${background[2]}, 0) 15%),
                -webkit-linear-gradient(left, rgb(${background[0]}, ${background[1]}, ${background[2]}) 5%, rgba(${background[0]}, ${background[1]}, ${background[2]}, 0) 15%),
                -webkit-linear-gradient(right, rgb(${background[0]}, ${background[1]}, ${background[2]}) 5%, rgba(${background[0]}, ${background[1]}, ${background[2]}, 0) 15%)
            `;
            background = `rgba(${background[0]}, ${background[1]}, ${background[2]}, 1)`;
            fontColor = `rgb(
                ${pallet4font[0]},
                ${pallet4font[1]},
                ${pallet4font[2]},
            )`;
            buttonColor = `rgb(
                ${pallet4button[0]},
                ${pallet4button[1]},
                ${pallet4button[2]},
            )`;
        } else {
            background = '#fff';
        }

        return (
            <Modal
                onCancel={ this.handleClose }
                show={ this.state.isShow }>
                <ModalBody className={'container'}>
                    <div
                        className={classnames('hero', {
                            ['showEdit']: this.state.showEdit,
                            ['large']: !this.state.remove,
                            ['isme']: isme
                        })}
                        onClick={() => {
                            const showEdit = this.state.showEdit;

                            if (showEdit) {
                                this.toggleEdit();
                            }
                        }} style={{
                            background,
                            color: fontColor
                        }}>

                        {
                            (!isme && isFriend) && (
                                <div
                                    className={'edit'}
                                    onClick={() => this.toggleEdit()}>
                                    <i className="icon-ion-edit" />
                                </div>
                            )
                        }

                        <div className={'inner'}>
                            <div
                                className={'mask'}
                                style={{
                                    background: gradient
                                }} />
                            <Avatar src={HeadImgUrl} />
                        </div>

                        <div
                            className={'username'}
                            dangerouslySetInnerHTML={{ __html: NickName }} />

                        {
                            !this.state.remove ? (
                                <div className={'wrap'}>
                                    <p dangerouslySetInnerHTML={{ __html: Signature || 'No Signature' }} />

                                    <div className={'address'}>
                                        <i
                                            className="icon-ion-android-map"
                                            style={{ color: fontColor }} />

                                        {City || 'UNKNOW'}, {Province || 'UNKNOW'}
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className={'action'}
                                    onClick={() => this.props.removeMember(this.props.user)}
                                    style={{
                                        color: buttonColor,
                                        opacity: .6,
                                        marginTop: 20,
                                        marginBottom: -30
                                    }}>
                                    Delete
                                </div>
                            )
                        }

                        <div
                            className={'action'}
                            onClick={() => this.handleAction(this.props.user)}
                            style={{
                                color: buttonColor,
                                opacity: .6
                            }}>
                            {helper.isChatRoom(UserName) || isFriend ? 'Send Message' : 'Add Friend'}
                        </div>
                    </div>

                    {
                        /* eslint-disable */
                        this.state.showEdit && (
                            <input
                                autoFocus={true}
                                defaultValue={RemarkName}
                                onKeyPress={e => this.handleEnter(e)}
                                placeholder="Type the remark name"
                                type="text" />
                        )
                        /* eslint-enable */
                    }
                </ModalBody>
            </Modal>
        );
    }
}

const mapStateToProps = ({ authentication, applicationProfile, locale }: IRootState) => ({
    pallet: [],
    user: authentication.account,
    isme: () => authentication.account.user
            && authentication.account.UserName === authentication.account.User.UserName
  });

  const mapDispatchToProps = {
    chatTo: (userId: string) => {
        console.warn('UserInfo chatTo unrealized：', userId);
    },
    removeMember: async (user: any) => {
        console.warn('UserInfo removeMember unrealized：', user);
    },
    refreshContacts: async (user: any) => {
        console.warn('UserInfo refreshContacts unrealized：', user);
    },
    showAddFriend: (user: any) => {
        console.warn('UserInfo showAddFriend unrealized：', user);
    }
};
  //  用于把当前 Redux store state 映射到展示组件的 props 中
  type StateProps = ReturnType<typeof mapStateToProps>;
  type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserInfo);
