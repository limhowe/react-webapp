import React, { Component } from 'react';
import { FontIcon } from 'react-toolbox';
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
    icon: string,
    caption: string,
    children: any
  }

  onClick = (e) => {
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
    const { pathname, href, expanded, children, icon, caption } = this.props;
    const className = cn(styles.listItemWrapper, {
      [styles.active]: (href === pathname) || expanded
    });
    return (
      <div className={ className }>
        <div className={ styles.listItem } onClick={ this.onClick }>
          <FontIcon value={ icon } className={  styles.icon } />
          <span className={ styles.text }>{ caption }</span>
        </div>

        <div className={ styles.children }>
          { children && expanded ? children : null }
        </div>
      </div>
    );
  }
}

const mapStatesToProps = ({ layout: { expandItem, pathname } }, { name }) => ({
  pathname,
  expanded: name && expandItem === name
});

const mapDispatchToProps = (dispatch, { name }) => ({
  pushLocation: (href) => dispatch(push(href)),
  expandToggle: () => dispatch(expandToggle(name))
});

export default connect(mapStatesToProps, mapDispatchToProps)(CustomListItem);
