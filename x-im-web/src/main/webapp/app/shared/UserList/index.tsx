import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.csss';

export interface IProps {
  max: PropTypes.number.isRequired;
  searching: PropTypes.string.isRequired;
  search: PropTypes.func.isRequired;
  getList: PropTypes.func.isRequired;
  onChange: PropTypes.func.isRequired;
}
export interface IState {
  selected: any[];
  active: string;
}
export default class UserList extends Component<IProps, IState> {
  timer: any;
  listRef: any;
  inputRef: any;
  props = {
    max: 20,
    ...this.props
  };
  state = {
    selected: [],
    active: ''
  };

  highlight(offset) {
    let scroller = this.listRef;
    let users = Array.from(this.listRef.querySelectorAll('li[data-userid]'));
    let index = users.findIndex(e => e.classList.contains('active'));

    if (index > -1) {
      users[index].classList.remove('active');
    }

    index += offset;

    if (index < 0) {
      // Fallback to the last element
      index = users.length - 1;
    } else if (index > users.length - 1) {
      // Fallback to the 1th element
      index = 0;
    }

    let active = users[index];

    if (active) {
      // Keep active item always in the viewport
      active.classList.add('active');
      scroller.scrollTop = active.offsetTop + active.offsetHeight - scroller.offsetHeight;
    }
  }

  navigation(e) {
    const keyCode = e.keyCode;
    const offset = {
      // Up
      '38': -1,
      '40': 1
    }[keyCode];

    if (offset) {
      this.highlight(offset);
    }

    if (keyCode !== 13) {
      return;
    }

    const active = this.listRef.querySelector(`.active`);

    if (active) {
      const userid = active.dataset.userid;

      if (!this.state.selected.includes(userid)) {
        // Add
        this.addSelected(userid, userid);
      } else {
        // Remove
        this.removeSelected(userid, userid);
      }
      setTimeout(() => this.props.onChange(this.state.selected));
    }
  }

  search(text) {
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.props.search(text);
    }, 300);
  }

  addSelected(userid, active = this.state.active) {
    let selected = [userid, ...this.state.selected];
    const max = this.props.max;

    if (max > 0) {
      selected = selected.slice(0, this.props.max);
    }

    this.setState({
      active,
      selected
    });
    setTimeout(() => this.props.onChange(this.state.selected));
  }

  removeSelected(userid, active = this.state.active) {
    const selected = this.state.selected;
    const index = selected.indexOf(userid);

    this.setState({
      active,
      selected: [...selected.slice(0, index), ...selected.slice(index + 1, selected.length)]
    });
    setTimeout(() => this.props.onChange(this.state.selected));
  }

  toggleSelected(userid) {
    if (!this.state.selected.includes(userid)) {
      // Add
      this.addSelected(userid);
    } else {
      // Remove
      this.removeSelected(userid);
    }

    setTimeout(() => this.inputRef.focus());
  }

  renderList() {
    const { searching, getList } = this.props;
    const list = getList();

    if (searching && list.length === 0) {
      return (
        <li className={'notfound'}>
          <img src="assets/images/crash.png" />
          <h3>找不到好友 '{searching}'</h3>
        </li>
      );
    }

    return list.map((e, index) => (
      <li
        className={classnames({
          selected: this.state.selected.includes(e.UserName),
          active: this.state.active === e.UserName
        })}
        data-userid={e.UserName}
        key={index}
        onClick={ev => this.toggleSelected(e.UserName)}
      >
        <img className={'avatar'} src={e.HeadImgUrl} />
        <span className={'username'} dangerouslySetInnerHTML={{ __html: e.RemarkName || e.NickName }} />

        <i className="icon-ion-android-done-all" />
      </li>
    ));
  }

  render() {
    return (
      <div className={'container'}>
        <input
          ref={this.inputRef}
          autoFocus={true}
          onKeyUp={e => this.navigation(e)}
          onInput={e => this.search(this.inputRef.value)}
          placeholder="Type to Search..."
          type="text"
        />

        <ul className={'list'} ref={this.listRef}>
          {this.renderList()}
        </ul>
      </div>
    );
  }
}
