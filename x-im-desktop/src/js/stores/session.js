
/* eslint-disable no-eval */
import axios from 'axios';
import { observable, action } from 'mobx';
import config from '../../../config/index';
import helper from 'utils/helper';
import storage from 'utils/storage';
import { normalize } from 'utils/emoji';
import chat from './chat';
import contacts from './contacts';

const CancelToken = axios.CancelToken;

class Session {
    //  @debug: 将true改为false
    @observable loading = false;
    @observable auth;
    @observable code;
    @observable avatar;
    @observable user;
    @observable userIdentity;
    @observable jwt;

    syncKey;

    genSyncKey(list) {
        return (self.syncKey = list.map(e => `${e.Key}_${e.Val}`).join('|'));
    }

    /**
     * 获取验证码——@wait: 2018年5月12日 21:47:43 暂不添加
     * @returns {Promise<*>}
     */
    @action async getCode() {
        return console.log('获取验证码未实现!');
    }

    /**
     * 存储登录记录
     * @param jwt
     * @param rememberMe
     */
    @action async storeAuthenticationToken(jwt, rememberMe) {
        self.jwt = jwt;
        if (rememberMe) {
            window.localStorage.authenticationToken = self.jwt;
        } else {
            window.sessionStorage.authenticationToken = self.jwt;
        }
    }

