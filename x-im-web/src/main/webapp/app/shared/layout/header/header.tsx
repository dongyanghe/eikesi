import './header.scss';

import React from 'react';
export interface IHeaderProps {
  location: Location;
}

export default class Header extends React.Component<IHeaderProps> {

  getTitle() {
    switch (this.props.location.pathname) {
        case '/contacts':
            return '联系人';

        case '/settings':
            return '设置';

        default:
            return 'X-在线通讯';
    }
}

  render() {

    return (
      <header className={'container'}>
        <h1>{this.getTitle()}</h1>
    </header>
    );
  }
}
