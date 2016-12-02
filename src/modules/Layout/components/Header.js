// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar, Navigation, Link, Button } from 'react-toolbox';
import { translate } from 'react-i18next';

import { toggleNavDrawer } from '../redux/actions';
import AppSelect from './AppSelect';

import { authSignoutRequest } from '../../App/Auth/redux/actions';

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
            (<div>
              <AppSelect /> &nbsp;
              <Button label={ t('layout.header.logout') } onClick={ logout } icon="exit_to_app" />
            </div>) :
          (<Navigation horizontal>
            <Link href="/app" label={ t('layout.header.home') } />
            <Link href="/app" label={ t('layout.header.pricing') } />
            <Link href="/app" label={ t('layout.header.howItWorks') } />
            <Link href="/app" label={ t('layout.header.company') } />
            <Link href="/app" label={ t('layout.header.blog') } />
            <Link href="/app/auth/login" label={ t('layout.header.login') } icon="exit_to_app" />
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
  toggle: () => dispatch(toggleNavDrawer()),
  logout: () => dispatch(authSignoutRequest())
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(Header));
