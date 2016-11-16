import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-toolbox/lib/button';
import { push } from 'react-router-redux';
import { Tab, Tabs } from 'react-toolbox';
import { translate } from 'react-i18next';
import Table from 'react-toolbox/lib/table';

import { campaignsListRequest } from '../redux/actions';

const CampaignModel = {
  title: { type: String },
  message: { type: String },
  tags: { type: String },
  loopDelay: { type: Number },
  loopCount: { type: Number },
  isActive: { type: Boolean, title: 'Active' },
  created: {
    type: Date,
    title: 'Created'
  }
};

export class Campaigns extends Component {
  displayName: 'Campaigns'
  state = {
    tabIndex: 0,
    selected: [],
    source: []
  }
  componentWillMount() {
    this.props.loadCampaigns();
  }
  props: {
    campaigns: Array<any>,
    t: Function,
    start: Function,
    loadCampaigns: Function
  }

  handleTabIndexChange = (index) => {
    this.setState({ tabIndex: index });
  }

  handleActive = () => {
    // console.log('Special one activated');
  }

  render() {
    const { campaigns, t, start } = this.props;
    return (
      <div className="campaigns_list">
        <div className="page_header">
          <h2>
            { t('campaigns.list.heading') }
            <Button className="pull-right" onClick={ start } label={ t('campaigns.list.newCampaign') } raised primary />
          </h2>
        </div>
        <section>
          <Tabs index={ this.state.tabIndex } onChange={ this.handleTabIndexChange } fixed>
            <Tab label={ t('campaigns.list.inProgress') }>
              <Table
                model={ CampaignModel }
                selectable={ false }
                source={ campaigns }
              />
            </Tab>
            <Tab label={ t('campaigns.list.scheduled') }>
              <small>Scheduled Campaigns</small>
            </Tab>
            <Tab label={ t('campaigns.list.paused') }>
              <small>Paused Compaigns</small>
            </Tab>
            <Tab label={ t('campaigns.list.completed') }>
              <small>Completed Compaigns</small>
            </Tab>
            <Tab label={ t('campaigns.list.all') }>
              <small>All Compaigns</small>
            </Tab>
          </Tabs>
        </section>
      </div>
    );
  }
}

const mapStatesToProps = ({ campaign: { campaigns } }) => ({
  campaigns
});

const mapDispatchToProps = (dispatch) => ({
  loadCampaigns: () => dispatch(campaignsListRequest('5825cfd1d3932754c70fada7')),
  start: () => dispatch(push('/app/campaigns/start'))
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(Campaigns));
