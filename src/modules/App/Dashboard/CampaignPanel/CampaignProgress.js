import React, { Component } from 'react';
import { ProgressBar, IconButton, Tooltip } from 'react-toolbox';
import moment from 'moment';
import styles from './styles/CampaignProgress.scss';

const TooltipIconButton = new Tooltip(IconButton);

export class CampaignProgress extends Component {
  displayName: 'CampaignProgress';
  props: {
    campaign: Object
  }

  render() {
    const { campaign } = this.props;
    const total = moment(campaign.expiresAt).diff(campaign.created);
    const progress = moment(campaign.expiresAt).diff(moment());

    return (
      <div className={ styles.campaignProgress }>
        <div className={ styles.progressBar }>
          <small>{ campaign.title }</small>
          <ProgressBar mode="determinate" value={ progress } min={ 0 } max={ total } />
        </div>
        <div className={ styles.actions }>
          <TooltipIconButton icon="remove_red_eye" primary tooltip="Preview Campaign Result" disabled />
          <TooltipIconButton icon="mode_edit" primary tooltip="Edit Campaign" disabled />
          <TooltipIconButton icon="pause" primary tooltip="Pause Campaign" disabled />
        </div>
      </div>
    );
  }
}

export default CampaignProgress;
