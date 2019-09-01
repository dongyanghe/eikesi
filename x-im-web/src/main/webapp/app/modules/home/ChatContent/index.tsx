
import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import { deleteMessage, reset, toggleConversation, recallMessage, empty, chatTo, markedRead, sticky, removeChat } from 'app/shared/reducers/chat';
import { forwardToogle, addFriendToogle, userInfoToogle, memberToogle } from 'app/shared/reducers/app';
import classnames from 'classnames';
import moment from 'moment';

import './style.scss';
import helper from 'app/shared/util/helper';
import axios from 'axios';
import Avatar from 'app/shared/Avatar';
import { parser as emojiParse } from 'app/shared/util/emoji';
import { on, off } from 'app/shared/util/event';

const mapStateToProps = ({ settings, customerRelation, authentication, currentMessage, chat, app }: IRootState) => ({
    user: chat.user,
    messages: chat.messagesMap,
    loading: currentMessage.loading,
    downloads: settings.downloads,
    remeberConversation: settings.remeberConversation,
    showConversation: chat.showConversation,
    account: authentication.account,
    chatUser: authentication.account,
    memberList: customerRelation.entities
});

const mapDispatchToProps = {
    chatTo,
    markedRead,
    sticky,
    removeChat,
    empty,
    recallMessage,
    toggleConversation,
    reset,
    addFriendToogle,
    userInfoToogle,
    memberToogle,
    forwardToogle,
    deleteMessage
};
export interface IProps extends StateProps, DispatchProps { }
export class ChatContent extends React.Component<IProps> {
    viewportRef;
    tipRef;
    scrollTop;
    isFriend = (id: string) => true;
    showUserinfo = async (isme, user) => {
        const caniremove = helper.isChatRoomOwner(this.props.chatUser);

        if (isme) {
            user = this.props.account;
        } else {
            this.props.memberList.find(e => {
                // Try to find contact in your contacts
                if (e.id === user.id) {
                    user = e;
                    return user;
                }
            });
        }

        userInfoToogle(true, user, caniremove);
    };
    getMessage = (messageid: any) => {
        const list = this.props.messages.get(this.props.chatUser.UserName);
        return list.data.find(e => e.MsgId === messageid);
    };
    deleteMessage = (messageid: any) => {
        this.props.deleteMessage(this.props.chatUser.UserName, messageid);
    };
    showMembers = (user: any) => {
        if (helper.isChatRoom(user.UserName)) {
            this.props.memberToogle(true, user);
        }
    };
    showContact = (userid: any) => {
        const user = this.props.memberList.find(e => e.id === userid);
        this.props.userInfoToogle(true, user);
    };
    parseMessage = (message: any, from) => {
        const isChatRoom = message.isme ? false : helper.isChatRoom(message.FromUserName);
        let user = from;

        message = { ...message };  //  Object.assign({}, message);

        if (isChatRoom) {
            const matchs = message.Content.split(':<br/>');

            // Get the newest chat room infomation
            from = this.props.memberList.find(e => from.id === e.id);
            user = from.MemberList.find(e => e.UserName === matchs[0]);
            message.Content = matchs[1];
        }

        // If user is null, that mean user has been removed from this chat room
        return { message, user };
    };

