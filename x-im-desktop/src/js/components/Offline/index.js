
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './style.css';

export default class Avatar extends Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        show: false,
    };

    render() {
        if (!this.props.show) return false;

        return (
            <div
                className={classes.container}
                {...this.props}>
                <div>
                    <img
                        className="disabledDrag"
                        src="assets/images/offline.png" />

                    <h1>哦，您好像是离线的！</h1>

                    <button onClick={e => window.location.reload()}>刷新</button>
                </div>
            </div>
        );
    }
}
