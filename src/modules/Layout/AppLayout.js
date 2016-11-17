import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Panel, ProgressBar } from 'react-toolbox';

import Header from './components/Header';
import Notification from './components/Notification';
import NavDrawer from './components/NavDrawer';

class AppLayout extends Component {
  static displayName = 'AppLayout';
  props: {
    children: any,
    loaded: bool,
    user: ?Object
  };

  render() {
    const { children, loaded, user } = this.props;
    if (!loaded) {
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
          { user ? <NavDrawer /> : <div /> }
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

const mapStatesToProps = ({ persist: { loaded }, auth: { user } }) => ({ loaded, user });

export default connect(mapStatesToProps)(AppLayout);
