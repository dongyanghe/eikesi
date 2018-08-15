
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TransitionPortal from 'app/shared/TransitionPortal';

import './style.scss';

export interface IProps {
    isShow: PropTypes.bool.isRequired;
    text: PropTypes.string.isRequired;
    close: PropTypes.func.isRequired;
  }
export default class Snackbar extends Component<IProps> {

    renderContent() {
        if (!this.props.isShow) {
            return false;
        }

        return (
            <div className="Snackbar">
                <div
                    className="Snackbar-text"
                    dangerouslySetInnerHTML={{ __html: this.props.text }} />
                <div
                    className="Snackbar-action"
                    onClick={() => this.props.close()}>
                    关闭
                </div>
            </div>
        );
    }

    render() {
        return (
            <TransitionPortal>
                {this.renderContent()}
            </TransitionPortal>
        );
    }
}
