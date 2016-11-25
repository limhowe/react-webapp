import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, FontIcon } from 'react-toolbox';

import HighlightedPieChart from '../../../../components/HighlightedPieChart';
import PlatformChart from './PlatformChart';
import { getDeviceAnalytics } from '../redux/actions';

export class DeviceAnalytics extends Component {
  displayName: 'DeviceAnalytics';

  componentWillMount() {
    this.props.getDeviceAnalytics();
  }

  props: {
    currentApp: Object,
    deviceData: Object,
    getDeviceAnalytics: Function
  }

  render() {
    const androidColors = ['#d4dd63', '#ddd'];
    const appleColors = ['#60c0ec', '#ddd'];
    const { deviceData } = this.props;
    if (!deviceData) {
      return null;
    }

    const pieChartData = {
      Android: {
        optIn: [{ value: 0 }, { value: 0 }],
        uninstalled: [{ value: 0 }, { value: 0 }],
        optOut: [{ value: 0 }, { value: 0 }]
      },
      iOS: {
        optIn: [{ value: 0 }, { value: 0 }],
        uninstalled: [{ value: 0 }, { value: 0 }],
        optOut: [{ value: 0 }, { value: 0 }]
      }
    };

    Object.keys(deviceData).map((p) => {
      pieChartData[p] = {
        optIn: [{
          value: deviceData[p].optIn
        }, {
          value: deviceData[p].total - deviceData[p].optIn
        }],
        optOut: [{
          value: deviceData[p].optOut
        }, {
          value: deviceData[p].total - deviceData[p].optOut
        }],
        uninstalled: [{
          value: deviceData[p].uninstalled
        }, {
          value: deviceData[p].total - deviceData[p].uninstalled
        }]
      };
    });

    return (
      <div style={ { width: '100%' } }>
        <h2>Analytics: Devices</h2>
        <div className="row">
          <div className="col-lg-8">
            <h3>Android <FontIcon value="android" className="u-color-android c-icon" /></h3>
            <div className="row u-margin-bottom-lg">
              <div className="col-lg-3 col-sm-6">
                <Card className="c-card">
                  <div className="c-container__center c-card-body">
                    <span className="c-card-highlight u-color-android">{ deviceData.Android.total }</span>
                  </div>
                  <div className="c-card-footer">
                    <span>Android Devices</span>
                  </div>
                </Card>
              </div>
              <div className="col-lg-3 col-sm-6">
                <Card className="c-card">
                  <div className="c-container__center c-card-body">
                    <HighlightedPieChart width={ 160 } height={ 160 } colors={ androidColors } data={ pieChartData.Android.optIn } />
                    <div>{ `${ deviceData.Android.optIn } Devices` }</div>
                  </div>
                  <div className="c-card-footer">
                    <span>Opted-In</span>
                  </div>
                </Card>
              </div>
              <div className="col-lg-3 col-sm-6">
                <Card className="c-card">
                  <div className="c-container__center c-card-body">
                    <HighlightedPieChart width={ 160 } height={ 160 } colors={ androidColors } data={ pieChartData.Android.optOut } />
                    <div>{ `${ deviceData.Android.optOut } Devices` }</div>
                  </div>
                  <div className="c-card-footer">
                    <span>Opted-Out</span>
                  </div>
                </Card>
              </div>
              <div className="col-lg-3 col-sm-6">
                <Card className="c-card">
                  <div className="c-container__center c-card-body">
                    <HighlightedPieChart width={ 160 } height={ 160 } colors={ androidColors } data={ pieChartData.Android.uninstalled } />
                    <div>{ `${ deviceData.Android.uninstalled } Devices` }</div>
                  </div>
                  <div className="c-card-footer">
                    <span>Uninstalled</span>
                  </div>
                </Card>
              </div>
            </div>
            <h3>iOS <FontIcon value="phone_iphone" className="u-color-apple c-icon" /></h3>
            <div className="row u-margin-bottom-lg">
              <div className="col-lg-3 col-sm-6">
                <Card className="c-card">
                  <div className="c-container__center c-card-body">
                    <span className="c-card-highlight u-color-apple">{ deviceData.iOS.total }</span>
                  </div>
                  <div className="c-card-footer">
                    <span>iOS Devices</span>
                  </div>
                </Card>
              </div>
              <div className="col-lg-3 col-sm-6">
                <Card className="c-card">
                  <div className="c-container__center c-card-body">
                    <HighlightedPieChart width={ 160 } height={ 160 } colors={ appleColors } data={ pieChartData.iOS.optIn } />
                    <div>{ `${ deviceData.iOS.optIn } Devices` }</div>
                  </div>
                  <div className="c-card-footer">
                    <span>Opted-In</span>
                  </div>
                </Card>
              </div>
              <div className="col-lg-3 col-sm-6">
                <Card className="c-card">
                  <div className="c-container__center c-card-body">
                    <HighlightedPieChart width={ 160 } height={ 160 } colors={ appleColors } data={ pieChartData.iOS.optOut } />
                    <div>{ `${ deviceData.iOS.optOut } Devices` }</div>
                  </div>
                  <div className="c-card-footer">
                    <span>Opted-Out</span>
                  </div>
                </Card>
              </div>
              <div className="col-lg-3 col-sm-6">
                <Card className="c-card">
                  <div className="c-container__center c-card-body">
                    <HighlightedPieChart width={ 160 } height={ 160 } colors={ appleColors } data={ pieChartData.iOS.uninstalled } />
                    <div>{ `${ deviceData.iOS.uninstalled } Devices` }</div>
                  </div>
                  <div className="c-card-footer">
                    <span>Uninstalled</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>
          <div className="col-lg-4 u-padding-top-lg">
            <PlatformChart deviceData={ deviceData } width={ 270 } height={ 270 } />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ application: { currentApp }, analytics: { deviceData } }) => ({ currentApp, deviceData });

const mapDispatchToProps = (dispatch) => ({
  getDeviceAnalytics: () => dispatch(getDeviceAnalytics())
});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceAnalytics);
