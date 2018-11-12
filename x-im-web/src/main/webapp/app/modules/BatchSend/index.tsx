import React, { Component } from 'react';
import { Modal, ModalBody } from 'app/shared/Modal';
import { connect } from 'react-redux';
import han from 'han';
import { IRootState } from 'app/shared/reducers';
import { showMessage } from 'app/shared/reducers/snackbar';
import { process, sendMessage } from 'app/shared/reducers/chat';
import { batchSendToogle } from 'app/shared/reducers/app';
import {
  getSearchEntities,
  getEntity,
  getEntities,
  updateEntity,
  createEntity,
  reset,
  CustomerRelationState
} from 'app/shared/reducers/customer-relation.reducer';
import classnames from 'classnames';
import './style.scss';
import MessageInput from 'app/shared/MessageInput';
import { toggle as imagePasteConfirmToogle } from 'app/shared/reducers/ImagePasteConfirm';

export interface IProps extends StateProps, DispatchProps {}
export interface IState {
  user: {
    //  群信息
    MemberList: any[];
  };
  list: any[]; //  所有关系成员
  filtered: any[]; //  检索后的关系成员列表
  selected: any[]; //  选择后的关系成员列表
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
  };
  /**
   * 插入真实DOM完成
   * 1.初始化项目基本信息
   */
  componentDidMount() {
    this.setState({
      ...this.state,
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
          return ''; // return res;
        });
        // this.setState({
        //     filtered: list
        // });
        return;
      }
    }, 300);
    this.setState({
      ...this.state,
      filtered: []
    });
  };

  close = () => {
    this.setState({
      selected: []
    });
    this.props.batchSendToogle(false);
  };

  handleSelected = (user: any) => {
    /* let selected = this.state.selected;
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
            selected
        }); */
  };

  selectAll() {
    /*  const contacts = this.props.customerRelationList;
         let selected = this.state.selected;
         const isAll = contacts.length === selected.length;
         if (isAll) {
             // Unselected all user
             selected = [];
         } else {
             selected = contacts.map(e => Object.assign({}, e));
         }
         this.setState({
             selected
         }); */
  }

  render() {
    if (!this.props.isBatchsendShow) {
      return false;
    }
    return (
      <div className={'container'}>
        <header>
          <input
            autoFocus={true}
            ref={this.searchInput}
            onInput={e => this.search(this.searchInput.value)}
            placeholder="Batch to send message, Choose one or more user."
            type="text"
          />

          <span>
            <i
              className={classnames('icon-ion-android-done-all', {
                ['active']: this.state.selected.length === this.props.customerRelationList.length
              })}
              onClick={() => this.selectAll()}
              style={{
                marginRight: 20
              }}
            />
            <i className="icon-ion-android-close" onClick={e => this.close()} />
          </span>
        </header>

        <ul className={'list'}>
          {this.searchInput.value &&
            this.state.filtered.length === 0 && (
              <div className={'notfound'}>
                <img src="assets/images/crash.png" />
                <h1>找不到用户 '{this.searchInput.value}'</h1>
              </div>
            )}

          {
            // (this.searchInput.value ? this.state.filtered : this.props.customerRelationList).map((e, index) => (
            //         <li
            //             key={index}
            //             onClick={() => this.handleSelected(e)}>
            //             <div
            //                 className={'cover'}
            //                 style={{
            //                     backgroundImage: `url(${'e.HeadImgUrl'})`
            //                 }} />
            //             <span
            //                 className={'username'}
            //                 dangerouslySetInnerHTML={{ __html: e.remarkName || e.customerFirstName }} />
            //             {
            //                 /* this.state.selected.find(user => user.id === e.id) && (
            //                     <i className="icon-ion-android-done" />
            //                 ) */
            //             }
            //         </li>
            //     )
            // )
          }
        </ul>

        <div className={'footer'}>
          <MessageInput
            {...{
              className: 'input',
              me: this.props.account,
              sendMessage: this.props.sendMessage,
              showMessage: this.props.showMessage,
              user: this.state.selected,
              confirmSendImage: this.confirmSendImage,
              process
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ app, authentication, settings, customerRelation }: IRootState) => ({
  isBatchsendShow: app.isBatchsendShow,
  account: authentication.account,
  customerRelationList: customerRelation.entities,
  confirmImagePaste: settings.confirmImagePaste
});
const mapDispatchToProps = {
  sendMessage,
  showMessage,
  process,
  imagePasteConfirmToogle,
  batchSendToogle
};
//  用于把当前 Redux store state 映射到展示组件的 props 中
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BatchSend);
