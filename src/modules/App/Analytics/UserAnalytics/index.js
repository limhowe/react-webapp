import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Tabs, Tab, ProgressBar, Dropdown } from 'react-toolbox';

import { segmentListRequest } from '../../Segments/redux/actions';
import AudienceTable from './AudienceTable';

export class UserAnalytics extends Component {
  displayName: 'UserAnalytics'
  state = {
    tabIndex: 0,
    segmentId: ''
  }

  componentWillMount() {
    this.props.listSegments();
  }

  props: {
    listSegments: Function,
    segments: Array<Object>,
    loading: bool
  }

  handleTabChange = (tabIndex) => {
    this.setState({ tabIndex });
  }

  handleSegmentChange = (segmentId) => {
    this.setState({ segmentId });
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

    return (
      <div className="c-container__large">
        <h2>Analytics: Users</h2>
        <Tabs index={ this.state.tabIndex } onChange={ this.handleTabChange }>
          <Tab label="All">
            <AudienceTable />
          </Tab>
          <Tab label="Custom Segments/Filter">
            <Dropdown label="Select Segment" onChange={ this.handleSegmentChange } source={ segments } value={ this.state.segmentId } />
            { this.state.segmentId ? <AudienceTable segmentId={ this.state.segmentId } /> : null }
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const mapStatesToProps = ({ segments: { segments, listLoading } }) => ({
  segments,
  loading: listLoading
});

const mapDispatchToProps = (dispatch) => ({
  listSegments: () => dispatch(segmentListRequest())
});

export default translate()(
  connect(mapStatesToProps, mapDispatchToProps)(UserAnalytics)
);
