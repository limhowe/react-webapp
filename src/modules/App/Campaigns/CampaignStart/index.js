import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-toolbox/lib/list';
import { Tab, Tabs } from 'react-toolbox';
import { translate } from 'react-i18next';
import Checkbox from 'react-toolbox/lib/checkbox';
import Chip from 'react-toolbox/lib/chip';
import DatePicker from 'react-toolbox/lib/date_picker';
import Dropdown from 'react-toolbox/lib/dropdown';
import Dropzone from 'react-dropzone';
import Input from 'react-toolbox/lib/input';
import Switch from 'react-toolbox/lib/switch';
import TimePicker from 'react-toolbox/lib/time_picker';

import { push } from 'react-router-redux';
import { showNotification } from '../../../Layout/redux/actions';
import { campaignCreateRequest, campaignUpdateRequest, campaignScheduleRequest } from '../redux/actions';

export class CampaignStart extends Component {
  displayName: 'New Campaign';
  state = {
    tabIndex: 0,
    title: '',
    chip1: true,
    chip2: true,
    chip3: true,
    checkAndroid: true,
    checkIOS: false,
    message: '',
    messagePosition: 'center',
    appAction: 'url',
    actionLink: '',
    toggleSetDuration: false,
    toggleAddPushNotification: false,
    deliveryScheduleSwitch: true,
    deliveryActionSwitch: false,
    sendDPSchedule: 'immediate',
    sendDPRepeat: 'daily',
    triggerEvent: 1
  };
  props: {
    t: Function,
    create: Function,
    setPush: Function,
    setAction: Function,
    setDeliverySchedule: Function,
    launch: Function,
    campaign: Object
  };

  handleTabIndexChange = (index) => {
    this.setState({ tabIndex: index });
  };

  setTabIndex = (index) => {
    this.setState({ tabIndex: index });
  };

  handleChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  handleDeleteClick = (field) => {
    this.setState({ [field]: false });
  };