    getMessageContent(message) {
        const uploading = message.uploading;

        switch (message.MsgType) {
            case 1:
                if (message.location) {
                    return `
                        <img class="open-map unload" data-map="${message.location.href}" src="${message.location.image}" />
                        <label>${message.location.label}</label>
                    `;
                }
                // Text message
                return emojiParse(message.Content);
            case 3:
                // Image
                const image = message.image;

                if (uploading) {
                    return `
                        <div>
                            <img class="open-image unload" data-id="${message.MsgId}" src="${image.src}" data-fallback="${image.fallback}" />
                            <i class="icon-ion-android-arrow-up"></i>
                        </div>
                    `;
                }
                return `<img class="open-image unload" data-id="${message.MsgId}" src="${image.src}" data-fallback="${image.fallback}" />`;
            case 34:
                /* eslint-disable */
                // Voice
                const voice = message.voice;
                const times = message.VoiceLength;
                const width = 40 + 7 * (times / 2000);
                let seconds = 0;
                /* eslint-enable */

                if (times < 60 * 1000) {
                    seconds = Math.ceil(times / 1000);
                }

                return `
                    <div class="play-voice" style="width: ${width}px" data-voice="${voice.src}">
                        <i class="icon-ion-android-volume-up"></i>
                        <span>
                            ${seconds || '60+'}"
                        </span>

                        <audio controls="controls">
                            <source src="${voice.src}" />
                        </audio>
                    </div>
                `;
            case 47:
            case 49 + 8:
                // External emoji
                const emoji = message.emoji;

                if (emoji) {
                    if (uploading) {
                        return `
                            <div>
                                <img class="unload disabledDrag" src="${emoji.src}" data-fallback="${emoji.fallback}" />
                                <i class="icon-ion-android-arrow-up"></i>
                            </div>
                        `;
                    }
                    return `<img src="${emoji.src}" class="unload disabledDrag" data-fallback="${emoji.fallback}" />`;
                }
                return `
                    <div class="${'invalidEmoji'}">
                        <div></div>
                        <span>Send an emoji, view it on mobile</span>
                    </div>
                `;

            case 42:
                // Contact Card
                const contact = message.contact;
                const isFriend = this.isFriend(contact.UserName);
                let html = `
                    <div class="${classnames('contact', { 'is-friend': isFriend })}" data-userid="${contact.UserName}">
                        <img src="${contact.image}" class="unload disabledDrag" />

                        <div>
                            <p>${contact.name}</p>
                            <p>${contact.address}</p>
                        </div>
                `;

                if (!isFriend) {
                    html += `
                        <i class="icon-ion-android-add" data-userid="${contact.UserName}"></i>
                    `;
                }

                html += '</div>';

                return html;

            case 43:
                // Video message
                const video = message.video;

                if (uploading) {
                    return `
                        <div>
                            <video preload="metadata" controls src="${video.src}"></video>

                            <i class="icon-ion-android-arrow-up"></i>
                        </div>
                    `;
                }

                if (!video) {
                    console.error('Invalid video message: %o', message);

                    return `
                        Receive an invalid video message, please see the console output.
                    `;
                }

                return `
                    <video preload="metadata" poster="${video.cover}" controls src="${video.src}" />
                `;

            case 49 + 2000:
                // Money transfer
                const transfer = message.transfer;

                return `
                    <div class="${'transfer'}">
                        <h4>Money Transfer</h4>
                        <span>💰 ${transfer.money}</span>
                        <p>如需收钱，请打开手机微信确认收款。</p>
                    </div>
                `;

            case 49 + 6:
                // File message
                const file = message.file;
                const download = message.download;

                /* eslint-disable */
                return `
                    <div class="${'file'}" data-id="${message.MsgId}">
                        <img src="assets/images/filetypes/${helper.getFiletypeIcon(file.extension)}" class="disabledDrag" />

                        <div>
                            <p>${file.name}</p>
                            <p>${helper.humanSize(file.size)}</p>
                        </div>

                        ${
                            uploading
                                ? '<i class="icon-ion-android-arrow-up"></i>'
                                : (download.done ? '<i class="icon-ion-android-more-horizontal is-file"></i>' : '<i class="icon-ion-android-arrow-down is-download"></i>')
                        }
                    </div>
                `;
                /* eslint-enable */

            case 49 + 17:
                // Location sharing...
                return `
                    <div class="${'locationSharing'}">
                        <i class="icon-ion-ios-location"></i>
                        Location sharing, Please check your phone.
                    </div>
                `;
                break;
            default:
                console.error('ChatContent getMessageContent switch unrealized：', message.MsgType);
        }
    }

    renderMessages(list, from) {
        return list.data.map((e, index) => {
            const { message, user } = this.parseMessage(e, from);
            const type = message.MsgType;

            if ([
                // WeChat system message
                10000,
                // Custome message
                19999
            ].includes(type)) {
                return (
                    <div
                        key={index}
                        className={classnames('unread', 'message', 'system')}
                        dangerouslySetInnerHTML={{ __html: e.Content }} />
                );
            }

            if (!user) {
                return false;
            }

            return (
                <div className={classnames('unread', 'message', {
                    // File is uploading
                    ['uploading']: message.uploading === true,

                    ['isme']: message.isme,
                    ['isText']: type === 1 && !message.location,
                    ['isLocation']: type === 1 && message.location,
                    ['isImage']: type === 3,
                    ['isEmoji']: type === 47 || type === 49 + 8,
                    ['isVoice']: type === 34,
                    ['isContact']: type === 42,
                    ['isVideo']: type === 43,

                    // App messages
                    ['appMessage']: [49 + 2000, 49 + 17, 49 + 6].includes(type),
                    ['isTransfer']: type === 49 + 2000,
                    ['isLocationSharing']: type === 49 + 17,
                    ['isFile']: type === 49 + 6
                })} key={index}>
                    <div>
                        <Avatar
                            src={message.isme ? message.HeadImgUrl : user.HeadImgUrl}
                            className={'avatar'}
                            onClick={ev => this.showUserinfo(message.isme, user)} />

                        <p className={'username'} dangerouslySetInnerHTML={{ __html: user.NickName }} />

                        <div className={'content'}>
                            <p
                                onContextMenu={() => this.showMessageAction(message)}
                                dangerouslySetInnerHTML={{ __html: this.getMessageContent(message) }} />

                            <span className={'times'}>{ moment(message.CreateTime * 1000).fromNow() }</span>
                        </div>
                    </div>
                </div>
            );
        });
    }

