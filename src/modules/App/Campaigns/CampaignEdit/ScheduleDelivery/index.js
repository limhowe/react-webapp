import React, { Component } from 'react';
import { Button, Checkbox, DatePicker, Dropdown, Switch, TimePicker } from 'react-toolbox/lib';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';

import { changeTabIndex, editCampaignField, editCampaignScheduleField, editCampaignDeliveryActionField, campaignScheduleRequest, saveCampaignRequest } from '../../redux/actions';

export class ScheduleDelivery extends Component {
  displayName: 'ScheduleDelivery'
  state = {
  }
  componentWillMount() {
    const { expiresAt, deliverySchedule } = this.props.campaign;
    if (deliverySchedule && deliverySchedule.frequency) {
      this.setState({ toggleDeliverySchedule: true });
      if (deliverySchedule.frequency === 'scheduled') {
        this.setState({
          scheduleDate: new Date(deliverySchedule.sendDate),
          scheduleTime: new Date(deliverySchedule.sendDate)
        });
      }
    } else {
      this.setState({ toggleDeliverySchedule: false });
    }
    if (expiresAt) {
      this.setState({
        expirationDate: new Date(expiresAt),
        expirationTime: new Date(expiresAt)
      });
    }
    this.setState({ toggleDeliveryAction: false });
  }
  props: {
    t: Function,
    campaign: Object,
    changeTab: Function,
    editCampaignField: Function,
    editScheduleField: Function,
    editDeliveryActionField: Function,
    schedule: Function,
    cancelSchedule: Function,
    saveCampaign: Function
  }

  sendDPScheduleOptions = [
    { value: 'immediate', text: 'Immediately' },
    { value: 'scheduled', text: 'At a Designated Time' }
  ];

  sendDPRepeatOptions = [
    { value: 'daily', text: 'Daily' },
    { value: 'weekly', text: 'Weekly' },
    { value: 'monthly', text: 'Monthly' }
  ];

  triggerEventOptions = [
    { value: 1, text: 'Inactivity' }
  ];

  appInactiveDaysOptions = [
    { value: 1, text: '1 day' },
    { value: 2, text: '2 days' },
    { value: 3, text: '3 days' },
    { value: 4, text: '4 days' },
    { value: 5, text: '5 days' },
    { value: 6, text: '6 days' },
    { value: 7, text: '7 days' },
    { value: 10, text: '10 days' },
    { value: 15, text: '15 days' }
  ];

  numberDPsOptions = [
    { value: 1, text: '1 DP' },
    { value: 2, text: '2 DPs' },
    { value: 3, text: '3 DPs' }
  ];

  daysOptions = [
    { value: 1, text: '1 day' },
    { value: 2, text: '2 days' },
    { value: 3, text: '3 days' },
    { value: 4, text: '4 days' },
    { value: 5, text: '5 days' }
  ];

  editField = (field) => (...args) => this.props.editCampaignField(field, ...args);
  editScheduleField = (field) => (...args) => this.props.editScheduleField(field, ...args);
  editDeliveryActionField = (field) => (...args) => this.props.editDeliveryActionField(field, ...args);

  handleChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  toggleDeliverySchedule = () => {
    this.setState({ toggleDeliverySchedule: !this.state.toggleDeliverySchedule });
    if (this.state.toggleDeliverySchedule) {
      this.props.editCampaignField('deliverySchedule', null);
    } else {
      this.props.editCampaignField('deliverySchedule', {
        frequency: 'immediate',
        timeZone: 'America/New_York',
        status: 'ready',
        repeat: 'once'
      });
    }
    // this.toggleDeliveryAction();
  }

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
    if (this.props.campaign.deliverySchedule && this.props.campaign.deliverySchedule.frequency) {
      const { deliverySchedule } = this.props.campaign;
      const payload = {};
      if (deliverySchedule.frequency === 'immediate') {
        deliverySchedule.repeat = 'once';

        // Set expiresAt to tomorrow
        const expiresDate = new Date();
        expiresDate.setDate(expiresDate.getDate() + 1);
        payload.expiresAt = expiresDate.toISOString();
      } else {
        const sendDate = this.state.scheduleDate;
        const sendTime = this.state.scheduleTime;
        const scheduleDateTime = new Date(Date.UTC(sendDate.getFullYear(), sendDate.getMonth(), sendDate.getDate(), sendTime.getHours(), sendTime.getMinutes())).toISOString();
        deliverySchedule.sendDate = scheduleDateTime;

        const expiresDate = this.state.expirationDate;
        const expiresTime = this.state.expirationTime;
        const expiresAt = new Date(Date.UTC(expiresDate.getFullYear(), expiresDate.getMonth(), expiresDate.getDate(), expiresTime.getHours(), expiresTime.getMinutes())).toISOString();
        this.props.editCampaignField('expiresAt', expiresAt);
      }

      this.props.schedule(this.props.campaign, deliverySchedule).then(() => {
        this.props.saveCampaign(this.props.campaign);
      });
    } else {
      this.props.cancelSchedule(this.props.campaign);
    }
  }

  dropDownItemTemplate(item) {
    return (
      <div>
        <strong>{ item.value }</strong>
      </div>
    );
  }

  dropDownItemTextTemplate(item) {
    return (
      <div>
        <strong>{ item.text }</strong>
      </div>
    );
  }

  render() {
    const min_datetime = new Date();
    const { t, changeTab, campaign } = this.props;
    return (
      <div>
        <h3 className="tab-heading">{ t('campaigns.create.scheduleDelivery.heading') }</h3>
        <div><small className="text-muted">{ t('campaigns.create.scheduleDelivery.subtitle') }</small></div>
        <div className="row">
          <div className="col-md-5">
            <div className="panel">
              <Switch
                checked={ this.state.toggleDeliverySchedule }
                label={ t('campaigns.create.scheduleDelivery.schedule.heading') }
                onChange={ this.toggleDeliverySchedule.bind(this) }
              />
              <small className="text-muted">{ t('campaigns.create.scheduleDelivery.schedule.subtitle') }</small>
              {
                this.state.toggleDeliverySchedule ? (
                  <div className="margin-t-40">
                    <Dropdown
                      allowBlank={ false }
                      source={ this.sendDPScheduleOptions }
                      onChange={ this.editScheduleField('frequency') }
                      label={ t('campaigns.create.scheduleDelivery.schedule.send') }
                      template={ this.dropDownItemTextTemplate }
                      value={ campaign.deliverySchedule.frequency }
                    />
                    {
                      campaign.deliverySchedule.frequency === 'immediate' ? (
                        <div>
                          {/* <Checkbox
                            checked={ this.state.useDeviceTime1 }
                            label={ t('campaigns.create.scheduleDelivery.schedule.useDeviceTime') }
                            onChange={ this.handleChange.bind(this, 'useDeviceTime1') }
                          /> */}
                        </div>
                      ) : (
                      <div>
                        <Dropdown
                          allowBlank={ false }
                          source={ this.sendDPRepeatOptions }
                          onChange={ this.editScheduleField('repeat') }
                          label={ t('campaigns.create.scheduleDelivery.schedule.repeat') }
                          template={ this.dropDownItemTextTemplate }
                          value={ campaign.deliverySchedule.repeat }
                        />
                        <div className="row">
                          <div className="col-lg-6">
                            <DatePicker
                              label={ t('shared.date') }
                              minDate={ min_datetime }
                              onChange={ this.handleChange.bind(this, 'scheduleDate') }
                              value={ this.state.scheduleDate }
                              sundayFirstDayOfWeek
                            />
                          </div>
                          <div className="col-lg-6">
                            <TimePicker
                              label={ t('shared.time') }
                              onChange={ this.handleChange.bind(this, 'scheduleTime') }
                              value={ this.state.scheduleTime }
                            />
                          </div>
                        </div>
                        <Checkbox
                          checked={ this.state.useDeviceTime2 }
                          label={ t('campaigns.create.scheduleDelivery.schedule.useDeviceTime') }
                          onChange={ this.handleChange.bind(this, 'useDeviceTime2') }
                        />
                        <h4 className="margin-t-40">{ t('campaigns.create.scheduleDelivery.schedule.expirationNote') }</h4>
                        <div className="row">
                          <div className="col-lg-6">
                            <DatePicker
                              label={ t('campaigns.create.scheduleDelivery.schedule.expirationDate') }
                              minDate={ min_datetime }
                              onChange={ this.handleChange.bind(this, 'expirationDate') }
                              value={ this.state.expirationDate }
                              sundayFirstDayOfWeek
                            />
                          </div>
                          <div className="col-lg-6">
                            <TimePicker
                              label={ t('campaigns.create.scheduleDelivery.schedule.expirationTime') }
                              onChange={ this.handleChange.bind(this, 'expirationTime') }
                              value={ this.state.expirationTime }
                            />
                          </div>
                        </div>
                      </div>
                      )
                    }
                  </div>
                ) : null
              }
            </div>
          </div>
          <div className="col-md-5">
            <div className="panel">
              <Switch
                checked={ this.state.toggleDeliveryAction }
                label={ t('campaigns.create.scheduleDelivery.action.heading') }
                onChange={ this.toggleDeliverySchedule.bind(this) }
                disabled
              />
              <small className="text-muted">{ t('campaigns.create.scheduleDelivery.action.subtitle') }</small>
              {
                this.state.toggleDeliveryAction ? (
                  <div className="margin-t-40">
                    {/* <Dropdown
                      allowBlank={ false }
                      source={ this.triggerEventOptions }
                      onChange={ this.handleChange.bind(this, 'triggerEvent') }
                      label={ t('campaigns.create.scheduleDelivery.action.selectEvent') }
                      template={ this.dropDownItemTextTemplate }
                      value={ this.state.triggerEvent }
                    /> */}
                    {/* {
                      this.state.triggerEvent === 1 ? (
                    <div> */}
                    <Dropdown
                      allowBlank={ false }
                      source={ this.appInactiveDaysOptions }
                      onChange={ this.editDeliveryActionField('inactiveDays') }
                      label={ t('campaigns.create.scheduleDelivery.action.idleDays') }
                      template={ this.dropDownItemTextTemplate }
                      value={ campaign.deliveryAction.inactiveDays }
                    />
                    <div className="row">
                      <div className="col-md-6">
                        <Dropdown
                          allowBlank={ false }
                          source={ this.numberDPsOptions }
                          onChange={ this.editDeliveryActionField('dpLimit') }
                          label={ t('campaigns.create.scheduleDelivery.action.sendLimit') }
                          template={ this.dropDownItemTextTemplate }
                          value={ campaign.deliveryAction.dpLimit }
                        />
                      </div>
                      <div className="col-md-6">
                        <Dropdown
                          allowBlank={ false }
                          source={ this.daysOptions }
                          onChange={ this.editDeliveryActionField('dayLimit') }
                          label={ t('campaigns.create.scheduleDelivery.action.withIn') }
                          template={ this.dropDownItemTextTemplate }
                          value={ campaign.deliveryAction.dayLimit }
                        />
                      </div>
                    </div>
                    {/* </div>
                      // ) : null
                    } */}
                  </div>
                ) : null
              }
            </div>
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

const mapStatesToProps = ({ campaign: { campaign } }) => ({ campaign });

const mapDispatchToProps = (dispatch) => ({
  changeTab: (index) => dispatch(changeTabIndex(index)),
  editCampaignField: (field, value) => dispatch(editCampaignField(field, value)),
  editScheduleField: (field, value) => dispatch(editCampaignScheduleField(field, value)),
  editDeliveryActionField: (field, value) => dispatch(editCampaignDeliveryActionField(field, value)),
  schedule: (campaign, payload) => dispatch(campaignScheduleRequest(campaign._id, payload)),
  cancelSchedule: (campaign) => dispatch(campaignScheduleRequest(campaign._id)),
  saveCampaign: () => dispatch(saveCampaignRequest())
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(ScheduleDelivery));
