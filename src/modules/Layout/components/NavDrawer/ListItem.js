import React, { Component } from 'react';
import { ListItem, ListDivider } from 'react-toolbox';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import cn from 'classnames';

import { expandToggle } from '../../redux/actions';
const styles = require('./styles/ListItem.scss');

export class CustomListItem extends Component {
  displayName: 'ListItem'
  props: {
    className: ?string,
    pathname: string,
    pushLocation: Function,
    expandToggle: Function,
    onClick?: Function,
    href?: string,
    expanded: bool,
    name: string,
    children: any
  }

  onClick = (e) => {
    const { pushLocation, href, onClick, children } = this.props;
    if (onClick) {
      onClick();
    } else if (href) {
      pushLocation(href);
    }

    // if list item has children, let's toggle expand
    if (children) {
      this.props.expandToggle();
      e.stopPropagation();
    }
  }

  render() {
    const { pathname, href, expanded, children, ...props } = this.props;
    const className = cn(this.props.className, {
      [styles.active]: (href === pathname) || expanded
    });
    const newProps = Object.assign({}, props);
    if (children) {
      newProps.rightIcon = expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_right';
    }

    return (
      <div>
        <ListItem
          { ...newProps }
          className={ className }
          onClick={ this.onClick }
        />
        { children && expanded ? <ListDivider /> : null }
        <div className={ styles.children }>
          { children && expanded ? children : null }
        </div>
        { children && expanded ? <ListDivider /> : null }
      </div>
    );
  }
}

const mapStatesToProps = ({ routing: { locationBeforeTransitions }, layout: { expandStatus } }, { name }) => ({
  pathname: locationBeforeTransitions && locationBeforeTransitions.pathname,
  expanded: expandStatus[name]
});

const mapDispatchToProps = (dispatch, { name }) => ({
  pushLocation: (href) => dispatch(push(href)),
  expandToggle: () => dispatch(expandToggle(name))
});

export default connect(mapStatesToProps, mapDispatchToProps)(CustomListItem);
