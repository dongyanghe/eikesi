
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.scss';
import TransitionPortal from 'app/shared/TransitionPortal';
export interface IProps {
    selected: any;
    show: PropTypes.bool.isRequired;
    list: PropTypes.array.isRequired;
  }
export default class Suggestion extends Component<IProps> {

    renderContent() {
        const { show, list, selected } = this.props;

        if (!show) {
            return false;
        }

        console.log(window.event);

        return (
            <div className="Suggestion">
                {
                    list.map((e, index) => {
                        return (
                            <div
                                key={index}
                                className={classnames('Suggestion-item', {
                                    'Suggestion--selected': e.UserName === selected
                                })}>
                                <img src={e.HeadImgUrl} />
                                <div className="Suggestion-user">
                                    <p className="Suggestion-username" dangerouslySetInnerHTML={{__html: e.RemarkName || e.NickName}} />
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    render() {
        return (
            <TransitionPortal transitionEnterTimeout={0} transitionLeaveTimeout={150} transitionName="Suggestion">
                {
                    this.renderContent()
                }
            </TransitionPortal>
        );
    }
}
