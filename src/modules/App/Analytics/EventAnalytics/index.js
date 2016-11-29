import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { ProgressBar } from 'react-toolbox';

import ButtonGroup from '../../../../components/ButtonGroup';
import CustomEventCheck from './CustomEventCheck';
import EventAnalyticsFilter from './EventAnalyticsFilter';
import { segmentListRequest } from '../../Segments/redux/actions';
import { customEventListRequest } from '../../CustomEvents/redux/actions';

export class EventAnalytics extends Component {
  displayName: 'EventAnalytics'
  state = {
    chartType: 'line'
  }

  componentWillMount() {
    this.props.listSegments();
    this.props.listCustomEvents();
  }

  valueChangeHandler = (field) => {
    return (val) => this.setState({
      [field]: val
    });
  }

  props: {
    listSegments: Function,
    listCustomEvents: Function,
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

    const buttonSources = [{ icon: 'insert_chart', value: 'line' }, { icon: 'show_chart', value: 'area' }, { icon: 'pie_chart', value: 'pie' }];

    return (
      <div className="c-container__large">
        <h2>Analytics: Events</h2>
        <EventAnalyticsFilter />
        <div className="row">
          <div className="col-lg-8">
            <CustomEventCheck />
          </div>
          <div className="col-lg-4">
            <ButtonGroup source={ buttonSources } onChange={ this.valueChangeHandler('chartType') } value={ this.state.chartType } />
          </div>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = ({ segments: { listLoading }, customEvents: { listLoading: eventLoading } }) => ({
  loading: listLoading || eventLoading
});

const mapDispatchToProps = (dispatch) => ({
  listSegments: () => dispatch(segmentListRequest()),
  listCustomEvents: () => dispatch(customEventListRequest())
});

export default translate()(
  connect(mapStatesToProps, mapDispatchToProps)(EventAnalytics)
);
