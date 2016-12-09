import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'react-toolbox';
import moment from 'moment';
import cn from 'classnames';
import _ from 'lodash';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, CartesianGrid, ResponsiveContainer } from 'recharts';
import styles from './styles.scss';

import { getEventAnalytics } from '../redux/actions';

export class DPResponseChart extends Component {
  displayName: 'DPResponseChart';
  state = {
    dateRange: 'week'
  }

  componentWillMount() {
    this.getData('week');
  }

  getData = (dateRange) => {
    const startDate = moment().subtract(1, dateRange).format('YYYY-MM-DD');
    const endDate = moment().add(1, 'day').format('YYYY-MM-DD');
    this.props.getEventAnalytics('totalDPByDate', {
      eventTarget: 'notification',
      eventType: 'receive',
      groupBy: 'day',
      startDate,
      endDate
    });
    this.props.getEventAnalytics('appOpenByDate', {
      eventType: 'open',
      groupBy: 'day',
      startDate,
      endDate
    });
  }

  props: {
    getEventAnalytics: Function,
    totalDPByDate: Array<Object>,
    appOpenByDate: Array<Object>
  }

  onChangeDateRange = (dateRange) => {
    this.setState({ dateRange });
    this.getData(dateRange);
  }

  formatData = (dataObj) => {
    const startDate = moment().subtract(1, this.state.dateRange).format('YYYY-MM-DD');
    const endDate = moment().add(1, 'day').format('YYYY-MM-DD');
    const labels = [];
    for (let m = moment(startDate); m.isBefore(endDate); m.add(1, 'day')) {
      labels.push(m.format('YYYY-MM-DD'));
    }

    const result = {};
    labels.forEach((label) => {
      result[label] = {};
    });

    Object.keys(dataObj).forEach((key) => {
      const data = dataObj[key];
      data.forEach((d) => {
        const newDate = moment([d._id.year, (d._id.month - 1) || 0, d._id.day || 1]);
        result[newDate.format('YYYY-MM-DD')] = {
          ...result[newDate.format('YYYY-MM-DD')],
          [key]: d.count
        };
      });
    });

    return Object.keys(result).map((key) => ({ ...result[key], name: key }));
  }

  render() {
    const dateRange = [{ value: 'week', label: 'Last Week' }, { value: 'month', label: 'Last Month' }, { value: 'year', label: 'Last year' }];
    const { totalDPByDate, appOpenByDate } = this.props;
    const totalDP = _.sumBy(totalDPByDate, 'count');
    const totalOpen = _.sumBy(appOpenByDate, 'count');
    const dataSeries = this.formatData({
      'Total DP': totalDPByDate,
      'App Open': appOpenByDate
    });

    return (
      <div className={ styles.responseChart }>
        <div className={ styles.chartHeading }>
          <h3>DPs Response</h3>
          <div className={ styles.recurrence }>
            <Dropdown label="Select Date Range" source={ dateRange } value={ this.state.dateRange } onChange={ this.onChangeDateRange } />
          </div>
        </div>
        <div className={ styles.chartDetail }>
          <div className={ styles.chartDetailItem }>
            <span className={ styles.label }>Total DPs Sent</span>
            <span className={ cn(styles.value, 'u-color-cyan') }>{ `${ totalDP }` }</span>
          </div>
          <div className={ styles.chartDetailItem }>
            <span className={ styles.label }>Total App Opens</span>
            <span className={ cn(styles.value, 'u-color-yellow') }>{ `${ totalOpen }` }</span>
          </div>
        </div>
        <div className={ styles.lineChart }>
          <ResponsiveContainer height={ 300 }>
            <LineChart data={ dataSeries } margin={ { right: 50 } }>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Total DP" stroke="#32c5d2" />
              <Line type="monotone" dataKey="App Open" stroke="#f8cb00" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = ({ dashboard: { dpData } }) => ({
  totalDPByDate: dpData.totalDPByDate,
  appOpenByDate: dpData.appOpenByDate
});

const mapDispatchToProps = (dispatch) => ({
  getEventAnalytics: (...args) => dispatch(getEventAnalytics(...args))
});

export default connect(mapStatesToProps, mapDispatchToProps)(DPResponseChart);
