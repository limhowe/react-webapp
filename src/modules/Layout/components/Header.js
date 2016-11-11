// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar, Navigation, Link, Button } from 'react-toolbox';
import { translate } from 'react-i18next';

import { toggleNavDrawer } from '../redux/actions';

// https://github.com/webpack/webpack/issues/1788
// stupid webpack issue on circular dependency
import { authSignoutRequest } from '../../App/Login/redux/actions';

export class Header extends Component {
  static displayName = 'Header';
  props: {
    user: {
      name: string,
      token: string
    } | null,
    t: Function,
    logout: Function,
    toggle: Function
  };

  render() {
    const { toggle, user, t, logout } = this.props;
    const isLoggedIn = user && user.token;

    return (
      <AppBar title={ t('shared.applicationName') } leftIcon="menu" onLeftIconClick={ toggle }>
        {
          isLoggedIn ?
            (<Navigation horizontal>
              <Button label={ t('layout.header.logout') } onClick={ logout } icon="exit_to_app" />
            </Navigation>) :
          (<Navigation horizontal>
            <Link href="/app" label={ t('layout.header.home') } />
            <Link href="/app" label={ t('layout.header.pricing') } />
            <Link href="/app" label={ t('layout.header.howItWorks') } />
            <Link href="/app" label={ t('layout.header.company') } />
            <Link href="/app" label={ t('layout.header.blog') } />
            <Link href="/app/login" label={ t('layout.header.login') } icon="exit_to_app" />
          </Navigation>)
        }
      </AppBar>
    );
  }
}

const mapStatesToProps = ({ auth: { user } }) => ({
  user
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(authSignoutRequest()),
  toggle: () => dispatch(toggleNavDrawer())
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(Header));
