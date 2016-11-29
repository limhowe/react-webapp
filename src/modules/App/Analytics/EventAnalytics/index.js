import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { ProgressBar } from 'react-toolbox';

import ButtonGroup from '../../../../components/ButtonGroup';
import CustomEventCheck from './CustomEventCheck';
import EventAnalyticsFilter from './EventAnalyticsFilter';
import EventAnalyticsTable from './EventAnalyticsTable';
import EventChart from './EventChart';

import { segmentListRequest } from '../../Segments/redux/actions';
import { customEventListRequest } from '../../CustomEvents/redux/actions';
import { changeChartType } from '../redux/actions';

export class EventAnalytics extends Component {
  displayName: 'EventAnalytics'

  componentWillMount() {
    this.props.listSegments();
    this.props.listCustomEvents();
  }

  props: {
    listSegments: Function,
    listCustomEvents: Function,
    changeChartType: Function,
    chartType: string,
    loading: bool
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="c-container c-container__center">
          <ProgressBar mode="indeterminate" type="circular" multicolor />
        </div>
      );
    }

    const buttonSources = [{ icon: 'show_chart', value: 'line' }, { icon: 'insert_chart', value: 'bar' }, { icon: 'pie_chart', value: 'pie' }];

    return (
      <div className="c-container__large">
        <h2>Analytics: Events</h2>
        <EventAnalyticsFilter />
        <div className="row">
          <div className="col-lg-8">
            <CustomEventCheck />
          </div>
          <div className="col-lg-4">
            <ButtonGroup source={ buttonSources } onChange={ this.props.changeChartType } value={ this.props.chartType } />
          </div>
        </div>
        <div className="row u-margin-bottom-lg">
          <EventChart />
        </div>
        <div className="row">
          <EventAnalyticsTable />
        </div>
      </div>
    );
  }
}

const mapStatesToProps = ({ analytics: { chartType }, segments: { listLoading }, customEvents: { listLoading: eventLoading } }) => ({
  loading: listLoading || eventLoading,
  chartType
});

const mapDispatchToProps = (dispatch) => ({
  listSegments: () => dispatch(segmentListRequest()),
  listCustomEvents: () => dispatch(customEventListRequest()),
  changeChartType: (chartType) => dispatch(changeChartType(chartType))
});

export default translate()(
  connect(mapStatesToProps, mapDispatchToProps)(EventAnalytics)
);
