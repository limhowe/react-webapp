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
    loaded: bool
  };

  render() {
    const { children, loaded } = this.props;
    return (
      <div className="layout">
        <Header />
        <Layout>
          <NavDrawer />
          <Panel>
            <div>
              <div className="c-container c-container__center">
                { loaded ? children : (<ProgressBar mode="indeterminate" type="circular" multicolor />) }
              </div>
            </div>
          </Panel>
        </Layout>
        <Notification />
      </div>
    );
  }
}

const mapStatesToProps = ({ persist: { loaded } }) => ({ loaded });

export default connect(mapStatesToProps)(AppLayout);
