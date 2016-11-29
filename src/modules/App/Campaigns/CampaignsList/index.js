import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, IconButton } from 'react-toolbox/lib/button';
import { push } from 'react-router-redux';
import { Tab, Tabs } from 'react-toolbox';
import Tooltip from 'react-toolbox/lib/tooltip';
import { translate } from 'react-i18next';
import styles from './styles.scss';

import { campaignsListRequest } from '../redux/actions';
const TooltipIconButton = Tooltip(IconButton);
/*
const CampaignModel = {
  title: { type: String },
  animation: {
    url: { type: String }
  },
  message: { type: String },
  tags: { type: String },
  loopDelay: { type: Number },
  loopCount: { type: Number },
  created: {
    type: Date,
    title: 'Created'
  }
};
*/

export class Campaigns extends Component {
  displayName: 'Campaigns'
  state = {
    tabIndex: 0,
    tableFilter: 'inProgress',
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
    let tableFilter = 'all';
    if (index === 0) {
      tableFilter = 'inProgress';
    } else if (index === 1) {
      tableFilter = 'scheduled';
    } else if (index === 2) {
      tableFilter = 'paused';
    } else if (index === 3) {
      tableFilter = 'completed';
    }
    this.setState({ tableFilter });
  }

  handleActive = () => {
    // console.log('Special one activated');
  }

  getCampaigns = () => {
    return this.props.campaigns.filter((campaign) => {
      if (this.state.tableFilter === 'inProgress') {
        return !campaign.isPaused;
      } else if (this.state.tableFilter === 'scheduled') {
        return campaign.deliverySchedule;
      } else if (this.state.tableFilter === 'paused') {
        return campaign.isPaused;
      } else if (this.state.tableFilter === 'completed') {
        return campaign.isComplete;
      }
      return true;
    });
  }

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
          <Tabs
            index={ this.state.tabIndex }
            onChange={ this.handleTabIndexChange }
            theme={ styles }
            fixed
          >
            <Tab label={ t('campaigns.list.inProgress') } />
            <Tab label={ t('campaigns.list.scheduled') } />
            <Tab label={ t('campaigns.list.paused') } />
            <Tab label={ t('campaigns.list.completed') } />
            <Tab label={ t('campaigns.list.all') } />
          </Tabs>
          <p>Total { this.getCampaigns().length } campaigns </p>
          {/* <Table
            model={ CampaignModel }
            selectable={ false }
            source={ this.getCampaigns() }
          /> */}
        </section>
        <section>
          <table className="table table-campaigns">
            <thead>
              <tr>
                <th>Animation</th>
                <th>Title</th>
                <th>Message</th>
                <th>Tags</th>
                <th>Created</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {
                this.getCampaigns().map((campaign, index) => (
                  <tr key={ index } >
                    <td>
                      {
                        campaign.animation ? (
                          <img className="img-preview"  src={ campaign.animation.url } />
                        ) : null
                      }
                    </td>
                    <td>{ campaign.title }</td>
                    <td>{ campaign.message }</td>
                    <td>{ campaign.tags }</td>
                    <td>{ campaign.created }</td>
                    <td className="text-right">
                      {
                        campaign.isActive ? (
                          <TooltipIconButton icon="remove_red_eye" floating primary tooltip={ t('campaigns.list.actions.results') } />
                        ) : null
                      }
                      {
                        !campaign.isActive ? (
                          <TooltipIconButton icon="mode_edit" floating primary tooltip={ t('campaigns.list.actions.edit') } />
                        ) : null
                      }
                      {
                        campaign.isPaused ?
                        (
                          <TooltipIconButton icon="play_arrow" floating primary tooltip={ t('campaigns.list.actions.resume') } />
                        ) :
                        (
                        <TooltipIconButton icon="pause" floating primary tooltip={ t('campaigns.list.actions.pause') } />
                        )
                      }
                      <TooltipIconButton icon="delete" floating primary tooltip={ t('campaigns.list.actions.delete') } />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

const mapStatesToProps = ({ campaign: { campaigns } }) => ({
  campaigns
});

const mapDispatchToProps = (dispatch) => ({
  loadCampaigns: () => dispatch(campaignsListRequest()),
  start: () => dispatch(push('/app/campaigns/start'))
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(Campaigns));
