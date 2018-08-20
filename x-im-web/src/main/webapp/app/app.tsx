import 'react-toastify/dist/ReactToastify.css';
import './app.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import { HashRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { IRootState } from 'app/shared/reducers';
import { getSession, login } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import { setLocale, setIsShowImWindows } from 'app/shared/reducers/locale';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';
import { Affix, Button } from '_antd@3.7.2@antd';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import LoginModal from 'app/modules/login/login-modal';
import UserInfo from 'app/modules/UserInfo';
import AddFriend from 'app/modules/AddFriend';
import NewChat from 'app/modules/NewChat';
import Members from 'app/modules/Members';
import AddMember from 'app/modules/AddMember';
import BatchSend from 'app/modules/BatchSend';
import Forward from 'app/modules/Forward';
import ConfirmImagePaste from 'app/modules/ConfirmImagePaste';
import Loader from './shared/Loader';
import Snackbar from './shared/Snackbar';
import Offline from './shared/Offline';
import { toggle } from 'app/shared/reducers/snackbar';
import classnames from 'classnames';
import 'antd/dist/antd.css';

export interface IAppProps extends StateProps, DispatchProps { }
export class App extends React.Component<IAppProps> {
  //  是否展示找不到网络连接页面
  isOffline = true;
  state = {
    isOffline: false,
    isOndragleave: false
  };
  /**
   *  1.初始化项目基本信息
   *  2.获取用户信息
   *  @wait: 3.获取消息列表
   *  @wait: 3.获取用户系统设置信息
   */
  componentDidMount() {
    this.props.getSession();
    this.props.getProfile();

    window.addEventListener('offline', () => {
      this.setState({
        isOffline: true
      });
    });
    window.addEventListener('online', () => {
      this.setState({
        offline: false
      });
    });
    //  拖动元素来到放置领域
    window.ondragover = e => {
      //  是否有直接发送的对象
      if (this.props.canidrag()) {
        this.setState({
          isOndragleave: true
        });
        // this.refs.holder.classList.add(classes.show);
        // this.refs.viewport.classList.add(classes.blur);
      }

      // If not st as 'copy', electron will open the drop file
      e.dataTransfer.dropEffect = 'copy';
      return false;
    };

    //  文件放弃拖入
    window.ondragleave = () => {
      if (!this.props.canidrag()) return false;
      this.setState({
        isOndragleave: false
      });
      // this.refs.holder.classList.remove('show');
      // this.refs.viewport.classList.remove('blur');
    };
    //  拖动完毕时触发
    window.ondragend = e => false;
    //  可拖动元素放置后
    window.ondrop = e => {
      const files = e.dataTransfer.files;
      e.preventDefault(); //  阻止冒泡
      e.stopPropagation();

      if (files.length && this.props.canidrag()) {
        //  批量发送文件
        // Array.from(files).map(e => this.props.process(e));
      }
      this.setState({
        isOndragleave: false
      });
      // this.refs.holder.classList.remove('show');
      // this.refs.viewport.classList.remove('blur');
      return false;
    };
  }
  /**
   *  1.显示/隐藏窗口弹窗
   */
  showImWindows = event => {
    this.props.setIsShowImWindows(!this.props.isShowImWindows);
    // this.setState({
    //   isShowImWindows: !this.props.isShowImWindows,
    // });
  };
  render() {
    const paddingTop = '60px';
    if (!window.navigator.onLine) {
      return (
        <Offline show={this.isOffline} style={{
          top: 0,
          paddingTop: 30
        }} />
      );
    }
    //  未登录打开登录界面
    if (!this.props.isAuthenticated) {
      return <LoginModal handleLogin={login} loginError={this.props.loginError} />;
    }
    return (
      <Router>
        <div>
          <Snackbar
            close={close}
            isShow={this.props.isShow}
            text={this.props.message} />

          <Loader show={this.props.loading} />
          <Header location={location} />
          <div
            className={classnames({ 'container': true, 'show': this.state.isOndragleave })}>
            <AppRoutes />
          </div>
          <Footer
            location={location} />
          {/* 用户信息 */}
          <UserInfo />
          {/* 新增好友 */}
          <AddFriend />
          {/* 新建单聊/群聊 */}
          <NewChat />
          <Members />
          <BatchSend />
          <AddMember />
          <ConfirmImagePaste />
          <Forward />

          <Offline show={this.state.isOffline} />;
          <div className={classnames({ 'dragDropHolder': true, 'show': this.state.isOndragleave })}>
            <div className={'inner'}>
              <div>
                <img src="assets/images/filetypes/image.png" />
                <img src="assets/images/filetypes/word.png" />
                <img src="assets/images/filetypes/pdf.png" />
                <img src="assets/images/filetypes/archive.png" />
                <img src="assets/images/filetypes/video.png" />
                <img src="assets/images/filetypes/audio.png" />
              </div>

              <i className="icon-ion-ios-cloud-upload-outline" />

              <h2>拖入文件到此</h2>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ authentication, applicationProfile, locale, snackbar }: IRootState) => ({
  message: snackbar.message,  //  消息提示
  isShow: snackbar.isShow,
  close: () => toggle(false),
  canidrag: () => false,  //  拖入文件是否可以直接发送，否则需暂时复制
  currentLocale: locale.currentLocale,
  loginError: authentication.loginError,
  loading: authentication.loading,
  isAuthenticated: authentication.isAuthenticated,  //  未登录为false，登录为身份信息
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  ribbonEnv: applicationProfile.ribbonEnv,
  isInProduction: applicationProfile.inProduction,
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled,
  isShowImWindows: locale.isShowImWindows
});

const mapDispatchToProps = { setLocale, getSession, getProfile, setIsShowImWindows };

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
)(App);