    async handleClick(e) {
        const target = e.target;

        // Open the image
        if (target.tagName === 'IMG'
            && target.classList.contains('open-image')) {
            // Get image from cache and convert to base64
            const response = await axios.get(target.src, { responseType: 'arraybuffer' });
            // const base64 = new window.Buffer(response.data, 'binary').toString('base64');

            // ipcRenderer.send('open-image', {
            //     dataset: target.dataset,
            //     base64,
            // });

            return;
        }

        // Play the voice message
        if (target.tagName === 'DIV'
            && target.classList.contains('play-voice')) {
            const audio = target.querySelector('audio');

            audio.onplay = () => target.classList.add('playing');
            audio.onended = () => target.classList.remove('playing');
            audio.play();

            return;
        }

        // Open the location
        if (target.tagName === 'IMG'
            && target.classList.contains('open-map')) {
            // ipcRenderer.send('open-map', {
            //     map: target.dataset.map,
            // });
        }

        // Show contact card
        if (target.tagName === 'DIV'
            && target.classList.contains('is-friend')) {
            this.showContact(target.dataset.userid);
        }

        // Add new friend
        if (target.tagName === 'I'
            && target.classList.contains('icon-ion-android-add')) {
            this.props.addFriendToogle(true, {
                UserName: target.dataset.userid
            });
        }

        // Add new friend
        if (target.tagName === 'A'
            && target.classList.contains('add-friend')) {
            this.props.addFriendToogle(true, {
                UserName: target.dataset.userid
            });
        }

        // Open file & open folder
        if (target.tagName === 'I'
            && target.classList.contains('is-file')) {
            const message = this.getMessage(e.target.parentElement.dataset.id);
            this.showFileAction(message.download);
        }

        // Download file
        if (target.tagName === 'I'
            && target.classList.contains('is-download')) {
            const message = this.getMessage(e.target.parentElement.dataset.id);
            const response = await axios.get(message.file.download, { responseType: 'arraybuffer' });
            // const base64 = new window.Buffer(response.data, 'binary').toString('base64');
            // const filename = ipcRenderer.sendSync(
            //     'file-download',
            //     {
            //         filename: `${this.props.downloads}/${message.MsgId}_${message.file.name}`,
            //         raw: base64,
            //     }
            // );

            setTimeout(() => {
                message.download = {
                    done: true,
                    path:  `${this.props.downloads}/${message.MsgId}_${message.file.name}`
                };
            });
        }
    }

    showFileAction(download) {
        const templates = [
            {
                label: 'Open file',
                click: () => {
                    // ipcRenderer.send('open-file', download.path);
                }
            },
            {
                label: 'Open the folder',
                click: () => {
                    const dir = download.path.split('/').slice(0, -1).join('/');
                    // ipcRenderer.send('open-folder', dir);
                }
            }
        ];
        const menu = templates;

        // menu.popup(remote.getCurrentWindow());
    }

    showMessageAction(message) {
        const caniforward = [1, 3, 47, 43, 49 + 6].includes(message.MsgType);
        const templates = [
            {
                label: 'Delete',
                click: () => {
                    this.deleteMessage(message.MsgId);
                }
            }
        ];
        let menu;

        if (caniforward) {
            templates.unshift({
                label: 'Forward',
                click: () => {
                    this.props.forwardToogle(true, message);
                }
            });
        }

        if (message.isme
            && (message.CreateTime.getTime() - new Date().getTime()) < 2 * 60 * 1000) {
            templates.unshift({
                label: 'Recall',
                click: () => {
                    this.props.recallMessage(message);
                }
            });
        }

        if (message.uploading) return;

        menu = templates;
        // menu.popup(remote.getCurrentWindow());
    }

