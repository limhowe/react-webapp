import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { Dropdown, DatePicker } from 'react-toolbox';

import { changeEventAnalyticsFilter, addCustomEvent, removeCustomEvent } from '../redux/actions';

export class EventAnalyticsFilter extends Component {
  displayName: 'EventAnalyticsFilter'
  props: {
    removeCustomEvent: Function,
    addCustomEvent: Function,
    changeEventAnalyticsFilter: Function,
    segments: Array<Object>,
    customEvents: Array<Object>,
    selectedEvents: Object,
    eventAnalyticsFilter: Object,
    toggleEvent: Function
  }

  valueChangeHandler = (field) => {
    return (val) => this.props.changeEventAnalyticsFilter(field, val);
  }

  onSelectEvent = (value) => {
    if (this.props.selectedEvents[value]) {
      this.props.removeCustomEvent(value);
    } else {
      this.props.addCustomEvent(_.find(this.props.customEvents, { _id: value }));
    }
  }

  formatDate = (date) => moment(date).format('YYYY-MM-DD')

  render() {
    const segments = this.props.segments.map((s) => ({ value: s._id, label: s.name }));
    segments.unshift({ value: '', label: 'All' });

    const customEvents = this.props.customEvents.map((s) => ({ value: s._id, label: s.name }));
    const groupByValues = [{ value: 'day', label: 'Day' }, { value: 'month', label: 'Month' }, { value: 'year', label: 'Year' }];
    const { segmentId, startDate, endDate, groupBy } = this.props.eventAnalyticsFilter;

    return (
      <div className="row">
        <div className="col-lg-3 col-md-6">
          <Dropdown label="Select Event" onChange={ this.onSelectEvent } source={ customEvents } />
        </div>
        <div className="col-lg-3 col-md-6">
          <Dropdown label="Select Segment" onChange={ this.valueChangeHandler('segmentId') } source={ segments } value={ segmentId } />
        </div>
        <div className="col-lg-2 col-md-4">
          <DatePicker label="Start Date" onChange={ this.valueChangeHandler('startDate') } value={ startDate } inputFormat={ this.formatDate } />
        </div>
        <div className="col-lg-2 col-md-4">
          <DatePicker label="End Date" onChange={ this.valueChangeHandler('endDate') } value={ endDate } inputFormat={ this.formatDate } />
        </div>
        <div className="col-lg-2 col-md-4">
          <Dropdown label="Group By" onChange={ this.valueChangeHandler('groupBy') } source={ groupByValues } value={ groupBy } />
        </div>
      </div>
    );
  }
}

const mapStatesToProps = ({ segments: { segments }, customEvents: { customEvents }, analytics: { eventAnalyticsFilter, selectedEvents } }) => ({
  eventAnalyticsFilter,
  segments,
  selectedEvents,
  customEvents
});

const mapDispatchToProps = (dispatch) => ({
  changeEventAnalyticsFilter: (key, value) => dispatch(changeEventAnalyticsFilter(key, value)),
  addCustomEvent: (customEvent) => dispatch(addCustomEvent(customEvent)),
  removeCustomEvent: (id) => dispatch(removeCustomEvent(id))
});

export default connect(mapStatesToProps, mapDispatchToProps)(EventAnalyticsFilter);
