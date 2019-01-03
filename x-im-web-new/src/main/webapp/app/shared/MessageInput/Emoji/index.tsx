
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import delegate from 'delegate';

import './style.scss';
import { emoji } from 'app/shared/util/emoji';

export interface IProps {
    output: PropTypes.func.isRequired;
    show: PropTypes.bool.isRequired;
    close: PropTypes.func.isRequired;
  }
  export interface IState {
    me: PropTypes.object;
    showEmoji: boolean;
  }
export default class Emoji extends Component<IProps, IState> {
    containerRef;
    componentDidMount() {
        delegate(this.containerRef, 'a.qqemoji', 'click', e => {
            e.preventDefault();
            e.stopPropagation();

            this.props.output(e.target.title);
            this.props.close();
        });
    }

    componentDidUpdate() {
        if (this.props.show) {
            this.containerRef.focus();
        }
    }

    renderEmoji(emojiParam) {
        return emojiParam.map((e, index) => {
            const { key, className } = e;
            return (
                <a
                    className={className}
                    key={index}
                    title={key} />
            );
        });
    }

    render() {
        return (
            <div
                ref={this.containerRef}
                tabIndex={-1}
                className={classnames('container', {
                    'show': this.props.show
                })}
                onBlur={e => this.props.close()}>
                <div className="row">
                    {this.renderEmoji(emoji.slice(0, 15))}
                </div>

                <div className="row">
                    {this.renderEmoji(emoji.slice(15, 30))}
                </div>

                <div className="row">
                    {this.renderEmoji(emoji.slice(30, 45))}
                </div>

                <div className="row">
                    {this.renderEmoji(emoji.slice(45, 60))}
                </div>

                <div className="row">
                    {this.renderEmoji(emoji.slice(60, 75))}
                </div>

                <div className="row">
                    {this.renderEmoji(emoji.slice(75, 90))}
                </div>

                <div className="row">
                    {this.renderEmoji(emoji.slice(90, 105))}
                </div>
            </div>
        );
    }
}
