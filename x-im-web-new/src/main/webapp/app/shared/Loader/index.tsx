import React, { Component } from 'react';
//  import import PropTypes from 'prop-types'; from 'prop-types';
import Transition from 'react-addons-css-transition-group';
import classNames from 'classnames/bind';

import './loader.scss';

export interface ILoaderProps {
  show: boolean;
  fullscreen?: boolean;
  className?: string;
}

export default class Button extends React.Component<ILoaderProps> {
  renderContent() {
    if (!this.props.show) {
      return;
    }

    return (
      <div
        className={classNames('Loader', this.props.className, {
          'Loader--fullscreen': this.props.fullscreen
        })}
      >
        <svg className="Loader-circular">
          <circle className="Loader-path" cx="50" cy="50" fill="none" r="20" strokeWidth="5" strokeMiterlimit="10" />
        </svg>
      </div>
    );
  }

  render() {
    return (
      <Transition transitionName="Loader" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
        {this.renderContent()}
      </Transition>
    );
  }
}
