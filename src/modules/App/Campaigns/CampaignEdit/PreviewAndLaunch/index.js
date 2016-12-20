import React, { Component } from 'react';
import { Button, List, ListItem } from 'react-toolbox/lib';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';
import { push } from 'react-router-redux';

import { changeTabIndex, editCampaignField, saveCampaignRequest } from '../../redux/actions';
import { showNotification } from '../../../../Layout/redux/actions';

export class PreviewAndLaunch extends Component {
  displayName: 'PreviewAndLaunch'
  props: {
    t: Function,
    campaign: Object,
    changeTab: Function,
    gotoList: Function,
    editCampaignField: Function,
    saveCampaign: Function,
    showNotification: Function,
    currentSegment: Object
  }

  launch = () => {
    this.props.editCampaignField('isActive', true);
    this.props.editCampaignField('isPaused', false);
    this.props.saveCampaign(this.props.campaign).then(() => {
      this.props.showNotification('success', `Great, the campaign [${ this.props.campaign.title }] is just launched.`);
      this.props.gotoList();
    });
  }

  render() {
    const { t, changeTab, gotoList, campaign, currentSegment } = this.props;
    const animationClasses = classNames('animation-preview', 'on-mobile', {
      top: campaign.messagePosition === 'top',
      center: campaign.messagePosition === 'center',
      bottom: campaign.messagePosition === 'bottom'
    });

    let schedule = 'No Schedule';
    if (campaign.deliverySchedule) {
      if (campaign.deliverySchedule.frequency === 'immediate') {
        schedule = `${ campaign.deliverySchedule.frequency }`;
      } else {
        const utcOffset = moment().utcOffset();
        schedule = `${ campaign.deliverySchedule.frequency } - ${  campaign.deliverySchedule.repeat } - ${ moment(campaign.deliverySchedule.sendDate).subtract(utcOffset, 'minute').format('HH:mm') }`;
      }
    }

    const campaignType = t(`campaigns.campaignTypes.${ campaign.campaignType }`);

    return (
      <div>
        <h3 className="tab-heading">{ t('campaigns.create.previewAndLaunch.heading') }</h3>
        <div><small className="text-muted">{ t('campaigns.create.previewAndLaunch.subtitle') }</small></div>
        <div className="row">
          <div className="col-md-6">
            <List selectable ripple>
              <ListItem
                rightIcon="mode_edit"
                caption={ t('campaigns.create.previewAndLaunch.campaignName') }
                legend={ campaign.title }
                onClick={ () => changeTab(0) }
              />
              <ListItem
                rightIcon="mode_edit"
                caption={ t('campaigns.create.previewAndLaunch.tags') }
                legend={ campaign.tags.join(', ') }
                onClick={ () => changeTab(0) }
              />
              <ListItem
                rightIcon="mode_edit"
                caption={ t('campaigns.create.previewAndLaunch.action') }
                legend={ `${ campaignType } - ${ campaign.url }` }
                onClick={ () => changeTab(2) }
              />
              <ListItem
                rightIcon="mode_edit"
                caption={ t('campaigns.create.previewAndLaunch.delivery') }
                legend={ schedule }
                onClick={ () => changeTab(3) }
              />
              <ListItem
                rightIcon="mode_edit"
                caption={ t('campaigns.create.previewAndLaunch.audience') }
                legend={ currentSegment && currentSegment.name ? currentSegment.name : 'All' }
                onClick={ () => changeTab(4) }
              />
            </List>
            <div className="form-buttons">
              <Button onClick={ gotoList } label={ t('campaigns.create.previewAndLaunch.saveAsDraft') } raised accent />
              <Button onClick={ this.launch.bind(this) } label={ t('campaigns.create.previewAndLaunch.launchNow') } raised primary />
            </div>
          </div>
          <div className="col-md-6">
            <h4 className="text-center">{ t('campaigns.create.createPush.mobilePreview') }</h4>
            <div className="mobile-preview">
              {
                campaign.animation ? (
                  <img className={ animationClasses } src={ campaign.animation.url } />
                ) : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = ({ campaign: { campaign }, segments: { currentSegment } }) => ({ campaign, currentSegment });

const mapDispatchToProps = (dispatch) => ({
  changeTab: (index) => dispatch(changeTabIndex(index)),
  editCampaignField: (field, value) => dispatch(editCampaignField(field, value)),
  saveCampaign: () => dispatch(saveCampaignRequest()),
  showNotification: (...args) => dispatch(showNotification(...args)),
  gotoList: () => dispatch(push('/app/campaigns'))
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(PreviewAndLaunch));
