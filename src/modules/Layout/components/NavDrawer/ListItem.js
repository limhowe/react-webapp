import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import cn from 'classnames';

import { expandToggle, showNotification } from '../../redux/actions';
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
    icon: string,
    caption: string,
    always: bool,
    collapsed: bool,
    currentApp: Object,
    children: any,
    showNotification: Function
  }

  onClick = (e) => {
    if (!this.props.currentApp && !this.props.always) {
      return this.props.showNotification('error', 'Plase create an application to access this page.');
    }

    const { pushLocation, href, onClick, icon } = this.props;
    if (onClick) {
      onClick();
    } else if (href) {
      pushLocation(href);
    }

    // if list item has children, let's toggle expand
    if (icon) {
      this.props.expandToggle();
      e.stopPropagation();
    }
  }

  render() {
    const { pathname, href, expanded, children, icon, caption, collapsed } = this.props;
    const className = cn(styles.listItemWrapper, {
      [styles.active]: (pathname.indexOf(href) > -1) || expanded,
      [styles.collapsed]: collapsed
    });
    const iconClassName = cn(styles.icon, 'fa', `fa-${ icon }`);
    return (
      <div className={ className }>
        <div className={ styles.listItem } onClick={ this.onClick }>
          <i className={ iconClassName } />
          <span className={ styles.text }>{ caption }</span>
        </div>

        <div className={ styles.children }>
          { children && expanded ? children : null }
        </div>
      </div>
    );
  }
}

const mapStatesToProps = ({ layout: { expandItem, pathname, navDrawerActive }, application: { currentApp } }, { name }) => ({
  pathname,
  currentApp,
  collapsed: !navDrawerActive,
  expanded: name && expandItem === name
});

const mapDispatchToProps = (dispatch, { name }) => ({
  pushLocation: (href) => dispatch(push(href)),
  expandToggle: () => dispatch(expandToggle(name)),
  showNotification: (...args) => dispatch(showNotification(...args))
});

export default connect(mapStatesToProps, mapDispatchToProps)(CustomListItem);
