import React, { Component } from 'react';
import { Button } from 'react-toolbox';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';

import { changeTabIndex, editCampaignField, editCampaignDeliveryActionField, campaignScheduleRequest, saveCampaignRequest } from '../../redux/actions';
import { showNotification } from '../../../../Layout/redux/actions';
import ScheduleCampaign from './ScheduleCampaign';
import ActionTrigger from './ActionTrigger';

export class ScheduleDelivery extends Component {
  displayName: 'ScheduleDelivery'
  props: {
    t: Function,
    campaign: Object,
    campaignSchedule: Object,
    changeTab: Function,
    editCampaignField: Function,
    editDeliveryActionField: Function,
    schedule: Function,
    cancelSchedule: Function,
    saveCampaign: Function,
    showNotification: Function
  }

  editField = (field) => (...args) => this.props.editCampaignField(field, ...args);
  editDeliveryActionField = (field) => (...args) => this.props.editDeliveryActionField(field, ...args);

  toggleDeliveryAction = () => {
    this.setState({ toggleDeliveryAction: !this.state.toggleDeliveryAction });
    if (this.state.toggleDeliveryAction) {
      this.props.editCampaignField('deliveryAction', {});
    } else {
      this.props.editCampaignField('deliveryAction', {
        dayLimit: 1,
        dpLimit: 2,
        inactiveDays: 1
      });
    }
  }

  scheduleDelivery = () => {
    const { campaignSchedule, campaign } = this.props;
    if (campaignSchedule.type === 'schedule') {
      this.props.schedule(campaign, campaignSchedule.schedule).then(() => {
        this.props.saveCampaign(campaign);
      });
    } else {
      this.props.cancelSchedule(campaign);
    }
  }

  render() {
    const { t, changeTab } = this.props;
    return (
      <div>
        <h3 className="tab-heading">{ t('campaigns.create.scheduleDelivery.heading') }</h3>
        <div><small className="text-muted">{ t('campaigns.create.scheduleDelivery.subtitle') }</small></div>
        <div className="row">
          <div className="col-md-5">
            <ScheduleCampaign />
          </div>
          <div className="col-md-5">
            <ActionTrigger />
          </div>
        </div>
        <div className="form-buttons">
          <Button icon="chevron_left" onClick={ () => changeTab(2) } label={ t('campaigns.create.scheduleDelivery.back') } raised />
          <Button onClick={ () => this.scheduleDelivery() } label={ t('campaigns.create.scheduleDelivery.next') } raised primary />
        </div>
      </div>
    );
  }
}

const mapStatesToProps = ({ campaign: { campaign, campaignSchedule } }) => ({ campaign, campaignSchedule });

const mapDispatchToProps = (dispatch) => ({
  changeTab: (index) => dispatch(changeTabIndex(index)),
  editCampaignField: (field, value) => dispatch(editCampaignField(field, value)),
  editDeliveryActionField: (field, value) => dispatch(editCampaignDeliveryActionField(field, value)),
  schedule: (campaign, payload) => dispatch(campaignScheduleRequest(campaign._id, payload)),
  cancelSchedule: (campaign) => dispatch(campaignScheduleRequest(campaign._id)),
  saveCampaign: () => dispatch(saveCampaignRequest()),
  showNotification: (...args) => dispatch(showNotification(...args))
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(ScheduleDelivery));
