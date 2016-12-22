import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Panel, ProgressBar } from 'react-toolbox';
import { push } from 'react-router-redux';

import Header from './components/Header';
import Notification from './components/Notification';
import NavDrawer from './components/NavDrawer';

import { showNotification } from './redux/actions';

class AppLayout extends Component {
  static displayName = 'AppLayout';

  componentWillReceiveProps(nextProps) {
    // @TODO implement user role
    if (nextProps.loaded && !nextProps.user && nextProps.location.pathname.indexOf('/app/auth') === -1) {
      this.props.goToLogin();
      this.props.showNotification('error', 'You are not logged in');
    }
  }

  props: {
    children: any,
    loaded: bool,
    user: ?Object,
    location: Object,
    currentApp: ?Object,
    goToLogin: Function,
    showNotification: Function
  };

  render() {
    const { children, loaded, user, location: { pathname }, currentApp } = this.props;
    if (loaded && user && user.role === 'superadmin') {
      return (
        <div className="layout">
          <Header />
          <Layout>
            { user.behalf ? <NavDrawer pathname={ pathname } /> : <div /> }
            <Panel scrollY>
              <div>
                <div className="c-container c-container__center">
                  { children }
                </div>
              </div>
            </Panel>
          </Layout>
          <Notification />
        </div>
      );
    }

    if (!loaded || (loaded && !user && pathname.indexOf('/app/auth') === -1) || (user && !currentApp && pathname.indexOf('/app/applications') === -1)) {
      return (
        <div className="layout">
          <Layout>
            <Panel>
              <div>
                <div className="c-container c-container__center">
                  <ProgressBar mode="indeterminate" type="circular" multicolor />
                </div>
              </div>
            </Panel>
          </Layout>
        </div>
      );
    }

    return (
      <div className="layout">
        <Header />
        <Layout>
          { user ? <NavDrawer pathname={ pathname } /> : <div /> }
          <Panel scrollY>
            <div>
              <div className="c-container c-container__center">
                { children }
              </div>
            </div>
          </Panel>
        </Layout>
        <Notification />
      </div>
    );
  }
}

const mapStatesToProps = ({ persist: { loaded }, auth: { user }, application: { currentApp } }) => ({ loaded, user, currentApp });

const mapDispatchToProps = (dispatch) => ({
  goToLogin: () => dispatch(push('/app/auth/login')),
  showNotification: (...args) => dispatch(showNotification(...args))
});


export default connect(mapStatesToProps, mapDispatchToProps)(AppLayout);
