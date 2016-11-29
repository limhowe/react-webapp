import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, CartesianGrid, BarChart, Bar } from 'recharts';
import { formattedEventAnalytics, getEventAnalyticsLabels } from '../redux/selector';
import colors from './colors';

export class EventChart extends Component {
  displayName: 'EventChart'
  props: {
    formattedData: Object,
    loading: bool,
    selectedEvents: Object,
    chartType: string,
    eventAnalytics: Array<Object>,
    labels: Array<string>
  }

  formatData() {
    const { formattedData, labels, selectedEvents } = this.props;
    return labels.map((label) => {
      const data = { name: label };
      Object.keys(formattedData).forEach((eventId) => {
        data[selectedEvents[eventId].name] = formattedData[eventId][label];
      });
      return data;
    });
  }

  renderLineChart() {
    const { selectedEvents } = this.props;
    const lines = [];
    Object.keys(selectedEvents).forEach((eventId, index) => {
      const key = selectedEvents[eventId].name;
      if (selectedEvents[eventId].selected) {
        lines.push(<Line key={ key } type="monotone" dataKey={ key } stroke={ colors[index] } />);
      }
    });
    const data = this.formatData();

    return (
      <LineChart width={ 800 } height={ 300 } data={ data } margin={ { right: 50 } }>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        { lines }
      </LineChart>
    );
  }

  renderBarChart() {
    const { selectedEvents } = this.props;
    const bars = [];
    Object.keys(selectedEvents).forEach((eventId, index) => {
      const key = selectedEvents[eventId].name;
      if (selectedEvents[eventId].selected) {
        bars.push(<Bar key={ key } type="monotone" dataKey={ key } fill={ colors[index] } />);
      }
    });
    const data = this.formatData();

    return (
      <BarChart width={ 800 } height={ 300 } data={ data } margin={ { right: 50 } }>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        { bars }
      </BarChart>
    );
  }

  renderPieChart() {

  }

  render() {
    const { loading, eventAnalytics, chartType } = this.props;
    if (loading || !Object.keys(eventAnalytics).length) {
      return null;
    }

    return (
      <div>
        { chartType === 'line' ? this.renderLineChart() : null }
        { chartType === 'bar' ? this.renderBarChart() : null }
      </div>
    );
  }
}

const mapStatesToProps = (state) => {
  const { analytics: { selectedEvents, eventAnalyticsLoading, eventAnalytics, chartType } } = state;
  return {
    loading: eventAnalyticsLoading,
    selectedEvents,
    eventAnalytics,
    chartType,
    formattedData: formattedEventAnalytics(state),
    labels: getEventAnalyticsLabels(state)
  };
};

export default connect(mapStatesToProps)(EventChart);
