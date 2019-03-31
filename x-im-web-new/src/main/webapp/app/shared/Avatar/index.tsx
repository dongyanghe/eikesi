
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './avatar.scss';

export interface IAvatarProps {
    src: string;
    fallback?: string;
    className?: string;
    onClick?: (event: any) => void;
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
                onError={this.handleError}
                onLoad={this.handleLoad}
                src={this.props.src} />
        );
    }
}
