
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.scss';

export interface IProps {
    show: PropTypes.bool.isRequired;
  }
export interface IState {
    show: PropTypes.bool.isRequired;
  }
export default class Offline extends Component<IProps, IState> {
    state: IState = {
        show: false
      };

    render() {
        if (!this.props.show) return false;

        return (
            <div
                className={'container'}
                {...this.props}>
                <div>
                    <img
                        className="disabledDrag"
                        src="assets/images/offline.png" />

                    <h1>无法连接服务器!</h1>

                    <button onClick={e => window.location.reload()}>刷新</button>
                </div>
            </div>
        );
    }
}
