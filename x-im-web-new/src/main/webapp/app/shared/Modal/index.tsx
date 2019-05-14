import React, { Component } from 'react';
//  import import PropTypes from 'prop-types'; from 'prop-types';
// import Transition from 'react-addons-css-transition-group';
import classNames from 'classnames/bind';

import './style.scss';
import TransitionPortal from 'app/shared/TransitionPortal';
import { on, off } from 'app/shared/util/event';

export interface IModalBodyProps {
  className?: string;
  style?: any;
}
class ModalBody extends Component<IModalBodyProps> {
  render() {
    return (
      // transitionName="fade"
      // transitionEnterTimeout={1000}
      // transitionLeaveTimeout={1000}
      <div>
        <div className={classNames('Modal-body', this.props.className)} style={this.props.style}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export interface IModalHeaderProps {
  className?: string;
  style?: any;
}
class ModalHeader extends Component<IModalHeaderProps> {
  render() {
    return <div className={classNames('Modal-header', this.props.className)}>{this.props.children}</div>;
  }
}

export interface IModalFooterProps {
  className?: string;
  style?: any;
}
class ModalFooter extends Component<IModalFooterProps> {
  render() {
    return <div className={classNames('Modal-footer', this.props.className)}>{this.props.children}</div>;
  }
}

export interface IModalProps {
  show: boolean;
  overlay?: boolean;
  fullscreen?: boolean;
  onCancel?: (event: any) => void;
  transition4overlay?: string;
  transition4body?: string;
  className?: string;
}

class Modal extends React.Component<IModalProps> {
  defaultProps = {
    overlay: true,
    transition4overlay: 'Modal-overlay',
    transition4body: 'Modal-body',
    onCancel: Function
  };

  renderOverlay() {
    if (!this.props.show || !this.props.overlay) {
      return;
    }

    return <div className={classNames('Modal-overlay', this.props.className)} onClick={this.props.onCancel} />;
  }

  renderBody() {
    if (!this.props.show) {
      return;
    }

    return <div className={classNames('Modal-content', this.props.className)}>{this.props.children}</div>;
  }

  handleEscKey(e) {
    if (e.keyCode === 27 && this.props.show) {
      this.props.onCancel(null);
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
      <div className="Modal">
        {/* <Transition
                    transitionName={this.props.transition4overlay}
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}
                    >
                    {this.renderOverlay()}
                </Transition> */}
        <div>{this.renderOverlay()}</div>
        <TransitionPortal transitionName={this.props.transition4body} transitionEnterTimeout={200} transitionLeaveTimeout={140}>
          {this.renderBody()}
        </TransitionPortal>
      </div>
    );
  }
}

export { Modal, ModalBody, ModalHeader, ModalFooter };
