import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { push } from 'react-router-redux';
import { Tabs, Tab, Button } from 'react-toolbox';

import SegmentTable from './SegmentTable';
import { segmentListRequest } from '../redux/actions';

// @TODO implement filtered list
// @TODO implement targeted audiences

export class SegmentList extends Component {
  displayName: 'SegmentList'
  state = {
    tabIndex: 0
  }

  componentWillMount() {
    this.props.listSegments();
  }

  props: {
    listSegments: Function,
    createNew: Function
  }

  handleTabChange = (tabIndex) => {
    this.setState({ tabIndex });
  }

  render() {
    return (
      <div className="c-container__large">
        <div className="row">
          <div className="col-sm-8">
            <h2>Audience</h2>
          </div>
          <div className="col-sm-4 text-right u-padding-top-lg">
            <Button onClick={ this.props.createNew } primary raised label="Create New Segment" />
          </div>
        </div>
        <Tabs index={ this.state.tabIndex } onChange={ this.handleTabChange }>
          <Tab label="All Segments">
            <SegmentTable />
          </Tab>
          <Tab label="Active Segments">
            <SegmentTable />
          </Tab>
          <Tab label="Favorite Segments">
            <SegmentTable />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const mapStatesToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  listSegments: () => dispatch(segmentListRequest()),
  createNew: () => dispatch(push('/app/audience/new'))
});

export default translate()(
  connect(mapStatesToProps, mapDispatchToProps)(SegmentList)
);
