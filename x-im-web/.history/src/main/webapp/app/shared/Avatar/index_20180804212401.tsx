
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.global.css';

export interface IAvatarProps {
    src: string;
    fallback: string;
    className: string;
    onClick: Function;
}
  export interface IAvatarState {
    fallback: string;
}
export default class Avatar extends React.Component<IAvatarProps, IAvatarState> {
    state: IAvatarState = {
        fallback: 'assets/images/user-fallback.png'
    };

    handleError(e) {
        e.target.src = this.props.fallback || this.state.fallback;
    }

    handleLoad(e) {
        e.target.classList.remove('fadein');
    }

    render() {
        if (!this.props.src) return false;

        return (
            <img
                className={`Avatar fade fadein ${this.props.className}`}
                onClick={this.props.onClick}
                onError={e => this.handleError(e)}
                onLoad={e => this.handleLoad(e)}
                src={this.props.src} />
        );
    }
}
