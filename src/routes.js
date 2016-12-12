// @flow
import React from 'react';
import { IndexRoute, Route } from 'react-router';

import {
  AppLayout,
  MainLayout,
  Home,
  Login,
  SignUp,
  SignUpConfirm,
  VerifyAccount,
  Dashboard,
  CampaignsList,
  CampaignEdit,
  NotFound,
  ApplicationList,
  ApplicationEdit,
  DeviceAnalytics,
  UserAnalytics,
  EventAnalytics,
  LocationAnalytics,
  SegmentEdit,
  SegmentList,
  RevenueGoals,
  Reports,
  Settings
} from './modules';

// On server we want to fetch all data for the current route before rendering
const fetchData = store => (nextState, replace, callback) => {
  Promise.all(
    nextState.routes.map(route => {
      if (route.component.onEnter) {
        return route.component.onEnter(store, nextState);
      }
    })
  ).then(() => callback());
};

// On client all data for the current route is already in the store’s initial
// state so we only need to attach onEnter hooks for all route components for
// subsequent routes
const attachOnEnterHooks = store => ({ routes: [rootRoute] }) => {
  const attach = route => {
    if (route.component.onEnter) {
      route.onEnter = nextState => route.component.onEnter(store, nextState);
    }

    if (route.indexRoute) {
      attach(route.indexRoute);
    }
    if (route.childRoutes) {
      route.childRoutes.forEach(r => attach(r));
    }
  };

  attach(rootRoute);
};

const configureRoutes = (store: Object) => { // eslint-disable-line react/display-name
  const onEnter = __SERVER__ ? fetchData(store) : attachOnEnterHooks(store);

  return (
    <Route path="/" component={ MainLayout } onEnter={ onEnter }>
      <IndexRoute component={ Home } />
      <Route path="app" component={ AppLayout }>
        <Route path="auth/login" component={ Login } />
        <Route path="auth/signup" component={ SignUp } />
        <Route path="auth/signup/success" component={ SignUpConfirm } />
        <Route path="auth/verify" component={ VerifyAccount } />
        <Route path="home" component={ Dashboard } />
        <Route path="applications" component={ ApplicationList } />
        <Route path="applications/:appId" component={ ApplicationEdit } />
        <Route path="campaigns" component={ CampaignsList } />
        <Route path="campaigns/:campaignId" component={ CampaignEdit } />
        <Route path="analytics/devices" component={ DeviceAnalytics } />
        <Route path="analytics/users" component={ UserAnalytics } />
        <Route path="analytics/events" component={ EventAnalytics } />
        <Route path="analytics/locations" component={ LocationAnalytics } />
        <Route path="audience" component={ SegmentList } />
        <Route path="audience/:segmentId" component={ SegmentEdit } />
        <Route path="revenue" component={ RevenueGoals } />
        <Route path="reports" component={ Reports } />
        <Route path="settings" component={ Settings } />
      </Route>
      <Route path="*" component={ NotFound } />
    </Route>
  );
};

export default configureRoutes;
