import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProgressBar, IconButton, Tooltip } from 'react-toolbox';
import moment from 'moment';
import styles from './styles/CampaignProgress.scss';

import { campaignUpdateRequest } from '../../Campaigns/redux/actions';

const TooltipIconButton = new Tooltip(IconButton);

export class CampaignProgress extends Component {
  displayName: 'CampaignProgress';
  state = { isPaused: false }
  props: {
    campaign: Object,
    updateCampaign: Function
  }

  pauseCampaign = () => {
    const payload = {
      isPaused: true
    };
    this.props.updateCampaign(this.props.campaign, payload).then(() => {
      this.setState({ isPaused: true });
    });
  }

  resumeCampaign = () => {
    const payload = {
      isPaused: false
    };
    this.props.updateCampaign(this.props.campaign, payload).then(() => {
      this.setState({ isPaused: false });
    });
  }

  render() {
    const { campaign } = this.props;
    const total = Math.max(moment(campaign.expiresAt).diff(campaign.created), 0);
    const progress = moment(campaign.expiresAt).diff(moment());

    return (
      <div className={ styles.campaignProgress }>
        <div className={ styles.progressBar }>
          <small>{ campaign.title }</small>
          <ProgressBar mode="determinate" value={ progress } min={ 0 } max={ total } />
        </div>
        <div className={ styles.actions }>
          {/* <TooltipIconButton icon="remove_red_eye" primary tooltip="Preview Campaign Result" disabled /> */}
          {/* <TooltipIconButton icon="mode_edit" primary tooltip="Edit Campaign" disabled /> */}
          { !this.state.isPaused ? <TooltipIconButton icon="pause" primary tooltip="Pause Campaign" onClick={ this.pauseCampaign } /> : null }
          { this.state.isPaused ? <TooltipIconButton icon="play_arrow" primary tooltip="Resume Campaign" onClick={ this.resumeCampaign } /> : null }
        </div>
      </div>
    );
  }
}


const mapStatesToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  updateCampaign: (campaign, payload) => dispatch(campaignUpdateRequest(campaign._id, payload))
});

export default connect(mapStatesToProps, mapDispatchToProps)(CampaignProgress);
