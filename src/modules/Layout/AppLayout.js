// @flow
import React, { Component, PropTypes } from 'react';
import { Layout, Panel } from 'react-toolbox';
import classnames from 'classnames';

import Header from './components/Header';
import Notification from './components/Notification';
import NavDrawer from './components/NavDrawer';
import styles from '../../styles';

class AppLayout extends Component {
  static displayName = 'AppLayout';
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    const { children } = this.props;
    const className = classnames(styles['c-container'], styles['c-container__center']);
    return (
      <Layout>
        <Panel>
          <Header />
          <Layout>
            <NavDrawer />
            <Panel>
              <div className={ className }>
                { children }
              </div>
            </Panel>
          </Layout>
          <Notification />
        </Panel>
      </Layout>
    );
  }
}

export default AppLayout;
