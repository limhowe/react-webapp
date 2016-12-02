import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { formattedEventAnalytics, getEventAnalyticsLabels } from '../redux/selector';
import Table from '../../../../components/Table';
import styles from './EventCharts.scss';

export class EventAnalyticsTable extends Component {
  displayName: 'EventAnalyticsTable'

  props: {
    loading: bool,
    selectedEvents: Object,
    labels: Array<string>,
    eventAnalytics: Object,
    formattedData: Array<Object>
  }

  render() {
    const { labels, formattedData, loading, selectedEvents } = this.props;

    const model = {
      event: { title: 'Event' }
    };
    labels.forEach((l) => {
      model[l] = { title: l };
    });

    const source = [];
    Object.keys(selectedEvents).forEach((eventId, index) => {
      if (selectedEvents[eventId].selected) {
        const dataSeries = formattedData[eventId];
        const d = {};
        if (dataSeries) {
          Object.keys(dataSeries).forEach((key) => {
            d[key] = (<span className={ styles[`color-${ index + 1 }`] }>{ `${ dataSeries[key] }` }</span>);
          });
        }
        d.event = (<span className={ styles[`color-${ index + 1 }`] }>{ selectedEvents[eventId].name }</span>);
        source.push(d);
      }
    });

    return (
      <div>
        <Table model={ model } source={ source } loading={ loading } selectable={ false } />
      </div>
    );
  }
}

const mapStatesToProps = (state) => {
  const { analytics: { eventAnalyticsLoading, selectedEvents, eventAnalytics } } = state;
  return {
    selectedEvents,
    loading: eventAnalyticsLoading,
    eventAnalytics,
    formattedData: formattedEventAnalytics(state),
    labels: getEventAnalyticsLabels(state)
  };
};

export default translate()(
  connect(mapStatesToProps)(EventAnalyticsTable)
);
