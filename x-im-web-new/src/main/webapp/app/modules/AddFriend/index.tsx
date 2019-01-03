
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Modal, ModalBody } from 'app/shared/Modal';
import { getSession, login } from 'app/shared/reducers/authentication';
import { getEntity, updateEntity, createEntity, reset } from 'app/shared/reducers/customer-relation.reducer';

import { getProfile } from 'app/shared/reducers/application-profile';
import { setLocale, setIsShowImWindows } from 'app/shared/reducers/locale';
import './style.scss';
export interface IProps extends StateProps, DispatchProps { }
class AddFriend extends React.Component<IProps> {
    inputRef;
    addFriend() {
        this.props.sendRequest(this.inputRef.value);
        this.props.close();
    }

    render() {
        const { me, show, close } = this.props;
        const fullscreen = true;
        return (
            <Modal
                fullscreen={fullscreen}
                onCancel={e => close()}
                show={show}>
                <ModalBody className={'container'}>
                    Send friend request first

                    <input
                        autoFocus={true}
                        defaultValue={`Hallo, im ${me && me.User.NickName}`}
                        ref={this.inputRef}
                        type="text" />

                    <div>
                        <button onClick={e => this.addFriend()}>发送</button>

                        <button onClick={e => close()}>取消</button>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}

const mapStateToProps = ({ authentication, applicationProfile, locale, snackbar }: IRootState) => ({
    sendRequest: createEntity,
    show: false,
    me: authentication.account,
    close: () => {
        console.warn('UserInfo AddFriend unrealized：');
    }
  });

  const mapDispatchToProps = { setLocale, getSession, getProfile };
  //  用于把当前 Redux store state 映射到展示组件的 props 中
  type StateProps = ReturnType<typeof mapStateToProps>;
  type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddFriend);
