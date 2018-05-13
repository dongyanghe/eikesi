
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { HashRouter } from 'react-router-dom';
import ElectronCookies from '@exponent/electron-cookies';
import { ipcRenderer } from 'electron';

import './global.css';
import './assets/fonts/icomoon/style.css';
import 'utils/albumcolors';
import getRoutes from './js/routes';
import stores from './js/stores';
import config from '../config';
import axios from 'axios/index';

ElectronCookies.enable({
    origin: 'https://wx.qq.com',
    debugger: 'https://127.0.0.1',
});
/** ********************************************-start 请求处理******************************************************* **/
axios.defaults.baseURL = config[config.serviceType].requestUrl;
axios.defaults.timeout = 8000;
//  http request 封装请求头拦截器
axios.interceptors.request.use(
    config => {
        const jwt = window.localStorage.authenticationToken || window.sessionStorage.authenticationToken;
        if (jwt) {
            config.headers.Authorization = 'Bearer ' + jwt;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    }
);
//  http response 封装后台返回拦截器
axios.interceptors.response.use(
    response => {
        return response;
    }, error => {
        return Promise.reject(error);
    }
);
/** **********************************************- end 请求处理******************************************************* **/
class App extends Component {
    canisend() {
        return this.refs.navigator.history.location.pathname === '/'
            && stores.chat.user;
    }
    /**
     * @call: 组件准备挂载
     */
    // constructor() {
    //
    // }
    /**
     * 程序初始化
     * @call: constructor之后，render之前。
     * @returns {Promise<void>}
     */
    async componentWillMount() {
        //  是否联网
        if (window.navigator.onLine) {
            await stores.session.hasLogin();
            await stores.settings.init();
            await stores.search.getHistory();
        }
    }

    render() {
        return (
            <Provider {...stores}>
                <HashRouter ref="navigator">
                    {getRoutes()}
                </HashRouter>
            </Provider>
        );
    }

    /**
     * @call: 组件已经完全挂载到网页
     */
    componentDidMount() {
        var navigator = this.refs.navigator;

        // Hide the tray icon
        ipcRenderer.on('hide-tray', () => {
            stores.settings.setShowOnTray(false);
        });

        // Chat with user
        ipcRenderer.on('message-chatto', (event, args) => {
            var user = stores.contacts.memberList.find(e => e.UserName === args.id);

            navigator.history.push('/');
            setTimeout(stores.chat.chatTo(user));
        });

        // Show the user info
        ipcRenderer.on('show-userinfo', (event, args) => {
            var user = stores.contacts.memberList.find(e => e.UserName === args.id);
            stores.userinfo.toggle(true, user);
        });

        // Shwo the settings page
        ipcRenderer.on('show-settings', () => {
            navigator.history.push('/settings');
        });

        // Show a modal to create a new conversation
        ipcRenderer.on('show-newchat', () => {
            navigator.history.push('/');
            stores.newchat.toggle(true);
        });

        // Show the conversation pane
        ipcRenderer.on('show-conversations', () => {
            if (this.canisend()) {
                stores.chat.toggleConversation();
            }
        });

        // Search in currently conversation list
        ipcRenderer.on('show-search', () => {
            navigator.history.push('/');
            stores.chat.toggleConversation(true);

            setTimeout(() => document.querySelector('#search').focus());
        });

        // Show the home page
        ipcRenderer.on('show-messages', () => {
            navigator.history.push('/');
            stores.chat.toggleConversation(true);
        });

        // Batch send message
        ipcRenderer.on('show-batchsend', () => {
            stores.batchsend.toggle(true);
        });

        // Insert the qq emoji
        ipcRenderer.on('show-emoji', () => {
            if (this.canisend()) {
                document.querySelector('#showEmoji').click();
            }
        });

        // Show contacts page
        ipcRenderer.on('show-contacts', () => {
            navigator.history.push('/contacts');
        });

        // Go to next conversation
        ipcRenderer.on('show-next', () => {
            navigator.history.push('/');
            stores.chat.toggleConversation(true);
            setTimeout(stores.chat.chatToNext);
        });

        // Go to the previous conversation
        ipcRenderer.on('show-previous', () => {
            navigator.history.push('/');
            stores.chat.toggleConversation(true);
            setTimeout(stores.chat.chatToPrev);
        });

        // When the system resume reconnet to WeChat
        ipcRenderer.on('os-resume', async() => {
            var session = stores.session;

            console.log('os-resume' + new Date());
            setTimeout(() => {
                session.checkTimeout(true);
            }, 3000);
        });

        // Show the daemon error
        ipcRenderer.on('show-errors', (event, args) => {
            stores.snackbar.showMessage(args.message);
        });
    }
    /**
     * @call: 组件更新结束之后执行，在初始化render时不执行
     */
    // componentDidUpdate() {
    //
    // }
}

render(
    <App />,
    document.getElementById('root')
);
