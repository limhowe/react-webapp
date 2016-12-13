import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { push } from 'react-router-redux';
import { Tabs, Tab, Button } from 'react-toolbox';

import SegmentTable from './SegmentTable';
import { segmentListRequest, setFilter } from '../redux/actions';
import { campaignsListRequest } from '../../Campaigns/redux/actions';

// @TODO implement filtered list
// @TODO implement targeted audiences

export class SegmentList extends Component {
  displayName: 'SegmentList'
  state = {
    tabIndex: 0
  }

  componentWillMount() {
    this.props.listSegments();
    this.props.listCampaigns();
  }

  props: {
    listSegments: Function,
    listCampaigns: Function,
    createNew: Function,
    setFilter: Function
  }

  handleTabChange = (tabIndex) => {
    this.setState({ tabIndex });
    switch (tabIndex) {
    case 0:
      this.props.setFilter({});
      break;
    case 1:
      this.props.setFilter({ active: true });
      break;
    case 2:
      this.props.setFilter({ favorite: true });
      break;
    default:
      break;
    }
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
  listCampaigns: () => dispatch(campaignsListRequest()),
  createNew: () => dispatch(push('/app/audience/new')),
  setFilter: (filter) => dispatch(setFilter(filter))
});

export default translate()(
  connect(mapStatesToProps, mapDispatchToProps)(SegmentList)
);
