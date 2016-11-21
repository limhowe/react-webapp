import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavDrawer, List } from 'react-toolbox';
import { translate } from 'react-i18next';

import { hideNavDrawer } from '../../redux/actions';
import ListItem from './ListItem';
import { appListRequest } from '../../../App/Applications/redux/actions';

export class SideBar extends Component {
  static displayName = 'NavDrawer';

  componentWillMount() {
    this.props.listApp();
  }

  props: {
    active: bool,
    hide: Function,
    t: Function,
    listApp: Function
  };

  render() {
    const { active, hide, t } = this.props;

    return (
      <NavDrawer permanentAt="md" active={ active } onOverlayClick={ hide }>
        <List selectable ripple>
          <ListItem href="/app/home" caption={ t('layout.navbar.dashboard') } leftIcon="home" />
          <ListItem href="/app/campaigns" caption={ t('layout.navbar.campaigns') } leftIcon="alarm" />
          <ListItem href="/app/audience" caption={ t('layout.navbar.audience') } leftIcon="people" />
          <ListItem href="/app/reports" caption={ t('layout.navbar.reports') } leftIcon="insert_drive_file" />
          <ListItem name="analytics" caption={ t('layout.navbar.analytics') } leftIcon="trending_up">
            <List selectable ripple>
              <ListItem href="/app/analytics/users" caption={ t('layout.navbar.users') } />
              <ListItem href="/app/analytics/devices" caption={ t('layout.navbar.devices') } />
              <ListItem href="/app/analytics/events" caption={ t('layout.navbar.events') } />
            </List>
          </ListItem>
          <ListItem href="/app/revenue" caption={ t('layout.navbar.revenueGoals') } leftIcon="attach_money" />
          <ListItem href="/app/settings" caption={ t('layout.navbar.settings') } leftIcon="settings" />
        </List>
      </NavDrawer>
    );
  }
}

const mapStatesToProps = ({ layout: { navDrawerActive } }) => ({
  active: navDrawerActive
});

const mapDispatchToProps = (dispatch) => ({
  hide: () => dispatch(hideNavDrawer()),
  listApp: () => dispatch(appListRequest())
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(SideBar));
