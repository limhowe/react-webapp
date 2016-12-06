import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, IconButton } from 'react-toolbox/lib/button';
import { push } from 'react-router-redux';
import { Tab, Tabs } from 'react-toolbox';
import { translate } from 'react-i18next';
import Dialog from 'react-toolbox/lib/dialog';
import Tooltip from 'react-toolbox/lib/tooltip';

import styles from '../theme/styles.scss';

import { campaignsListRequest, campaignUpdateRequest, campaignDeleteRequest } from '../redux/actions';
const TooltipIconButton = new Tooltip(IconButton);

export class Campaigns extends Component {
  displayName: 'Campaigns'
  state = {
    tabIndex: 0,
    tableFilter: 'ACTIVE',
    selected: [],
    source: [],
    deleteConfirmToggle: false
  }
  componentWillMount() {
    this.props.loadCampaigns();
  }
  props: {
    campaigns: Array<any>,
    t: Function,
    start: Function,
    loadCampaigns: Function,
    updateCampaign: Function,
    deleteCampaign: Function,
    editCampaign: Function
  }

  handleTabIndexChange = (index) => {
    this.setState({ tabIndex: index });
    let tableFilter = 'ALL';
    if (index === 0) {
      tableFilter = 'ACTIVE';
    } else if (index === 1) {
      tableFilter = 'PAUSED';
    } else if (index === 2) {
      tableFilter = 'COMPLETED';
    } else if (index === 3) {
      tableFilter = 'DRAFT';
    }
    this.setState({ tableFilter });
  }

  getCampaigns = () => {
    return this.props.campaigns.filter((campaign) => {
      if (this.state.tableFilter !== 'ALL') {
        return campaign.status === this.state.tableFilter;
      }
      return true;
    });
  }

  pauseCampaign = (campaign) => {
    const payload = {
      isPaused: true
    };
    this.props.updateCampaign(campaign, payload).then(() => {
      this.props.loadCampaigns();
    });
  }

  resumeCampaign = (campaign) => {
    const payload = {
      isPaused: false
    };
    this.props.updateCampaign(campaign, payload).then(() => {
      this.props.loadCampaigns();
    });
  }

  deleteCampaign = () => {
    this.props.deleteCampaign(this.state.campaign).then(() => {
      this.props.loadCampaigns();
      this.setState({ deleteConfirmToggle: false });
    });
  }

  toggleDeleteConfirmDialog = (campaign) => {
    this.setState({ campaign });
    this.setState({ deleteConfirmToggle: !this.state.deleteConfirmToggle });
  }

  deleteCampaignDialogActions = [
    { label: 'Cancel', onClick: this.toggleDeleteConfirmDialog },
    { label: 'Delete', onClick: this.deleteCampaign }
  ];

  render() {
    const { t, start, editCampaign } = this.props;
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
            <Tab label={ t('campaigns.list.paused') } />
            <Tab label={ t('campaigns.list.completed') } />
            <Tab label={ t('campaigns.list.draft') } />
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
                          <img className="animation-preview"  src={ campaign.animation.url } />
                        ) : null
                      }
                    </td>
                    <td>{ campaign.title }</td>
                    <td>{ campaign.message }</td>
                    <td>{ campaign.tags.join(', ') }</td>
                    <td>{ campaign.created }</td>
                    <td className="text-right actions">
                      {
                        campaign.status === 'ACTIVE' || campaign.status === 'COMPLETED' ? (
                          <TooltipIconButton icon="remove_red_eye" primary tooltip={ t('campaigns.list.actions.results') } />
                        ) : null
                      }
                      {
                        campaign.status === 'DRAFT' ? (
                          <TooltipIconButton icon="mode_edit" onClick={ () => editCampaign(campaign._id) } primary tooltip={ t('campaigns.list.actions.edit') } />
                        ) : null
                      }
                      {
                        campaign.status === 'PAUSED' ? (
                          <TooltipIconButton icon="play_arrow" onClick={ this.resumeCampaign.bind(this, campaign) } primary tooltip={ t('campaigns.list.actions.resume') } />
                        ) : null
                      }
                      {
                        campaign.status === 'ACTIVE' ? (
                          <TooltipIconButton icon="pause" onClick={ this.pauseCampaign.bind(this, campaign) } primary tooltip={ t('campaigns.list.actions.pause') } />
                        ) : null
                      }
                      <TooltipIconButton icon="delete" onClick={ this.toggleDeleteConfirmDialog.bind(this, campaign) } primary tooltip={ t('campaigns.list.actions.delete') } />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <Dialog
            actions={ this.deleteCampaignDialogActions }
            active={ this.state.deleteConfirmToggle }
            onEscKeyDown={ this.toggleDeleteConfirmDialog }
            onOverlayClick={ this.toggleDeleteConfirmDialog }
            title={ t('campaigns.deleteDialog.title') }
          >
            <p>{ t('campaigns.deleteDialog.question') }</p>
          </Dialog>
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
  start: () => dispatch(push('/app/campaigns/start')),
  updateCampaign: (campaign, payload) => dispatch(campaignUpdateRequest(campaign._id, payload)),
  deleteCampaign: (campaign) => dispatch(campaignDeleteRequest(campaign._id)),
  editCampaign: (id) => dispatch(push(`/app/campaigns/${ id }`))
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(Campaigns));
