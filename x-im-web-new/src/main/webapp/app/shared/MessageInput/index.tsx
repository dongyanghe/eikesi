
import React, { Ref, Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.scss';
import Emoji from 'app/shared/MessageInput/Emoji';

export interface IProps {
    me?: any;
    sendMessage: Function;
    showMessage: Function;
    user: any[];
    confirmSendImage: Function;
    process: Function;
    className?: string;
  }
export interface IState {
    me: any;
    showEmoji: boolean;
  }
export default class MessageInput extends Component<IProps, IState> {
    inputRef;   //  : Ref<HTMLInputElement>
    uploaderRef;
    state: IState = {
        me: {},
        showEmoji: false
      };
      // Prevent duplicate message
      blocking = false;
    canisend() {
        const user: any = this.props.user;

        if (this.blocking) {
            return false;
        }

        if (user.length === 1
            && user.slice(-1).pop().UserName === this.props.me.UserName) {
            this.props.showMessage('无法发送这些消息.');
            return false;
        }

        return true;
    }

    async handleEnter(e) {
        const message = this.inputRef.value.trim();
        const user = this.props.user;
        const batch = user.length > 1;

        if (!this.canisend()
            || !message
            || e.charCode !== 13) return;

        this.blocking = true;

        // You can not send message to yourself
        await Promise.all(
            user.filter(value => value.UserName !== this.props.me.UserName).map(async value => {
                const res = await this.props.sendMessage(value, {
                    content: message,
                    type: 1
                }, true);

                this.inputRef.value = '';

                if (!res) {
                    await this.props.showMessage(batch ? `无法给 ${value.NickName} 发送消息!` : '消息发送失败');
                }

                return true;
            })
        );
        this.blocking = false;
    }

    toggleEmoji = (show = !this.state.showEmoji) => () => {
      if (!show) {
        setTimeout(() => this.setState({
          showEmoji: show
        }), 100);
        return;
      }
        this.setState({
            showEmoji: show
        });
    }

    writeEmoji(emoji) {
        const input = this.inputRef;
        input.value += `[${emoji}]`;
        input.focus();
    }

    async batchProcess(e) {
      e.target.value = '';
      const file = e.target.files[0];
        let message;
        const batch = this.props.user.length > 1;
        const receiver = this.props.user.filter(event => event.UserName !== this.props.me.UserName);
        const showMessage = this.props.showMessage;

        if (this.canisend() === false) {
            return;
        }

        for (const user of receiver) {
            if (message) {
                await this.props.sendMessage(user, message, true)
                    .catch(ex => showMessage(`Send message to ${user.NickName} is failed!`));
                continue;
            }

            // Do not repeat upload file, forward the message to another user
            message = await this.props.process(file, user);

            if (message === false) {
                if (batch) {
                    showMessage(`Send message to ${user.NickName} is failed!`);
                    continue;
                }
                // In batch mode just show the failed message
                showMessage('Failed to send image.');
            }
        }
    }
    //  消息黏贴处理
    async handlePaste(e) {
        window.console.log('消息黏贴未处理');
        // let args = ipcRenderer.sendSync('file-paste');

        // if (args.hasImage && this.canisend()) {
        //     e.preventDefault();

        //     if ((await this.props.confirmSendImage(args.filename)) === false) {
        //         return;
        //     }

        //     let parts = [
        //         new window.Blob([new window.Uint8Array(args.raw.data)], { type: 'image/png' })
        //     ];
        //     let file = new window.File(parts, args.filename, {
        //         lastModified: new Date(),
        //         type: 'image/png'
        //     });

        //     this.batchProcess(file);
        // }
    }

    render() {
        const canisend = !!this.props.user.length;

        return (
            <div className={classnames('container', this.props.className, {
                'shouldSelectUser': !canisend
            })}>
                <div
                    className={'tips'}>
                    你应该先选择一个联系人。
                </div>
                <input
                    id="messageInput"
                    onPaste={this.handlePaste}
                    onKeyPress={this.handleEnter}
                    placeholder="Type something to send..."
                    readOnly={!canisend}
                    ref={this.inputRef}
                    type="text" />

                <div className={'action'}>
                    {canisend && <i
                        className="icon-ion-android-attach"
                        id="showUploader"
                    onClick={this.uploaderRef.click()} /> }
                    {canisend && <i
                        className="icon-ion-ios-heart"
                        id="showEmoji"
                        onClick={this.toggleEmoji(true)}
                        style={{
                            color: 'red'
                        }} /> }

                    <input
                        onChange={this.batchProcess}
                        ref={this.uploaderRef}
                        style={{
                            display: 'none'
                        }}
                        type="file" />
                    <Emoji
                        close={this.toggleEmoji(false)}
                        output={this.writeEmoji}
                        show={this.state.showEmoji} />
                </div>
            </div>
        );
    }
}
