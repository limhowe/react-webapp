import React, { Component } from 'react';
import styles from './styles.scss';

export class DashboardPanel extends Component {
  displayName: 'DashboardPanel';
  props: {
    children: any
  }

  render() {
    return (
      <div className={ styles.dashboardPanel }>
        { this.props.children }
      </div>
    );
  }
}

export default DashboardPanel;
