import React, { Component } from 'react';
//  import import PropTypes from 'prop-types'; from 'prop-types';
import TransitionPortal from 'app/shared/TransitionPortal';

import './style.scss';

export interface IProps {
  isShow: boolean;
  text: string;
  close: (event: any) => void;
}

/**
 * 顶部消息提示
 */
export default class Snackbar extends Component<IProps> {
  renderContent() {
    if (!this.props.isShow) {
      return false;
    }

    return (
      <div className="Snackbar">
        <div className="Snackbar-text" dangerouslySetInnerHTML={{ __html: this.props.text }} />
        <div className="Snackbar-action" onClick={this.props.close}>
          关闭
        </div>
      </div>
    );
  }

  render() {
    return <TransitionPortal>{this.renderContent()}</TransitionPortal>;
  }
}
