import './footer.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';
import Home from 'app/modules/home/';
import Settings from 'app/modules/settings/settings';
import Contacts from 'app/modules/contacts/contacts';
import classnames from 'classnames';

export interface IProps {
  location: Location;
}

export default class Footer extends React.Component<IProps> {

  return () {
    const pathname = this.props.location.pathname;
    const component = {
      '/': Home,
      '/contacts': Contacts,
      '/settings': Settings
    }[pathname];

    return (
      <footer className={'footer'}>
        <nav>
          <Link
            className="link"
            tabIndex={-1}
            to="/">
            <span className={classnames({
              ['active']: pathname === '/'
            })}>
              <i className="icon-ion-android-chat" />
            </span>
          </Link>

          <Link
            className="link"
            tabIndex={-1}
            to="/contacts">
            <span className={classnames({
              'active': pathname === '/contacts'
            })}>
              <i className="icon-ion-ios-book-outline" />
            </span>
          </Link>

          <Link
            className="link"
            tabIndex={-1}
            to="/settings">
            <span className={classnames({
              active: pathname === '/settings'
            })}>
              <i className="icon-ion-android-more-vertical" />
            </span>
          </Link>
        </nav>

        <div className={'right'}>
          {
            React.createElement(component)
          }
        </div>
      </footer>
    );
  }
}
