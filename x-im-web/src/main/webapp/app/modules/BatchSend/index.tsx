import React, { Component } from 'react';
import { Modal, ModalBody } from 'app/shared/Modal';
import { connect } from 'react-redux';
import han from 'han';
import { IRootState } from 'app/shared/reducers';
import { showMessage } from 'app/shared/reducers/snackbar';
import { sendMessage } from 'app/shared/reducers/chat';
import { getSearchEntities, getEntity, getEntities, updateEntity, createEntity, reset, CustomerRelationState } from 'app/shared/reducers/customer-relation.reducer';
import classnames from 'classnames';
import './style.scss';
import MessageInput from 'app/shared/MessageInput';
import { toggle as imagePasteConfirmToogle } from 'app/shared/reducers/ImagePasteConfirm';

export interface IProps extends StateProps, DispatchProps { }
export interface IState {
    user: { //  群信息
        MemberList: []
    };
    list: [];   //  所有关系成员
    filtered: [];   //  检索后的关系成员列表
    selected: [];   //  选择后的关系成员列表
    query: string;
}
class BatchSend extends React.Component<IProps, IState> {
    timer;
    searchInput;
    constructor(props) {
        super(props);
    }
    confirmSendImage = image => {
        if (!this.props.confirmImagePaste) {
            return true;
        }
        const confirmed = this.props.imagePasteConfirmToogle(true, image);
        return confirmed;
    }
    /**
     * 插入真实DOM完成
     * 1.初始化项目基本信息
     */
    componentDidMount() {
        this.setState({
            selected: []
        });
        this.search();
    }
    search = (text = '') => {
        text = text.trim();

        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            let list = this.props.customerRelationList;
            if (text) {
                text = han.letter(text.toLocaleLowerCase());
                list = list.filter(e => {
                    // let res = han.letter(e.NickName).toLowerCase().indexOf(text) > -1;
                    // if (e.RemarkName) {
                    //     res = res || han.letter(e.RemarkName).toLowerCase().indexOf(text) > -1;
                    // }
                    return '';  // return res;
                });
                // this.setState({
                //     filtered: list
                // });
                return;
            }
        }, 300);
        this.setState({
            filtered: []
        });
    }
    close() {
        this.setState({
            selected: []
        });
        this.props.batchSendToogle(false);
    }

    handleSelected(user) {
        let selected = this.state.selected;
        let index = selected.findIndex(e => e.UserName === user.UserName);

        if (index === -1) {
            selected.push(user);
        } else {
            selected = [
                ...selected.slice(0, index),
                ...selected.slice(index + 1, selected.length),
            ];
        }

        this.setState({
            selected,
        });
    }

    selectAll() {
        let contacts = this.props.contacts;
        let selected = this.state.selected;
        let isall = contacts.length === selected.length;

        if (isall) {
            // Unselected all user
            selected = [];
        } else {
            selected = contacts.map(e => Object.assign({}, e));
        }

        this.setState({
            selected,
        });
    }

    render() {
        let { contacts, searching, filtered, showMessage, sendMessage, confirmSendImage, process } = this.props;

        if (!this.props.show) {
            return false;
        }

        return (
            <div className={'container'}>
                <header>
                    <input
                        autoFocus={true}
                        ref = {this.searchInput}
                        onInput={e => this.search(this.searchInput.value)}
                        placeholder="Batch to send message, Choose one or more user."
                        type="text" />

                    <span>
                        <i
                            className={classnames('icon-ion-android-done-all', {
                                ['active']: this.state.selected.length === contacts.length
                            })}
                            onClick={() => this.selectAll()}
                            style={{
                                marginRight: 20
                            }} />
                        <i
                            className="icon-ion-android-close"
                            onClick={e => this.close()} />
                    </span>
                </header>

                <ul className={'list'}>
                    {
                        (searching && filtered.length === 0) && (
                            <div className={'notfound'}>
                                <img src="assets/images/crash.png" />
                                <h1>Can't find any people matching '{searching}'</h1>
                            </div>
                        )
                    }

                    {
                        (searching ? filtered : contacts).map((e, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => this.handleSelected(e)}>
                                    <div
                                        className={'cover'}
                                        style={{
                                            backgroundImage: `url(${e.HeadImgUrl})`,
                                        }} />
                                    <span
                                        className={'username'}
                                        dangerouslySetInnerHTML={{ __html: e.RemarkName || e.NickName }} />

                                    {
                                        this.state.selected.find(user => user.UserName === e.UserName) && (
                                            <i className="icon-ion-android-done" />
                                        )
                                    }
                                </li>
                            );
                        })
                    }
                </ul>

                <div className={'footer'}>
                    <MessageInput {...{
                        className: 'input',
                        me: this.props.account,
                        sendMessage,
                        showMessage,
                        user: this.state.selected,
                        confirmSendImage,
                        process
                    }} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ app, authentication, settings, customerRelation }: IRootState) => ({
    show: app.isBatchsendShow,
    account: authentication.account,
    customerRelationList: customerRelation.entities,
    confirmImagePaste: settings.confirmImagePaste
});
const mapDispatchToProps = {
    sendMessage,
    showMessage,
    process,
    imagePasteConfirmToogle
};

//  用于把当前 Redux store state 映射到展示组件的 props 中
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BatchSend);
