
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import classes from './style.css';

@inject(stores => ({
    avatar: stores.session.avatar,
    code: stores.session.code,
    getCode: stores.session.getCode,
    login: stores.session.login,
}))
@observer
export default class Login extends Component {
    componentDidMount() {
        //  获取验证码
        this.props.getCode();
    }
    loginClick(e) {
        let credentials = {
            username: this.refs.username.value,
            password: this.refs.password.value,
            rememberMe: this.refs.rememberMe.value === 'on'
        };
        this.props.login(credentials);
    }

    render() {
        return (
            <div className={classes.container}>
                <input
                    id="username"
                    value={'admin'}
                    placeholder="登录名（admin）"
                    ref="username"
                    type="text" />
                <input
                    id="password"
                    value={'admin'}
                    placeholder="密码（admin）"
                    ref="password"
                    type="password" />
                <label htmlFor="rememberMe">
                    <input
                        id="rememberMe"
                        type="checkbox"
                        ref="rememberMe"
                        checked={true} />
                    <span >记住我</span>
                </label>
                <button onClick={e => this.loginClick(e)}>登录</button>
            </div>
        );
    }
}