  loopCounts = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 10 },
    { value: 15 },
    { value: 30 },
    { value: 50 }
  ];

  loopDelays = [
    { value: 10, text: '10 secs' },
    { value: 15, text: '15 secs' },
    { value: 30, text: '30 secs' },
    { value: 60, text: '1 min' },
    { value: 300, text: '5 mins' }
  ];

  toggleSetDuration = () => {
    this.setState({ toggleSetDuration: !this.state.toggleSetDuration });
  }

  toggleAddPushNotification = () => {
    this.setState({ toggleAddPushNotification: !this.state.toggleAddPushNotification });
  }

  messagePositions = [
    { value: 'top', text: 'Top' },
    { value: 'center', text: 'Center' },
    { value: 'bottom', text: 'Bottom' }
  ];

  appActions = [
    { value: 'inAppMessage', text: 'Display In App Message' },
    { value: 'deepLink', text: 'Link to the Page Inside the app' },
    { value: 'url', text: 'Link to URL' }
  ];

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

  ageGroupOptions = [
    { value: 1, text: 'Age group 18-25' },
    { value: 2, text: 'Age group 26-31' },
    { value: 3, text: 'Age group 31-45' },
    { value: 4, text: 'Age group Above 45' }
  ];

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

  onDrop = (acceptedFiles, rejectedFiles) => {
    console.log('Accepted files: ', acceptedFiles); // eslint-disable-line
    console.log('Rejected files: ', rejectedFiles); // eslint-disable-line
  }

  render() {
    const min_datetime = new Date();
    const { t, create, setPush, setAction, setDeliverySchedule, launch } = this.props;

    return (
      <div className="campaigns_list">
        <div className="page_header">
          <h2>
            { t('campaigns.create.heading') }
          </h2>
        </div>
        <div>
          <Tabs index={ this.state.tabIndex } onChange={ this.handleTabIndexChange } fixed>
            <Tab label={ t('campaigns.create.nav.start') }>
              <div>
                <h3 className="tab-heading">{ t('campaigns.create.start.heading') }</h3>
                <div className="row">
                  <div className="col-xs-12 col-md-7">
                    <div className="form-field">
                      <Input type="text" label={ t('campaigns.create.start.name') } name="title" value={ this.state.title } onChange={ (...args) => this.handleChange('title', ...args)  } />
                    </div>
                    <div className="form-field">
                      {
                        this.state.chip1 ? (
                          <Chip deletable onDeleteClick={ this.handleDeleteClick.bind(this, 'chip1') }>Sales</Chip>
                        ) : null
                      }
                      {
                        this.state.chip2 ? (
                          <Chip deletable onDeleteClick={ this.handleDeleteClick.bind(this, 'chip2') }>Marketing</Chip>
                        ) : null
                      }
                      {
                        this.state.chip3 ? (
                          <Chip deletable onDeleteClick={ this.handleDeleteClick.bind(this, 'chip3') }>Finance</Chip>
                        ) : null
                      }
                    </div>
                  </div>
                </div>
                <div className="form-field">
                  <Checkbox
                    checked={ this.state.checkAndroid }
                    label={ t('campaigns.create.start.android') }
                    onChange={ this.handleChange.bind(this, 'checkAndroid') }
                  />
                  <Checkbox
                    checked={ this.state.checkIOS }
                    label={ t('campaigns.create.start.apple') }
                    onChange={ this.handleChange.bind(this, 'checkIOS') }
                  />
                </div>
                <div className="form-buttons">
                  <Button onClick={ () => { create(this.state); this.setTabIndex(1); } } label={ t('campaigns.create.start.next') } raised primary />
                </div>
              </div>
            </Tab>
            <Tab label={ t('campaigns.create.nav.createPush') }>
              <div>
                <h3 className="tab-heading">{ t('campaigns.create.createPush.heading') }</h3>
                <span>{ t('campaigns.create.createPush.addAnimation') }</span>
                <div><small className="text-muted">{ t('campaigns.create.createPush.addAnimationNote') }</small></div>
                <div className="row">
                  <div className="col-xs-12 col-md-7">
                    <div className="row">
                      <div className="col-md-8">
                        <div className="panel">
                          <List selectable ripple className="no-margin">
                            <ListItem
                              leftIcon="file_upload"
                              caption={ t('campaigns.create.createPush.uploadAnimation') }
                              legend={ t('campaigns.create.createPush.uploadAnimationNote') }
                            />
                          </List>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="panel">
                          <List selectable ripple className="no-margin">
                            <ListItem
                              caption={ t('campaigns.create.createPush.createAnimation') }
                              legend={ t('campaigns.create.createPush.createAnimationNote') }
                            />
                          </List>
                        </div>
                      </div>
                    </div>
                    <div className="panel">
                      <List selectable ripple className="no-margin">
                        <ListItem
                          rightIcon="add"
                          caption={ t('campaigns.create.createPush.setDuration.heading') }
                          onClick={ () => this.toggleSetDuration() }
                        />
                      </List>
                      {
                        this.state.toggleSetDuration ? (
                          <div className="row">
                            <div className="col-xs-12 col-lg-6">
                              <label>{ t('campaigns.create.createPush.setDuration.loops') }</label>
                              <Dropdown
                                allowBlank={ false }
                                source={ this.loopCounts }
                                onChange={ this.handleChange.bind(this, 'loopCount') }
                                label={ t('campaigns.create.createPush.setDuration.loopsNote') }
                                template={ this.dropDownItemTemplate }
                                value={ this.state.loopCount }
                              />
                              <label>{ t('campaigns.create.createPush.setDuration.delay') }</label>
                              <Dropdown
                                allowBlank={ false }
                                source={ this.loopDelays }
                                onChange={ this.handleChange.bind(this, 'loopDelay') }
                                label={ t('campaigns.create.createPush.setDuration.delayNote') }
                                template={ this.dropDownItemTextTemplate }
                                value={ this.state.loopDelay }
                              />
                            </div>
                            <div className="col-xs-12 col-lg-6 c-container__center">
                              <Button label={ t('campaigns.create.createPush.preview') } raised primary />
                            </div>
                          </div>
                        ) : null
                      }
                    </div>
                    <div className="panel">
                      <List selectable ripple className="no-margin">
                        <ListItem
                          rightIcon="add"
                          caption={ t('campaigns.create.createPush.addPushNotification.heading') }
                          onClick={ () => this.toggleAddPushNotification() }
                        />
                      </List>
                      {
                        this.state.toggleAddPushNotification ? (
                          <div>
                            <Input type="text" multiline label={ t('campaigns.create.createPush.addPushNotification.enterNotification') } rows={ 3 } value={ this.state.message } onChange={ this.handleChange.bind(this, 'message') } />
                            <small className="text-muted">{ t('campaigns.create.createPush.addPushNotification.forAndroidOnly') }</small>
                            <Dropdown
                              allowBlank={ false }
                              source={ this.messagePositions }
                              onChange={ this.handleChange.bind(this, 'messagePosition') }
                              label={ t('campaigns.create.createPush.addPushNotification.selectScreenLocation') }
                              template={ this.dropDownItemTextTemplate }
                              value={ this.state.messagePosition }
                            />
                          </div>
                        ) : null
                      }
                    </div>
                    <div className="form-buttons">
                      <Button icon="chevron_left" onClick={ () => this.setTabIndex(0) } label={ t('campaigns.create.createPush.back') } raised />
                      <Button onClick={ () => { setPush(this.props.campaign, this.state); this.setTabIndex(2); } } label={ t('campaigns.create.createPush.next') } raised primary />
                    </div>
                  </div>
                  <div className="col-md-5">
                    <h4>Mobile Phone Preview</h4>
                    <img src="https://placeimg.com/300/500/tech" />
                  </div>
                </div>
              </div>
            </Tab>
            <Tab label={ t('campaigns.create.nav.addAction') }>
              <div>
                <h3 className="tab-heading">{ t('campaigns.create.addAction.heading') }</h3>
                <div><small className="text-muted">{ t('campaigns.create.addAction.subtitle') }</small></div>
                <Dropdown
                  allowBlank={ false }
                  source={ this.appActions }
                  onChange={ this.handleChange.bind(this, 'appAction') }
                  label={ t('campaigns.create.createPush.addPushNotification.selectScreenLocation') }
                  template={ this.dropDownItemTextTemplate }
                  value={ this.state.appAction }
                />
                {
                  this.state.appAction === 'inAppMessage' ? (
                    <div className="row">
                      <div className="col-xs-12 col-lg-5">
                        <img src="https://placeimg.com/300/500/tech" />
                      </div>
                      <div className="col-xs-12 col-lg-7">
                        <div>
                          <Dropzone onDrop={ this.onDrop }>
                            <div>Try dropping some files here, or click to select files to upload.</div>
                          </Dropzone>
                        </div>
                        <div className="form-field">
                          <Input type="text" label={ t('campaigns.create.addAction.template.headline') } name="headline" value={ this.state.headline } onChange={ this.handleChange.bind(this, 'headline') } />
                        </div>
                        <div className="form-field">
                          <Input type="text" multiline label={ t('campaigns.create.addAction.template.content') } name="content" value={ this.state.content } rows={ 3 } onChange={ this.handleChange.bind(this, 'content') } />
                        </div>
                        <div className="form-field">
                          <label>{ t('campaigns.create.addAction.template.callToAction') }</label>
                          <Input type="text" label={ t('campaigns.create.addAction.template.buttonLabel') } name="buttonLabel" value={ this.state.buttonLabel } onChange={ this.handleChange.bind(this, 'buttonLabel') } />
                          <Input type="text" label={ t('campaigns.create.addAction.template.buttonLink') } name="buttonLink" value={ this.state.buttonLink } onChange={ this.handleChange.bind(this, 'buttonLink') } />
                        </div>
                      </div>
                    </div>
                  ) : (
                  <div className="row">
                    <div className="col-md-6">
                      <Input type="text" label={ t('campaigns.create.addAction.link.enterLink') } name="actionLink" value={ this.state.actionLink } onChange={ this.handleChange.bind(this, 'actionLink') } />
                    </div>
                  </div>
                  )
                }
                <div className="form-buttons">
                  <Button icon="chevron_left" onClick={ () => this.setTabIndex(1) } label={ t('campaigns.create.addAction.back') } raised />
                  <Button onClick={ () => { setAction(this.props.campaign, this.state); this.setTabIndex(3); } } label={ t('campaigns.create.addAction.next') } raised primary />
                </div>
              </div>
            </Tab>
            <Tab label={ t('campaigns.create.nav.scheduleDelivery') }>
              <div>
                <h3 className="tab-heading">{ t('campaigns.create.scheduleDelivery.heading') }</h3>
                <div><small className="text-muted">{ t('campaigns.create.scheduleDelivery.subtitle') }</small></div>
                <div className="row">
                  <div className="col-md-5">
                    <div className="panel">
                      <Switch
                        checked={ this.state.deliveryScheduleSwitch }
                        label={ t('campaigns.create.scheduleDelivery.schedule.heading') }
                        onChange={ this.handleChange.bind(this, 'deliveryScheduleSwitch') }
                      />
                      <small className="text-muted">{ t('campaigns.create.scheduleDelivery.schedule.subtitle') }</small>
                      {
                        this.state.deliveryScheduleSwitch === true ? (
                          <div className="margin-t-40">
                            {/* <label>{ t('campaigns.create.scheduleDelivery.schedule.send') }</label> */}
                            <Dropdown
                              allowBlank={ false }
                              source={ this.sendDPScheduleOptions }
                              onChange={ this.handleChange.bind(this, 'sendDPSchedule') }
                              label={ t('campaigns.create.scheduleDelivery.schedule.send') }
                              template={ this.dropDownItemTextTemplate }
                              value={ this.state.sendDPSchedule }
                            />
                            {
                              this.state.sendDPSchedule === 'immediate' ? (
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
                                  onChange={ this.handleChange.bind(this, 'sendDPRepeat') }
                                  label={ t('campaigns.create.scheduleDelivery.schedule.repeat') }
                                  template={ this.dropDownItemTextTemplate }
                                  value={ this.state.sendDPRepeat }
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
                        checked={ this.state.deliveryActionSwitch }
                        label={ t('campaigns.create.scheduleDelivery.action.heading') }
                        onChange={ this.handleChange.bind(this, 'deliveryActionSwitch') }
                      />
                      <small className="text-muted">{ t('campaigns.create.scheduleDelivery.action.subtitle') }</small>
                      {
                        this.state.deliveryActionSwitch === true ? (
                          <div className="margin-t-40">
                            <Dropdown
                              allowBlank={ false }
                              source={ this.triggerEventOptions }
                              onChange={ this.handleChange.bind(this, 'triggerEvent') }
                              label={ t('campaigns.create.scheduleDelivery.action.selectEvent') }
                              template={ this.dropDownItemTextTemplate }
                              value={ this.state.triggerEvent }
                            />
                            {
                              this.state.triggerEvent === 1 ? (
                                <div>
                                  <Dropdown
                                    allowBlank={ false }
                                    source={ this.appInactiveDaysOptions }
                                    onChange={ this.handleChange.bind(this, 'inactiveDays') }
                                    label={ t('campaigns.create.scheduleDelivery.action.idleDays') }
                                    template={ this.dropDownItemTextTemplate }
                                    value={ this.state.inactiveDays }
                                  />
                                  <div className="row">
                                    <div className="col-md-6">
                                      <Dropdown
                                        allowBlank={ false }
                                        source={ this.numberDPsOptions }
                                        onChange={ this.handleChange.bind(this, 'dpLimit') }
                                        label={ t('campaigns.create.scheduleDelivery.action.sendLimit') }
                                        template={ this.dropDownItemTextTemplate }
                                        value={ this.state.dpLimit }
                                      />
                                    </div>
                                    <div className="col-md-6">
                                      <Dropdown
                                        allowBlank={ false }
                                        source={ this.daysOptions }
                                        onChange={ this.handleChange.bind(this, 'dayLimit') }
                                        label={ t('campaigns.create.scheduleDelivery.action.withIn') }
                                        template={ this.dropDownItemTextTemplate }
                                        value={ this.state.dayLimit }
                                      />
                                    </div>
                                  </div>
                                </div>
                              ) : null
                            }
                          </div>
                        ) : null
                      }
                    </div>
                  </div>
                </div>
                <div className="form-buttons">
                  <Button icon="chevron_left" onClick={ () => this.setTabIndex(2) } label={ t('campaigns.create.scheduleDelivery.back') } raised />
                  <Button onClick={ () => { setDeliverySchedule(this.props.campaign, this.state); this.setTabIndex(4); } } label={ t('campaigns.create.scheduleDelivery.next') } raised primary />
                </div>
              </div>
            </Tab>
            <Tab label={ t('campaigns.create.nav.selectAudience') }>
              <div>
                <h3 className="tab-heading">{ t('campaigns.create.selectAudience.heading') }</h3>
                <div><small className="text-muted">{ t('campaigns.create.selectAudience.subtitle') }</small></div>
                <Dropdown
                  allowBlank={ false }
                  source={ this.ageGroupOptions }
                  onChange={ this.handleChange.bind(this, 'ageGroup') }
                  label={ t('campaigns.create.selectAudience.selectAgeGroup') }
                  template={ this.dropDownItemTextTemplate }
                  value={ this.state.ageGroup }
                />
                <div className="form-buttons">
                  <Button icon="chevron_left" onClick={ () => this.setTabIndex(3) } label={ t('campaigns.create.selectAudience.back') } raised />
                  <Button onClick={ () => this.setTabIndex(5) } label={ t('campaigns.create.selectAudience.next') } raised primary />
                </div>
              </div>
            </Tab>
            <Tab label={ t('campaigns.create.nav.previewAndLaunch') }>
              <div>
                <h3 className="tab-heading">{ t('campaigns.create.previewAndLaunch.heading') }</h3>
                <div className="row">
                  <div className="col-md-6">
                    <List selectable ripple>
                      <ListItem
                        rightIcon="mode_edit"
                        caption={ t('campaigns.create.previewAndLaunch.campaignName') }
                        legend={ this.state.name }
                        onClick={ () => this.setTabIndex(0) }
                      />
                      <ListItem
                        rightIcon="mode_edit"
                        caption={ t('campaigns.create.previewAndLaunch.tags') }
                        legend={ this.state.name }
                        onClick={ () => this.setTabIndex(0) }
                      />
                      <ListItem
                        rightIcon="mode_edit"
                        caption={ t('campaigns.create.previewAndLaunch.action') }
                        legend={ this.state.name }
                        onClick={ () => this.setTabIndex(2) }
                      />
                      <ListItem
                        rightIcon="mode_edit"
                        caption={ t('campaigns.create.previewAndLaunch.delivery') }
                        legend={ this.state.name }
                        onClick={ () => this.setTabIndex(3) }
                      />
                      <ListItem
                        rightIcon="mode_edit"
                        caption={ t('campaigns.create.previewAndLaunch.audience') }
                        onClick={ () => this.setTabIndex(4) }
                      />
                    </List>
                  </div>
                  <div className="col-md-6">
                    <h4>Mobile Phone Preview</h4>
                    <img src="https://placeimg.com/300/500/tech" />
                  </div>
                </div>
                <div className="form-buttons">
                  <Button icon="save" onClick={ () => this.handleSaveDraft() } label={ t('campaigns.create.previewAndLaunch.saveAsDraft') } raised accent />
                  <Button icon="done_all" onClick={ () => launch(this.props.campaign) } label={ t('campaigns.create.previewAndLaunch.launchNow') } raised primary />
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = (state) => ({ campaign: state.campaign.campaign });

const mapDispatchToProps = (dispatch) => ({
  create: (state) => {
    const payload = {
      title: state.title,
      tags: [],
      platform: []
    };
    if (state.chip1) {
      payload.tags.push('Sales');
    }
    if (state.chip2) {
      payload.tags.push('Marketing');
    }
    if (state.chip3) {
      payload.tags.push('Finance');
    }

    if (state.checkAndroid) {
      payload.platform.push({
        name: 'Android'
      });
    }
    if (state.checkIOS) {
      payload.platform.push({
        name: 'iOS'
      });
    }
    dispatch(campaignCreateRequest('5825cfd1d3932754c70fada7', payload));
  },
  setPush: (campaign, state) => {
    const payload = {
      loopCount: state.loopCount,
      loopDelay: state.loopDelay,
      messagePosition: state.messagePosition,
      message: state.message
    };
    if (campaign && campaign._id) {
      dispatch(campaignUpdateRequest('5825cfd1d3932754c70fada7', campaign._id, payload));
    }
  },
  setAction: (campaign, state) => {
    const payload = {
      campaignType: state.appAction
    };
    if (payload.campaignType === 'inAppMessage') {
      payload.url = '';
    } else if (payload.campaignType === 'deepLink') {
      payload.url = state.actionLink;
    } else if (payload.campaignType === 'url') {
      payload.url = state.actionLink;
    }
    if (campaign && campaign._id) {
      dispatch(campaignUpdateRequest('5825cfd1d3932754c70fada7', campaign._id, payload));
    }
  },
  setDeliverySchedule: (campaign, state) => {
    if (state.deliveryScheduleSwitch) {
      const deliverySchedule = {
        status: 'ready',
        frequency: state.sendDPSchedule
      };

      if (state.sendDPSchedule === 'immediate') {
        deliverySchedule.repeat = 'once';
      } else {
        const sendDate = state.scheduleDate;
        const sendTime = state.scheduleTime;
        const scheduleDateTime = `${ sendDate.getFullYear() }-${ `00${ (sendDate.getMonth() + 1) }`.slice(-2) }-${ `00${ sendDate.getDate() }`.slice(-2) } ${ `00${ sendTime.getHours() }`.slice(-2) }:${ `00${ sendTime.getMinutes() }`.slice(-2) }:00`;
        deliverySchedule.repeat = state.sendDPRepeat;
        deliverySchedule.sendDate = scheduleDateTime;
      }
      if (campaign && campaign._id) {
        dispatch(campaignScheduleRequest('5825cfd1d3932754c70fada7', campaign._id, deliverySchedule));
      }
    }
    if (state.deliveryActionSwitch) {
      const payload = {};
      payload.deliveryAction = {
        dayLimit: state.dayLimit,
        dpLimit: state.dpLimit,
        inactiveDays: state.inactiveDays
      };
      if (campaign && campaign._id) {
        dispatch(campaignUpdateRequest('5825cfd1d3932754c70fada7', campaign._id, payload));
      }
    }
  },
  launch: (campaign) => {
    const payload = {
      isActive: true,
      isPaused: false
    };
    if (campaign && campaign._id) {
      dispatch(campaignUpdateRequest('5825cfd1d3932754c70fada7', campaign._id, payload)).then(() => {
        dispatch(showNotification('success', `Great, the campaign [${ campaign.title }] is just launched.`));
        dispatch(push('/app/campaigns'));
      });
    }
  }
});


export default translate()(connect(mapStatesToProps, mapDispatchToProps)(CampaignStart));
