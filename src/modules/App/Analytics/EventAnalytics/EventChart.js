import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
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

  accumulate() {
    const { formattedData, selectedEvents } = this.props;
    const result = [];
    Object.keys(selectedEvents).forEach((eventId) => {
      const sum = Object.keys(formattedData[eventId]).reduce((total, key) => (formattedData[eventId][key] + total), 0);

      if (selectedEvents[eventId].selected) {
        result.push({
          name: selectedEvents[eventId].name,
          value: sum
        });
      }
    });
    return result;
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
    const { selectedEvents } = this.props;
    const source = this.accumulate();
    const cells = [];
    Object.keys(selectedEvents).forEach((eventId, index) => {
      if (selectedEvents[eventId].selected) {
        cells.push(<Cell key={ eventId } fill={ colors[index] } />);
      }
    });
    return (
      <PieChart width={ 800 } height={ 300 }>
        <Pie data={ source } cx={ 200 } cy={ 150 } innerRadius={ 40 } outerRadius={ 80 } paddingAngle={ 3 } fill={ colors[0] } label>
          { cells }
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    );
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
        { chartType === 'pie' ? this.renderPieChart() : null }
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
