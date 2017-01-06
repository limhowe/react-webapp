import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavDrawer } from 'react-toolbox';
import { translate } from 'react-i18next';

import { hideNavDrawer, setPath } from '../../redux/actions';
import ListItem from './ListItem';
import AppSelect from './AppSelect';
import theme from './styles/NavDrawer.scss';

export class SideBar extends Component {
  static displayName = 'NavDrawer';

  componentWillMount() {
    this.props.setPath(this.props.pathname);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.props.setPath(nextProps.pathname);
    }
  }

  props: {
    pathname: string,
    active: bool,
    hide: Function,
    t: Function,
    user: Object,
    setPath: Function
  };

  render() {
    const { active, user, t } = this.props;

    if (user.role === 'superadmin' && !user.behalf) {
      return (
        <NavDrawer permanentAt="md" width={ active ? 'wide' : 'normal' } active={ active } theme={ theme }>
          <div>
            <ListItem href="/app/companies" caption={ t('layout.navbar.companies') } icon="list-alt" />
          </div>
        </NavDrawer>
      );
    }

    return (
      <NavDrawer permanentAt="md" width={ active ? 'wide' : 'normal' } active={ active } theme={ theme }>
        <div>
          <AppSelect />
          { user.role === 'superadmin' && user.behalf && <ListItem href="/app/companies" caption={ t('layout.navbar.companies') } icon="list-alt" /> }
          <ListItem href="/app/home" caption={ t('layout.navbar.dashboard') } icon="dashboard" />
          <ListItem href="/app/campaigns" caption={ t('layout.navbar.campaigns') } icon="bullhorn" />
          <ListItem href="/app/audience" caption={ t('layout.navbar.audience') } icon="users" />
          {/* <ListItem href="/app/reports" caption={ t('layout.navbar.reports') } icon="insert_drive_file" /> */}
          <ListItem href="/app/analytics/users" name="analytics" caption={ t('layout.navbar.analytics') } icon="bar-chart">
            <ListItem href="/app/analytics/users" caption={ t('layout.navbar.users') } />
            <ListItem href="/app/analytics/locations" caption={ t('layout.navbar.locations') } />
            <ListItem href="/app/analytics/devices" caption={ t('layout.navbar.devices') } />
            <ListItem href="/app/analytics/events" caption={ t('layout.navbar.events') } />
          </ListItem>
          {/* <ListItem href="/app/revenue" caption={ t('layout.navbar.revenueGoals') } icon="attach_money" /> */}
          <ListItem href="/app/applications" always caption={ t('layout.navbar.settings') } icon="cog" />
        </div>
      </NavDrawer>
    );
  }
}

const mapStatesToProps = ({ layout: { navDrawerActive }, auth: { user } }) => ({
  active: navDrawerActive,
  user
});

const mapDispatchToProps = (dispatch) => ({
  hide: () => dispatch(hideNavDrawer()),
  setPath: (path) => dispatch(setPath(path))
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(SideBar));
