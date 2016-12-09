import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import DashboardPanel from './components/DashboardPanel';
import StatNumber from './components/StatNumber';
import CampaignPanel from './CampaignPanel';
import BubbleChart from './BubbleChart';
import DPResponseChart from './DPResponseChart';
import UserChart from './UserChart';

import { campaignsListRequest } from '../Campaigns/redux/actions';
import { getEventAnalytics } from './redux/actions';

export class Dashboard extends Component {
  displayName: 'Dashboard';

  componentWillMount() {
    this.props.loadCampaigns();
    this.props.getEventAnalytics('totalDP', {
      eventTarget: 'notification',
      eventType: 'receive',
      groupBy: 'total'
    });
    this.props.getEventAnalytics('dpClick', {
      eventTarget: 'notification',
      eventType: 'click',
      groupBy: 'total'
    });
  }

  props: {
    loadCampaigns: Function,
    getEventAnalytics: Function,
    campaignsLoading: bool,
    totalDP: number,
    dpClick: number,
    campaigns: Array<Object>
  }

  render() {
    const { campaigns, totalDP, dpClick } = this.props;
    const campaignCounts = _.countBy(campaigns, 'status');
    return (
      <section className="c-container__large">
        <div className="row u-margin-bottom-md">
          <div className="col-sm-6 col-md-3">
            <DashboardPanel>
              <StatNumber color="blue" value={ campaignCounts.ACTIVE } label="Active DP Campaigns" />
            </DashboardPanel>
          </div>
          <div className="col-sm-6 col-md-3">
            <DashboardPanel>
              <StatNumber color="cyan" value={ totalDP } label="Total DPs Sent" />
            </DashboardPanel>
          </div>
          <div className="col-sm-6 col-md-3">
            <DashboardPanel>
              <StatNumber color="green" value={ dpClick * 100 / (totalDP || dpClick || 1) } label="Tap Through Rate" suffix="%" decimals={ 1 } />
            </DashboardPanel>
          </div>
          <div className="col-sm-6 col-md-3">
            <DashboardPanel>
              <StatNumber color="yellow" value={ 0 } label="Conversion Rate" suffix="%" decimals={ 1 } />
            </DashboardPanel>
          </div>
        </div>
        <div className="row u-margin-bottom-md">
          <div className="col-md-6">
            <DashboardPanel>
              <CampaignPanel />
            </DashboardPanel>
          </div>
          <div className="col-md-6">
            <DashboardPanel>
              <BubbleChart />
            </DashboardPanel>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <DashboardPanel>
              <DPResponseChart />
            </DashboardPanel>
          </div>
          <div className="col-md-6">
            <DashboardPanel>
              <UserChart />
            </DashboardPanel>
          </div>
        </div>
      </section>
    );
  }
}

const mapStatesToProps = ({ campaign: { campaigns, listLoading }, dashboard: { dpData } }) => ({
  campaigns,
  totalDP: dpData.totalDP.length ? dpData.totalDP[0].count : 0,
  dpClick: dpData.dpClick.length ? dpData.dpClick[0].count : 0,
  campaignsLoading: listLoading
});

const mapDispatchToProps = (dispatch) => ({
  loadCampaigns: () => dispatch(campaignsListRequest()),
  getEventAnalytics: (...args) => dispatch(getEventAnalytics(...args))
});

export default connect(mapStatesToProps, mapDispatchToProps)(Dashboard);
