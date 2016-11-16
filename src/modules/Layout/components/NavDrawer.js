import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavDrawer } from 'react-toolbox';
import { hideNavDrawer } from '../redux/actions';
import { translate } from 'react-i18next';
import Navigation from 'react-toolbox/lib/navigation';
import Link from 'react-toolbox/lib/link';

import { appListRequest } from '../../App/Applications/redux/actions';

export class SideBar extends Component {
  static displayName = 'NavDrawer';

  componentWillMount() {
    this.props.listApp();
  }

  props: {
    active: bool,
    hide: Function,
    user: ?Object,
    t: Function,
    listApp: Function
  };

  render() {
    const { active, hide, user, t } = this.props;
    if (!user) {
      return null;
    }

    return (
      <NavDrawer
        active={ active }
        permanentAt="md"
        onOverlayClick={ hide }
      >
        <Navigation type="vertical">
          <Link href="/app/home" label={ t('layout.navbar.dashboard') } icon="dashboard" />
          <Link href="/app/campaigns" active label={ t('layout.navbar.campaigns') } icon="alarm" />
          <Link href="/app/audience" active label={ t('layout.navbar.audience') } icon="face" />
          <Link href="/app/reports" active label={ t('layout.navbar.reports') } icon="add_alert" />
          <Link href="/app/analytics" active label={ t('layout.navbar.analytics') } icon="alarm" />
          <Link href="/app/revenue" active label={ t('layout.navbar.revenueGoals') } icon="local_atm" />
          <Link href="/app/settings" active label={ t('layout.navbar.settings') } icon="gavel" />
        </Navigation>
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
  listApp: () => dispatch(appListRequest())
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(SideBar));
