import React, { Component } from 'react';
//  import import PropTypes from 'prop-types'; from 'prop-types';

import './style.scss';

export interface IProps {
  show: boolean;
  style?: React.CSSProperties;
}
export interface IState {
  show: boolean;
}
export default class Offline extends Component<IProps, IState> {
  state: IState = {
    show: false
  };
  reload = () => {
    window.location.reload();
  };
  render() {
    if (!this.props.show) return false;

    return (
      <div className={'container'} {...this.props}>
        <div>
          <img className="disabledDrag" src="assets/images/offline.png" />

          <h1>无法连接服务器!</h1>

          <button onClick={this.reload}>刷新</button>
        </div>
      </div>
    );
  }
}
