// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar, Navigation, FontIcon, Menu, MenuItem, IconButton } from 'react-toolbox';
import { Link } from 'react-router';
import { translate } from 'react-i18next';
import { push } from 'react-router-redux';

import { toggleNavDrawer } from '../../redux/actions';
import { authSignoutRequest } from '../../../App/Auth/redux/actions';
import appBarTheme from './styles/AppBar.scss';
import menuTheme from './styles/Menu.scss';

export class Header extends Component {
  static displayName = 'Header';
  state = { menuActive: false }
  props: {
    user: {
      firstName: string,
      token: string
    } | null,
    t: Function,
    logout: Function,
    toggle: Function,
    changeLocation: Function
  };

  toggleMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }

  hideMenu = () => {
    this.setState({ menuActive: false });
  }

  renderUserMenu() {
    const { t, logout, user } = this.props;
    return (
      <Navigation horizontal>
        <Link to="/app">{t('layout.header.helpAndDocumentation')}</Link>
        <Link onClick={ this.toggleMenu }>{t('layout.header.hello')} {user.firstName} <FontIcon className="c-icon" value="keyboard_arrow_down" /></Link>
        <Menu theme={ menuTheme } position="topRight" active={ this.state.menuActive } onHide={ this.hideMenu }>
          <MenuItem theme={ menuTheme } icon="person" caption="Profile" onClick={ () => this.props.changeLocation('/app') } />
          <MenuItem theme={ menuTheme } icon="exit_to_app" caption="Log out" onClick={ logout } />
        </Menu>
      </Navigation>
    );
  }

  render() {
    const { toggle, user, t } = this.props;
    const isLoggedIn = user && user.token;

    return (
      <AppBar theme={ appBarTheme }>
        <div className={ appBarTheme.logoContainer }>
          <Link to="/app/home"><img src={ __APP_CONFIG__.LOGO_URL } className={ appBarTheme.logo } /></Link>
          <IconButton icon="menu" onClick={ toggle } className={ appBarTheme.menuNav } />
        </div>
        {
          isLoggedIn ? this.renderUserMenu() :
          (<Navigation horizontal>
            <Link to="/app">{t('layout.header.home')}</Link>
            <Link to="/app">{t('layout.header.pricing')}</Link>
            <Link to="/app">{t('layout.header.howItWorks')}</Link>
            <Link to="/app">{t('layout.header.company')}</Link>
            <Link to="/app">{t('layout.header.blog')}</Link>
            <Link to="/app/auth/login"><FontIcon className="c-icon" value="exit_to_app" />{t('layout.header.login')}</Link>
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
  logout: () => dispatch(authSignoutRequest()),
  changeLocation: (...args) => dispatch(push(...args))
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(Header));
