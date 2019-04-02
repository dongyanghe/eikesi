import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//  import import PropTypes from 'prop-types'; from 'prop-types';
// import Transition from 'react-addons-css-transition-group';

export interface IProps {
  transitionName?: string;
  transitionEnterTimeout?: number;
  transitionLeaveTimeout?: number;
}
export default class TransitionPortal extends Component<IProps> {
  ele;
  componentDidMount() {
    this.ele = document.createElement('div');
    document.body.appendChild(this.ele);
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    window.console.log('什么龟');
    // ReactDOM.render(<Transition {...this.props}>{this.props.children}</Transition>, this.ele);
  }

  componentWillUnmount() {
    document.body.removeChild(this.ele);
  }

  render() {
    return null;
  }
}