    /**
     * 获取用户信息，如果没有则发送请求后获取
     * @param force 是否重新从服务器获取
     * @returns {Promise<*>}
     */
    @action async getAccout(force) {
        if (force === true) {
            self.userIdentity = undefined;
        }
        if (self.userIdentity) {
            return self.userIdentity;
        }
        var response = await axios.get(
            config[config.serviceType].requestUrl + 'api/account');
        const account = response.data;
        if (account) {
            self.userIdentity = account;
            // this.authenticated = true;
        } else {
            self.userIdentity = null;
            // this.authenticated = false;
        }
        window.localStorage.userIdentity = self.userIdentity;
        self.auth = self.userIdentity;
        await storage.set('auth', self.userIdentity);
        return self.userIdentity;
    }
    /**
     * 1.发送登录请求
     * 2.保存登录信息
     * @returns {Promise<void>}
     */
    @action async login(credentials) {
        // Already logined
        if (self.auth) return;

        var response = await axios.post(config[config.serviceType].requestUrl + 'api/authenticate', credentials);
        const bearerToken = response.headers.authorization;
        if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
            const jwt = bearerToken.slice(7, bearerToken.length);
            await self.storeAuthenticationToken(jwt, credentials.rememberMe);
            //  刷新userIdentity
            await self.getAccout(true);
        }
    }

    /**
     * 根据用户初始化界面数据
     * @returns {Promise<*>}
     */
    @action async initUser() {
        /**
         * 获取登录用户信息和正在交互的群组+服务的消息列表
         * @type {any}
         */
        var response = await axios.post(`/cgi-bin/mmwebwx-bin/webwxinit?r=${-new Date()}&pass_ticket=${self.auth.passTicket}`, {
            BaseRequest: {
                Sid: self.auth.wxsid,
                Uin: self.auth.wxuin,
                Skey: self.auth.skey,
            }
        });
        //  获取消息通知
        await axios.post(`/cgi-bin/mmwebwx-bin/webwxstatusnotify?lang=en_US&pass_ticket=${self.auth.passTicket}`, {
            BaseRequest: {
                Sid: self.auth.wxsid,
                Uin: self.auth.wxuin,
                Skey: self.auth.skey,
            },
            ClientMsgId: +new Date(),
            Code: 3,
            FromUserName: response.data.User.UserName,
            ToUserName: response.data.User.UserName,
        });
        //  获取用户信息
        self.user = response.data;
        //  为头像添加域名
        self.user.ContactList.map(e => {
            e.HeadImgUrl = `${axios.defaults.baseURL}${e.HeadImgUrl.substr(1)}`;
        });
        await contacts.getContats();
        //  通讯列表的用户id，用“,”分割
        await chat.loadChats(self.user.ChatSet);

        return self.user;
    }

    async getNewMessage() {
        var auth = self.auth;
        var response = await axios.post(`/cgi-bin/mmwebwx-bin/webwxsync?sid=${auth.wxsid}&skey=${auth.skey}&lang=en_US&pass_ticket=${auth.passTicket}`, {
            BaseRequest: {
                Sid: auth.wxsid,
                Uin: auth.wxuin,
                Skey: auth.skey,
            },
            SyncKey: self.user.SyncKey,
            rr: ~new Date(),
        });
        var mods = [];

        // Refresh the sync keys
        self.user.SyncKey = response.data.SyncCheckKey;
        self.genSyncKey(response.data.SyncCheckKey.List);

        // Get the new friend, or chat room has change
        response.data.ModContactList.map(e => {
            var hasUser = contacts.memberList.find(user => user.UserName === e.UserName);

            if (hasUser) {
                // Just update the user
                contacts.updateUser(e);
            } else {
                // If user not exists put it in batch list
                mods.push(e.UserName);
            }
        });

        // Delete user
        response.data.DelContactList.map((e) => {
            contacts.deleteUser(e.UserName);
            chat.removeChat(e);
        });

        if (mods.length) {
            await contacts.batch(mods, true);
        }

        response.data.AddMsgList.map(e => {
            var from = e.FromUserName;
            var to = e.ToUserName;
            var fromYourPhone = from === self.user.User.UserName && from !== to;

            // When message has been readed on your phone, will receive this message
            if (e.MsgType === 51) {
                return chat.markedRead(fromYourPhone ? from : to);
            }

            e.Content = normalize(e.Content);

            // Sync message from your phone
            if (fromYourPhone) {
                // Message is sync from your phone
                chat.addMessage(e, true);
                return;
            }

            if (from.startsWith('@')) {
                chat.addMessage(e);
            }
        });

        return response.data;
    }

    // A callback for cancel the sync request
    cancelCheck = window.Function;

    checkTimeout(weakup) {
        // Kill the zombie request or duplicate request
        self.cancelCheck();
        clearTimeout(self.checkTimeout.timer);

        if (helper.isSuspend() || weakup) {
            return;
        }

        self.checkTimeout.timer = setTimeout(() => {
            self.cancelCheck();
        }, 30 * 1000);
    }

    async keepalive() {
        var auth = self.auth;
        var response = await axios.post(`/cgi-bin/mmwebwx-bin/webwxsync?sid=${auth.wxsid}&skey=${auth.skey}&lang=en_US&pass_ticket=${auth.passTicket}`, {
            BaseRequest: {
                Sid: auth.wxsid,
                Uin: auth.wxuin,
                Skey: auth.skey,
            },
            SyncKey: self.user.SyncKey,
            rr: ~new Date(),
        });
        var host = axios.defaults.baseURL.replace('//', '//webpush.');
        var loop = async() => {
            // Start detect timeout
            self.checkTimeout();

            var response = await axios.get(`${host}cgi-bin/mmwebwx-bin/synccheck`, {
                cancelToken: new CancelToken(exe => {
                    // An executor function receives a cancel function as a parameter
                    this.cancelCheck = exe;
                }),
                params: {
                    r: +new Date(),
                    sid: auth.wxsid,
                    uin: auth.wxuin,
                    skey: auth.skey,
                    synckey: self.syncKey,
                }
            }).catch(ex => {
                if (axios.isCancel(ex)) {
                    loop();
                } else {
                    self.logout();
                }
            });

            if (!response) {
                // Request has been canceled
                return;
            }

            eval(response.data);

            if (+window.synccheck.retcode === 0) {
                // 2, Has new message
                // 6, New friend
                // 4, Conversation refresh ?
                // 7, Exit or enter
                let selector = +window.synccheck.selector;

                if (selector !== 0) {
                    await self.getNewMessage();
                }

                // Do next sync keep your wechat alive
                return loop();
            } else {
                self.logout();
            }
        };

        response.data.AddMsgList.map(async e => {
            await chat.loadChats(e.StatusNotifyUserName);
        });

        self.loading = false;
        self.genSyncKey(response.data.SyncCheckKey.List);

        return loop();
    }

    @action async hasLogin() {
        // var auth = await storage.get('auth');
        return self.userIdentity;
        // axios.defaults.baseURL = auth.baseURL;
        //
        // self.auth = auth && Object.keys(auth).length ? auth : void 0;
        //
        // if (self.auth) {
        //     await self.initUser().catch(ex => self.logout());
        //     self.keepalive().catch(ex => self.logout());
        // }
        //
        // return auth;
    }

    /**
     * 退出登录
     * @returns {Promise<void>}
     */
    @action async logout() {
        var auth = self.auth;

        try {
            await axios.post(`/cgi-bin/mmwebwx-bin/webwxlogout?skey=${auth.skey}&redirect=0&type=1`, {
                sid: auth.sid,
                uin: auth.uid,
            });
        } finally {
            self.exit();
        }
    }

    async exit() {
        await storage.remove('auth');
        window.location.reload();
    }
}

const self = new Session();
export default self;
