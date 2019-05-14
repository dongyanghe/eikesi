
import React, { Component } from 'react';

import blacklist from 'app/shared/util/blacklist';
import './style.scss';

export default class Switch extends Component {
    render() {
        return (
            <span className="Switch">
                <input
                    {...blacklist(this.props, 'className', 'children')}
                    type="checkbox" />
                <span className="Switch--fake" />
            </span>
        );
    }
}
