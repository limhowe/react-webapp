import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-toolbox/lib/button';
import { push } from 'react-router-redux';
import { Tab, Tabs } from 'react-toolbox';
import { translate } from 'react-i18next';
import Table from 'react-toolbox/lib/table';

const CampaignModel = {
  animation: { type: String },
  name: { type: String },
  save_date: {
    type: Date,
    title: 'Save Date'
  },
  end_date: {
    type: Date,
    title: 'End Date'
  },
  audience: { type: Number },
  number: { type: Number },
  last_sent: {
    type: Date,
    title: 'Last Sent'
  }
};

const campaigns = [
  { name: '20% off Sony electronics', save_date: new Date(2016, 12, 10), end_date: new Date(2016, 12, 23), audience: '1.3K lapsed users', number: 1000, last_sent: new Date(2016, 12, 23, 12, 5, 29) },
  { name: 'Halloween Sale', save_date: new Date(2016, 11, 15), end_date: new Date(2016, 11, 30), audience: '2.1K lapsed users', number: 1000, last_sent: new Date(2016, 11, 8, 4, 15, 12) }
];

export class Campaigns extends Component {
  displayName: 'Campaigns';
  state = {
    tabIndex: 0,
    selected: [],
    source: campaigns
  };
  props: {
    t: Function,
    start: Function
  };

  handleTabIndexChange = (index) => {
    this.setState({ tabIndex: index });
  };

  handleActive = () => {
    console.log('Special one activated');
  };

  render() {
    const { t, start } = this.props;
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


const mapStatesToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  start: () => dispatch(push('/app/campaigns/start'))
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(Campaigns));
