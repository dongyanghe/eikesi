import 'react-toastify/dist/ReactToastify.css';
import './app.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import { HashRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import { setLocale, setIsShowImWindows } from 'app/shared/reducers/locale';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';
import { Affix, Button } from 'antd';
import 'antd/dist/antd.css';
export interface IAppProps extends StateProps, DispatchProps {}

export class App extends React.Component<IAppProps> {
  /**
   *  1.初始化项目基本信息
   *  2.获取用户信息
   *  @wait: 3.获取消息列表
   *  @wait: 3.获取用户系统设置信息
   * */
  componentDidMount() {
    this.props.getSession();
    this.props.getProfile();
  }
  showImWindows = event => {
    debugger;
    this.props.setIsShowImWindows(!this.props.isShowImWindows);
    // this.setState({
    //   isShowImWindows: !this.props.isShowImWindows,
    // });
  };
  render() {
    const paddingTop = '60px';
    return (
      <Router>
        <div className="app-container" style={{ paddingTop }}>
          <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />

          <div className="container-fluid view-container" id="app-view-container">
            <Card className="jh-card">
              <ErrorBoundary>
                <AppRoutes />
              </ErrorBoundary>
            </Card>
          </div>
          {/*{this.props.isAuthenticated && (*/}
            {/*<Affix style={{ position: 'absolute', bottom: 30, right: 30 }}>*/}
              {/*<Button type="danger" shape="circle" onClick={this.showImWindows}>*/}
                {/*<i className="iconfont x-tubiao15" />*/}
              {/*</Button>*/}
            {/*</Affix>*/}
          {/*)}*/}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ authentication, applicationProfile, locale }: IRootState) => ({
  currentLocale: locale.currentLocale,
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  ribbonEnv: applicationProfile.ribbonEnv,
  isInProduction: applicationProfile.inProduction,
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled,
  isShowImWindows: locale.isShowImWindows
});

const mapDispatchToProps = { setLocale, getSession, getProfile, setIsShowImWindows };

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
