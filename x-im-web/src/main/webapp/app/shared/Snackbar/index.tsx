
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TransitionPortal from 'app/shared/TransitionPortal';

import './style.scss';

export interface IProps {
    show: PropTypes.bool.isRequired;
    text: PropTypes.string.isRequired;
    close: PropTypes.func.isRequired;
  }
export default class Snackbar extends Component<IProps> {

    renderContent() {
        if (!this.props.show) {
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
                    DONE
                </div>
            </div>
        );
    }

    render() {
        return (
            <TransitionPortal
                transitionEnterTimeout={0}
                transitionLeaveTimeout={150}
                transitionName="Snackbar">
                {this.renderContent()}
            </TransitionPortal>
        );
    }
}
