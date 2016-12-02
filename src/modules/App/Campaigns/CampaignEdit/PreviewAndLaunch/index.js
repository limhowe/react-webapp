import React, { Component } from 'react';
import { Button, List, ListItem } from 'react-toolbox/lib';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import classNames from 'classnames';

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
    showNotification: Function
  }

  campaignTypes = {
    'in-app-message': 'Display In App Message',
    'deep-link': 'Link to the Page Inside the app',
    'url': 'Link to URL'
  };

  launch = () => {
    this.props.editCampaignField('isActive', true);
    this.props.editCampaignField('isPaused', false);
    this.props.saveCampaign(this.props.campaign).then(() => {
      this.props.showNotification('success', `Great, the campaign [${ this.props.campaign.title }] is just launched.`);
      this.props.gotoList();
    });
  }

  render() {
    const { t, changeTab, gotoList, campaign } = this.props;
    const animationClasses = classNames('animation-preview', 'on-mobile', {
      top: campaign.messagePosition === 'top',
      center: campaign.messagePosition === 'center',
      bottom: campaign.messagePosition === 'bottom'
    });

    return (
      <div>
        <h3 className="tab-heading">{ t('campaigns.create.selectAudience.heading') }</h3>
        <div><small className="text-muted">{ t('campaigns.create.selectAudience.subtitle') }</small></div>
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
                legend={ this.campaignTypes[campaign.campaignType] }
                onClick={ () => changeTab(2) }
              />
              <ListItem
                rightIcon="mode_edit"
                caption={ t('campaigns.create.previewAndLaunch.delivery') }
                legend={ campaign.deliverySchedule ? campaign.deliverySchedule.repeat : 'No Schedule' }
                onClick={ () => changeTab(3) }
              />
              <ListItem
                rightIcon="mode_edit"
                caption={ t('campaigns.create.previewAndLaunch.audience') }
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

const mapStatesToProps = ({ campaign: { campaign } }) => ({ campaign });

const mapDispatchToProps = (dispatch) => ({
  changeTab: (index) => dispatch(changeTabIndex(index)),
  editCampaignField: (field, value) => dispatch(editCampaignField(field, value)),
  saveCampaign: () => dispatch(saveCampaignRequest()),
  showNotification: (...args) => dispatch(showNotification(...args)),
  gotoList: () => dispatch(push('/app/campaigns'))
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(PreviewAndLaunch));