    showMenu() {
        const user = this.props.user;
        const menu = [
            {
                label: 'Toggle the conversation',
                click: () => {
                    this.props.toggleConversation();
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Empty Content',
                click: () => {
                    this.props.empty(user, this.props.messages);
                }
            },
            {
                type: 'separator'
            },
            {
                label: helper.isTop(user) ? 'Unsticky' : 'Sticky on Top',
                click: () => {
                    this.props.sticky(user);
                }
            },
            {
                label: 'Delete',
                click: () => {
                    this.props.removeChat(user);
                }
            }
        ];

        // menu.popup(remote.getCurrentWindow());
    }

    handleScroll(e) {
        const tips = this.refs.tips;
        const viewport = e.target;
        const unread = viewport.querySelectorAll(`.${'message'}.unread`);
        const rect = viewport.getBoundingClientRect();
        const counter = 0;

        // Array.from(unread).map(ele => {
        //     if (ele.getBoundingClientRect().top > rect.bottom) {
        //         counter += 1;
        //     } else {
        //         ele.classList.remove('unread');
        //     }
        // });

        // if (counter) {
        //     tips.innerHTML = `You has ${counter} unread messages.`;
        //     tips.classList.add('show');
        // } else {
        //     tips.classList.remove('show');
        // }
    }

    scrollBottomWhenSentMessage() {
        const { user, messages } = this.props;
        const list = messages.get(user.id);

        return list.slice(-1).isme;
    }

    componentWillUnmount() {
        !this.props.remeberConversation && this.props.reset();
    }

    componentDidUpdate() {
        const viewport = this.viewportRef;
        const tips = this.tipRef;

        if (viewport) {
            const newestMessage = this.props.messages.get(this.props.user.UserName).data.slice(-1)[0];
            const images: Element[] = viewport.querySelectorAll('img.unload');

            // Scroll to bottom when you sent message
            if (newestMessage
                    && newestMessage.isme) {
                viewport.scrollTop = viewport.scrollHeight;
                return;
            }

            // Show the unread messages count
            if (viewport.scrollTop < this.scrollTop) {
                const counter = viewport.querySelectorAll(`.${'message'}.unread`).length;

                if (counter) {
                    tips.innerHTML = `You has ${counter} unread messages.`;
                    tips.classList.add('show');
                }
                return;
            }

            // Auto scroll to bottom when message has been loaded
            Array.from(images).map(e => {
                on(e, 'load', ev => {
                    off(e, 'load');
                    e.classList.remove('unload');
                    viewport.scrollTop = viewport.scrollHeight;
                    this.scrollTop = viewport.scrollTop;
                });

                on(e, 'error', ev => {
                    let fallback = ev.target.dataset.fallback;

                    if (fallback === 'undefined') {
                        fallback = 'assets/images/broken.png';
                    }

                    ev.target.src = fallback;
                    ev.target.removeAttribute('data-fallback');

                    off(e, 'error');
                });
            });

            // Hide the unread message count
            tips.classList.remove('show');
            viewport.scrollTop = viewport.scrollHeight;
            this.scrollTop = viewport.scrollTop;

            // Mark message has been loaded
            const messageEleList: Element[] = viewport.querySelectorAll(`.${'message'}.unread`);
            Array.from(messageEleList).map(e => e.classList.remove('unread'));
        }
    }

    componentWillReceiveProps(nextProps) {
        // When the chat user has been changed, show the last message in viewport
        if (this.props.user && nextProps.user
            && this.props.user.UserName !== nextProps.user.UserName) {
            this.scrollTop = -1;
        }
    }

    render() {
        const { loading, showConversation, user, messages } = this.props;
        const title = user.RemarkName || user.NickName;
        const signature = user.Signature;

        if (loading) return false;

        return (
            <div
                className={classnames('container', {
                    ['hideConversation']: !showConversation
                })}
                onClick={e => this.handleClick(e)}>
                {
                    user ? (
                        <div>
                            <header>
                                <div className={'info'}>
                                    <p
                                        dangerouslySetInnerHTML={{ __html: title }}
                                        title={title} />

                                    <span
                                        className={'signature'}
                                        dangerouslySetInnerHTML={{ __html: signature || 'No Signature' }}
                                        onClick={e => this.showMembers(user)}
                                        title={signature} />
                                </div>

                                <i
                                    className="icon-ion-android-more-vertical"
                                    onClick={() => this.showMenu()} />
                            </header>

                            <div
                                className={'messages'}
                                onScroll={e => this.handleScroll(e)}
                                ref={this.viewportRef}>
                                {
                                    this.renderMessages(messages.get(user.UserName), user)
                                }
                            </div>
                        </div>
                    ) : (
                        <div className={classnames({
                            ['noselected']: !user
                        })}>
                            <img
                                className="disabledDrag"
                                src="assets/images/noselected.png" />
                            <h1>没有选择聊天对象</h1>
                        </div>
                    )
                }

                <div
                    className={'tips'}
                    ref={this.tipRef}>
                    未读消息
                </div>
            </div>
        );
    }
}

//  用于把当前 Redux store state 映射到展示组件的 props 中
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
/**
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatContent);
