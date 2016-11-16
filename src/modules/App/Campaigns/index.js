import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-toolbox/lib/button';
import { push } from 'react-router-redux';
import { Tab, Tabs } from 'react-toolbox';
import { translate } from 'react-i18next';
import Table from 'react-toolbox/lib/table';

import { campaignsListRequest } from './redux/actions';
import CampaignService from '../../../api-services/CampaignService';

const CampaignModel = {
  _id: { type: String },
  title: { type: String },
  message: { type: String },
  tags: { type: String },
  loopDelay: { type: Number },
  loopCount: { type: Number },
  isActive: { type: Boolean, title: 'Active' },
  created: {
    type: Date,
    title: 'Created'
  },
};

export class Campaigns extends Component {
  displayName: 'Campaigns';
  state = {
    tabIndex: 0,
    selected: [],
    source: []
  };
  props: {
    t: Function,
    start: Function,
    load: Function
  };

  componentWillMount() {
    this.loadCampaigns();
  }

  loadCampaigns = () => {
    const campaignService = new CampaignService(this.props.dispatch, () => this.props.state );
    campaignService.list('5825cfd1d3932754c70fada7', {
    }).then((response) => {
      this.setState({ source: response });
    });
  };

  handleTabIndexChange = (index) => {
    this.setState({ tabIndex: index });
    this.loadCampaigns();
  };

  handleActive = () => {
    console.log('Special one activated');
  };

  render() {
    const { t, start, load } = this.props;
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
                source={ this.state.source }
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


const mapStatesToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => ({
  start: () => {
    dispatch(push('/app/campaigns/start'))
  },
  dispatch
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(Campaigns));
