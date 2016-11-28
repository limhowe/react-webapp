import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Dropdown, ProgressBar, Autocomplete, DatePicker } from 'react-toolbox';

import { segmentListRequest } from '../../Segments/redux/actions';
import { customEventListRequest } from '../../CustomEvents/redux/actions';

export class EventAnalytics extends Component {
  displayName: 'EventAnalytics'
  state = {
    segmentId: '',
    customEventIds: [],
    startDate: null,
    endDate: null,
    groupBy: 'day'
  }

  componentWillMount() {
    this.props.listSegments();
    this.props.listCustomEvents();
  }

  props: {
    listSegments: Function,
    listCustomEvents: Function,
    segments: Array<Object>,
    customEvents: Array<Object>,
    loading: bool
  }

  valueChangeHandler = (field) => {
    return (val) => this.setState({
      [field]: val
    });
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="c-container c-container__center">
          <ProgressBar mode="indeterminate" type="circular" multicolor />
        </div>
      );
    }

    const segments = this.props.segments.map((s) => ({
      value: s._id,
      label: s.name
    }));

    segments.unshift({
      value: '',
      label: 'All'
    });

    const customEvents = {};
    this.props.customEvents.forEach((e) => {
      customEvents[e._id] = e.name;
    });

    const groupByValues = [{ value: 'day', label: 'Day' }, { value: 'month', label: 'Month' }, { value: 'year', label: 'Year' }];

    return (
      <div className="c-container__large">
        <h2>Analytics: Events</h2>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <Autocomplete multiple direction="down" label="Select Event" onChange={ this.valueChangeHandler('customEventIds') } source={ customEvents } value={ this.state.customEventIds } />
          </div>
          <div className="col-lg-3 col-md-6">
            <Dropdown label="Select Segment" onChange={ this.valueChangeHandler('segmentId') } source={ segments } value={ this.state.segmentId } />
          </div>
          <div className="col-lg-2 col-md-4">
            <DatePicker label="Start Date" onChange={ this.valueChangeHandler('startDate') } value={ this.state.startDate } />
          </div>
          <div className="col-lg-2 col-md-4">
            <DatePicker label="End Date" onChange={ this.valueChangeHandler('endDate') } value={ this.state.endDate } />
          </div>
          <div className="col-lg-2 col-md-4">
            <Dropdown label="Group By" onChange={ this.valueChangeHandler('groupBy') } source={ groupByValues } value={ this.state.groupBy } />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            placeholder
          </div>
          <div className="col-lg-4">
            placeholder
          </div>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = ({ segments: { segments, listLoading }, customEvents: { customEvents, listLoading: eventLoading } }) => ({
  segments,
  customEvents,
  loading: listLoading || eventLoading
});

const mapDispatchToProps = (dispatch) => ({
  listSegments: () => dispatch(segmentListRequest()),
  listCustomEvents: () => dispatch(customEventListRequest())
});

export default translate()(
  connect(mapStatesToProps, mapDispatchToProps)(EventAnalytics)
);
