
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-addons-css-transition-group';
import classnames from 'classnames';

import './style.scss';
import TransitionPortal from 'app/shared/TransitionPortal';
import { on, off } from 'app/shared/util/event';

export interface IModalBodyProps {
    className?: PropTypes.string;
    style?: PropTypes.CSSProperties;
}
class ModalBody extends Component<IModalBodyProps> {
    render() {
        return (
            <Transition
                transitionName="fade"
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}>
                <div
                    className={classnames('Modal-body', this.props.className)}
                    style={this.props.style}>
                    {this.props.children}
                </div>
            </Transition>
        );
    }
}

export interface IModalHeaderProps {
    className?: PropTypes.string;
    style?: PropTypes.CSSProperties;
}
class ModalHeader extends Component<IModalHeaderProps> {
    render() {
        return (
            <div className={classnames('Modal-header', this.props.className)}>
                {this.props.children}
            </div>
        );
    }
}

export interface IModalFooterProps {
    className?: PropTypes.string;
    style?: PropTypes.CSSProperties;
}
class ModalFooter extends Component<IModalFooterProps> {
    render() {
        return (
            <div className={classnames('Modal-footer', this.props.className)}>
                {this.props.children}
            </div>
        );
    }
}

export interface IModalProps {
    show: PropTypes.bool.isRequired;
    overlay: PropTypes.bool;
    onCancel: PropTypes.func;
    transition4overlay: PropTypes.string;
    transition4body: PropTypes.string;
    className?: PropTypes.string;
}
export interface IModalState {
    overlay: true;
    transition4overlay: 'Modal-overlay';
    transition4body: 'Modal-body';
    onCancel: Function;
}
class Modal extends Component<IModalProps, IModalState> {
    static defaultProps = {
        overlay: true,
        transition4overlay: 'Modal-overlay',
        transition4body: 'Modal-body',
        onCancel: Function
    };

    renderOverlay() {
        if (!this.props.show || !this.props.overlay) {
            return;
        }

        return (
            <div
                className={classnames('Modal-overlay', this.props.className)}
                onClick={this.props.onCancel} />
        );
    }

    renderBody() {
        if (!this.props.show) {
            return;
        }

        return (
            <div className={classnames('Modal-content', this.props.className)}>
                {this.props.children}
            </div>
        );
    }

    handleEscKey(e) {
        if (e.keyCode === 27 && this.props.show) {
            this.props.onCancel();
        }
    }

    componentWillUnmount() {
        off(document, 'keydown', this.handleEscKey);
    }

    componentDidMount() {
        this.handleEscKey = this.handleEscKey.bind(this);
        on(document, 'keydown', this.handleEscKey);
    }

    render() {
        if (!/MSIE\s8\.0/.test(window.navigator.userAgent)) {
            document.body.style.overflow = this.props.show ? 'hidden' : null;
        }

        return (
            <div className="Modal" ref="node">
                <Transition
                    transitionName={this.props.transition4overlay}
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}
                    ref="overlay">
                    {this.renderOverlay()}
                </Transition>

                <TransitionPortal
                    transitionName={this.props.transition4body}
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={140}
                    ref="content">
                    {this.renderBody()}
                </TransitionPortal>
            </div>
        );
    }
};

export { Modal, ModalBody, ModalHeader, ModalFooter };
