import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs } from 'react-toolbox';

import DeviceCharts from './DeviceCharts';
import AudienceTable from '../UserAnalytics/AudienceTable';
import { getDeviceAnalytics } from '../redux/actions';

export class DeviceAnalytics extends Component {
  displayName: 'DeviceAnalytics';
  state = {
    tabIndex: 0
  }
  componentWillMount() {
    this.props.getDeviceAnalytics();
  }

  props: {
    getDeviceAnalytics: Function
  }

  handleTabChange = (tabIndex) => {
    this.setState({ tabIndex });
  }

  render() {
    const model = {
      name: { title: 'Name' },
      email: { title: 'Email' },
      phone: { title: 'Phone' },
      devicePlatform: { title: 'Platform' },
      osNumber: { title: 'OS' },
      deviceVendor: { title: 'Vendor' },
      deviceModel: { title: 'Model' },
      connectivityType: { title: 'Connectivity' },
      carrier: { title: 'Carrier' },
      appVersion: { title: 'App Version' },
      sdkVersion: { title: 'SDK Version' },
      pushNotificationEnabled: { title: 'Push Enabled' }
    };

    return (
      <div className="c-container__large">
        <h2>Analytics: Devices</h2>
        <Tabs index={ this.state.tabIndex } onChange={ this.handleTabChange }>
          <Tab label="Device Charts">
            <DeviceCharts />
          </Tab>
          <Tab label="Device Table">
            <AudienceTable model={ model } />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  getDeviceAnalytics: () => dispatch(getDeviceAnalytics())
});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceAnalytics);
