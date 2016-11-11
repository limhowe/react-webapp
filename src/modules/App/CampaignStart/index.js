import React, { Component } from 'react';
import { Button, IconButton } from 'react-toolbox/lib/button';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
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

import styles from '../../../styles';
import classnames from 'classnames';

export class CampaignStart extends Component {
  displayName: 'New Campaign';
  state = {
    tabIndex: 0,
    name: '',
    chip1: false,
    chip2: false,
    chip3: false,
    check1: true,
    check2: false,
    pushText: '',
    appAction: 1,
    toggleSetDuration: false,
    toggleAddPushNotification: false,
    scheduleDeliverySwitch: true,
    triggerDeliverySwitch: false,
    sendDPSchedule: 1,
    triggerEvent: 1
  };
  props: {
    t: Function
  };

  handleTabIndexChange = (index) => {
    this.setState({ tabIndex: index });
  };

  setTabIndex = (index) => {
    this.setState({ tabIndex: index });
  };

  handleActive = () => {
    console.log('Special one activated');
  };

  handleChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  handleDeleteClick = (field) => {
    this.setState({ [field]: true });
  };

  handleSaveDraft = () => {
    console.log('Save as Draft');
  }

  handleSave = () => {
    console.log(this.state);
  }

  loops = [
    { value: 1, text: '1' },
    { value: 2 },
    { value: 3 },
    { value: 4 }
  ];

  delays = [
    { value: '10 secs' },
    { value: '15 secs' },
    { value: '30 secs' },
    { value: '1 min' }
  ];

  toggleSetDuration = () => {
    this.setState({ toggleSetDuration: !this.state.toggleSetDuration });
  }

  toggleAddPushNotification = () => {
    this.setState({ toggleAddPushNotification: !this.state.toggleAddPushNotification });
  }

  screenLocations = [
    { value: 'Top Left' },
    { value: 'Top Center' },
    { value: 'Top Right' },
    { value: 'Middle Left' },
    { value: 'Center' },
    { value: 'Middle Right' },
    { value: 'Bottom Left' },
    { value: 'Bottom Center' },
    { value: 'Bottom Right' }
  ];

  appActions = [
    { value: 1, text: 'Display In App Message' },
    { value: 2, text: 'Link to the Page Inside the app' },
    { value: 3, text: 'Link to URL' }
  ];

  sendDPScheduleOptions = [
    { value: 1, text: 'Immediately' },
    { value: 2, text: 'At a Designated Time' }
  ];

  sendDPRepeatOptions = [
    { value: 1, text: 'Daily' },
    { value: 2, text: 'Weekly' },
    { value: 3, text: 'Bi-Weekly' }
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
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
  }

  render() {
    const className = classnames(styles['campaigns_list']);
    const pageHeaderClassName = classnames(styles['page_header']);
    const formFieldClassName = classnames(styles['form-field']);
    const formButtonsClassName = classnames(styles['form-buttons']);
    const min_datetime = new Date();
    const { t } = this.props;

    return (
      <div className={ className }>
        <div className={ pageHeaderClassName }>
          <h2>
            { t('campaigns.create.heading') }
          </h2>
        </div>
        <div>
          <Tabs index={ this.state.tabIndex } onChange={ this.handleTabIndexChange } fixed>
            <Tab label={ t('campaigns.create.nav.start') }>
              <div>
                <h3 className={ classnames(styles['tab-heading']) }>{ t('campaigns.create.start.heading') }</h3>
                <div className={ classnames(styles['row'])  }>
                  <div className={ classnames(styles['col-xs-12'], styles['col-md-7']) }>
                    <div className={ formFieldClassName }>
                      <Input type="text" label={ t('campaigns.create.start.name') } name="name" value={ this.state.name } onChange={ this.handleChange.bind(this, 'name') } />
                    </div>
                    <div className={ formFieldClassName }>
                      {
                        this.state.chip1 ? null : (
                          <Chip deletable onDeleteClick={ this.handleDeleteClick.bind(this, 'chip1') }>Sales</Chip>
                        )
                      }
                      {
                        this.state.chip2 ? null : (
                          <Chip deletable onDeleteClick={ this.handleDeleteClick.bind(this, 'chip2') }>Marketing</Chip>
                        )
                      }
                      {
                        this.state.chip3 ? null : (
                          <Chip deletable onDeleteClick={ this.handleDeleteClick.bind(this, 'chip3') }>Finance</Chip>
                        )
                      }
                    </div>
                  </div>
                </div>
                <div className={ formFieldClassName }>
                  <Checkbox
                    checked={ this.state.check1 }
                    label={ t('campaigns.create.start.android') }
                    onChange={ this.handleChange.bind(this, 'check1') }
                  />
                  <Checkbox
                    checked={this.state.check2}
                    label={ t('campaigns.create.start.apple') }
                    onChange={ this.handleChange.bind(this, 'check2') }
                  />
                </div>
                <div className={ formButtonsClassName }>
                  <Button onClick={ () => this.setTabIndex(1) } label={ t('campaigns.create.start.next') } raised primary />
                </div>
              </div>
            </Tab>
            <Tab label={ t('campaigns.create.nav.createPush') }>
              <div>
                <h3 className={ classnames(styles['tab-heading']) }>{ t('campaigns.create.createPush.heading') }</h3>
                <span>{ t('campaigns.create.createPush.addAnimation') }</span>
                <div><small className={ classnames(styles['text-muted']) }>{ t('campaigns.create.createPush.addAnimationNote') }</small></div>
                <div className={ classnames(styles['row'])  }>
                  <div className={ classnames(styles['col-xs-12'], styles['col-md-7']) }>
                    <div className={ classnames(styles['row'])  }>
                      <div className={ classnames(styles['col-md-8']) }>
                        <div className={ classnames(styles['panel']) }>
                          <List selectable ripple className={ classnames(styles['no-margin']) }>
                            <ListItem
                              leftIcon="file_upload"
                              caption={ t('campaigns.create.createPush.uploadAnimation') }
                              legend={ t('campaigns.create.createPush.uploadAnimationNote') }
                            />
                          </List>
                        </div>
                      </div>
                      <div className={ classnames(styles['col-md-4']) }>
                        <div className={ classnames(styles['panel']) }>
                          <List selectable ripple className={ classnames(styles['no-margin']) }>
                            <ListItem
                              caption={ t('campaigns.create.createPush.createAnimation') }
                              legend={ t('campaigns.create.createPush.createAnimationNote') }
                            />
                          </List>
                        </div>
                      </div>
                    </div>
                    <div className={ classnames(styles['panel']) }>
                      <List selectable ripple className={ classnames(styles['no-margin']) }>
                        <ListItem
                          rightIcon="add"
                          caption={ t('campaigns.create.createPush.setDuration.heading') }
                          onClick={ () => this.toggleSetDuration() }
                        />
                      </List>
                      {
                        this.state.toggleSetDuration ? (
                          <div className={ classnames(styles['row'])  }>
                            <div className={ classnames(styles['col-xs-12'], styles['col-lg-6']) }>
                              <label>{ t('campaigns.create.createPush.setDuration.loops') }</label>
                              <Dropdown
                                allowBlank={ false }
                                source={ this.loops }
                                onChange={ this.handleChange.bind(this, 'loopsSelected') }
                                label={ t('campaigns.create.createPush.setDuration.loopsNote') }
                                template={ this.dropDownItemTemplate }
                                value={ this.state.loopsSelected }
                              />
                              <label>{ t('campaigns.create.createPush.setDuration.delay') }</label>
                              <Dropdown
                                allowBlank={ false }
                                source={ this.delays }
                                onChange={ this.handleChange.bind(this, 'delaySelected') }
                                label={ t('campaigns.create.createPush.setDuration.delayNote') }
                                template={ this.dropDownItemTemplate }
                                value={ this.state.delaySelected }
                              />
                            </div>
                            <div className={ classnames(styles['col-xs-12'], styles['col-lg-6'], styles['c-container__center']) }>
                              <Button label={ t('campaigns.create.createPush.preview') } raised primary />
                            </div>
                          </div>
                        ) : null
                      }
                    </div>
                    <div className={ classnames(styles['panel']) }>
                      <List selectable ripple className={ classnames(styles['no-margin']) }>
                        <ListItem
                          rightIcon="add"
                          caption={ t('campaigns.create.createPush.addPushNotification.heading') }
                          onClick={ () => this.toggleAddPushNotification() }
                        />
                      </List>
                      {
                        this.state.toggleAddPushNotification ? (
                          <div>
                            <Input type="text" multiline label={ t('campaigns.create.createPush.addPushNotification.enterNotification') } rows={ 3 } value={ this.state.pushText } onChange={ this.handleChange.bind(this, 'pushText') } />
                            <small className={ classnames(styles['text-muted']) }>{ t('campaigns.create.createPush.addPushNotification.forAndroidOnly') }</small>
                            <Dropdown
                              allowBlank={ false }
                              source={ this.screenLocations }
                              onChange={ this.handleChange.bind(this, 'screenLocationSelected') }
                              label={ t('campaigns.create.createPush.addPushNotification.selectScreenLocation') }
                              template={ this.dropDownItemTemplate }
                              value={ this.state.screenLocationSelected }
                            />
                          </div>
                        ) : null
                      }
                    </div>
                    <div className={ formButtonsClassName }>
                      <Button icon="chevron_left" onClick={ () => this.setTabIndex(0) } label={ t('campaigns.create.createPush.back') } raised />
                      <Button onClick={ () => this.setTabIndex(2) } label={ t('campaigns.create.createPush.next') } raised primary />
                    </div>
                  </div>
                  <div className={ classnames(styles['col-xs'], styles['col-md-5']) }>
                    <h4>Mobile Phone Preview</h4>
                    <img src="https://placeimg.com/300/500/tech" />
                  </div>
                </div>
              </div>
            </Tab>
            <Tab label={ t('campaigns.create.nav.addAction') }>
              <div>
                <h3 className={ classnames(styles['tab-heading']) }>{ t('campaigns.create.addAction.heading') }</h3>
                <div><small className={ classnames(styles['text-muted']) }>{ t('campaigns.create.addAction.subtitle') }</small></div>
                <Dropdown
                  allowBlank={ false }
                  source={ this.appActions }
                  onChange={ this.handleChange.bind(this, 'appAction') }
                  label={ t('campaigns.create.createPush.addPushNotification.selectScreenLocation') }
                  template={ this.dropDownItemTextTemplate }
                  value={ this.state.appAction }
                />
                {
                  this.state.appAction === 1 ? (
                    <div className={ classnames(styles['row'])  }>
                      <div className={ classnames(styles['col-xs-12'], styles['col-lg-5']) }>
                        <img src="https://placeimg.com/300/500/tech" />
                      </div>
                      <div className={ classnames(styles['col-xs-12'], styles['col-lg-7']) }>
                        <div>
                          <Dropzone onDrop={ this.onDrop }>
                            <div>Try dropping some files here, or click to select files to upload.</div>
                          </Dropzone>
                        </div>
                        <div className={ formFieldClassName }>
                          <Input type="text" label={ t('campaigns.create.addAction.template.headline') } name="headline" value={ this.state.headline } onChange={ this.handleChange.bind(this, 'headline') } />
                        </div>
                        <div className={ formFieldClassName }>
                          <Input type="text" multiline label={ t('campaigns.create.addAction.template.content') } name="content" value={ this.state.content } rows={ 3 } onChange={ this.handleChange.bind(this, 'content') } />
                        </div>
                        <div className={ formFieldClassName }>
                          <label>{ t('campaigns.create.addAction.template.callToAction') }</label>
                          <Input type="text" label={ t('campaigns.create.addAction.template.buttonLabel') } name="buttonLabel" value={ this.state.buttonLabel } onChange={ this.handleChange.bind(this, 'buttonLabel') } />
                          <Input type="text" label={ t('campaigns.create.addAction.template.buttonLink') } name="buttonLink" value={ this.state.buttonLink } onChange={ this.handleChange.bind(this, 'buttonLink') } />
                        </div>
                      </div>
                    </div>
                  ) : (
                  <div className={ classnames(styles['row']) }>
                    <div className={ classnames(styles['col-md-6']) }>
                      <Input type="text" label={ t('campaigns.create.addAction.link.enterLink') } name="enterLink" value={ this.state.actionLink } onChange={ this.handleChange.bind(this, 'actionLink') } />
                    </div>
                  </div>
                  )
                }
                <div className={ formButtonsClassName }>
                  <Button icon="chevron_left" onClick={ () => this.setTabIndex(1) } label={ t('campaigns.create.addAction.back') } raised />
                  <Button onClick={ () => this.setTabIndex(3) } label={ t('campaigns.create.addAction.next') } raised primary />
                </div>
              </div>
            </Tab>
            <Tab label={ t('campaigns.create.nav.scheduleDelivery') }>
              <div>
                <h3 className={ classnames(styles['tab-heading']) }>{ t('campaigns.create.scheduleDelivery.heading') }</h3>
                <div><small className={ classnames(styles['text-muted']) }>{ t('campaigns.create.scheduleDelivery.subtitle') }</small></div>
                <div className={ classnames(styles['row']) }>
                  <div className={ classnames(styles['col-md-5']) }>
                    <div className={ classnames(styles['panel']) }>
                      <Switch
                        checked={ this.state.scheduleDeliverySwitch }
                        label={ t('campaigns.create.scheduleDelivery.schedule.heading') }
                        onChange={ this.handleChange.bind(this, 'scheduleDeliverySwitch') }
                      />
                      <small className={ classnames(styles['text-muted']) }>{ t('campaigns.create.scheduleDelivery.schedule.subtitle') }</small>
                      {
                        this.state.scheduleDeliverySwitch === true ? (
                          <div className={ classnames(styles['margin-t-40']) }>
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
                              this.state.sendDPSchedule === 1 ? (
                                <div>
                                  <div className={ classnames(styles['row']) }>
                                    <div className={ classnames(styles['col-md-6']) }>
                                      <DatePicker
                                        label={ t('campaigns.create.scheduleDelivery.schedule.expirationDate') }
                                        minDate={ min_datetime }
                                        onChange={ this.handleChange.bind(this, 'date1') }
                                        value={ this.state.date2 }
                                        sundayFirstDayOfWeek
                                      />
                                    </div>
                                    <div className={ classnames(styles['col-md-6']) }>
                                      <TimePicker
                                        label={ t('campaigns.create.scheduleDelivery.schedule.expirationTime') }
                                        onChange={ this.handleChange.bind(this, 'time1') }
                                        value={ this.state.time1 }
                                      />
                                    </div>
                                  </div>
                                  <Checkbox
                                    checked={ this.state.useDeviceTime1 }
                                    label={ t('campaigns.create.scheduleDelivery.schedule.useDeviceTime') }
                                    onChange={ this.handleChange.bind(this, 'useDeviceTime1') }
                                  />
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
                                <div className={ classnames(styles['row']) }>
                                  <div className={ classnames(styles['col-md-6']) }>
                                    <DatePicker
                                      label={ t('shared.date') }
                                      minDate={ min_datetime }
                                      onChange={ this.handleChange.bind(this, 'date2') }
                                      value={ this.state.date2 }
                                      sundayFirstDayOfWeek
                                    />
                                  </div>
                                  <div className={ classnames(styles['col-md-6']) }>
                                    <TimePicker
                                      label={ t('shared.time') }
                                      onChange={ this.handleChange.bind(this, 'time2') }
                                      value={ this.state.time2 }
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
                  <div className={ classnames(styles['col-md-5']) }>
                    <div className={ classnames(styles['panel']) }>
                      <Switch
                        checked={ this.state.triggerDeliverySwitch }
                        label={ t('campaigns.create.scheduleDelivery.action.heading') }
                        onChange={ this.handleChange.bind(this, 'triggerDeliverySwitch') }
                      />
                      <small className={ classnames(styles['text-muted']) }>{ t('campaigns.create.scheduleDelivery.action.subtitle') }</small>
                      {
                        this.state.triggerDeliverySwitch === true ? (
                          <div className={ classnames(styles['margin-t-40']) }>
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
                                    onChange={ this.handleChange.bind(this, 'appInactiveDays') }
                                    label={ t('campaigns.create.scheduleDelivery.action.idleDays') }
                                    template={ this.dropDownItemTextTemplate }
                                    value={ this.state.appInactiveDays }
                                  />
                                  <div className={ classnames(styles['row']) }>
                                    <div className={ classnames(styles['col-md-6']) }>
                                      <Dropdown
                                        allowBlank={ false }
                                        source={ this.numberDPsOptions }
                                        onChange={ this.handleChange.bind(this, 'numberDP') }
                                        label={ t('campaigns.create.scheduleDelivery.action.sendLimit') }
                                        template={ this.dropDownItemTextTemplate }
                                        value={ this.state.numberDP }
                                      />
                                    </div>
                                    <div className={ classnames(styles['col-md-6']) }>
                                      <Dropdown
                                        allowBlank={ false }
                                        source={ this.daysOptions }
                                        onChange={ this.handleChange.bind(this, 'days') }
                                        label={ t('campaigns.create.scheduleDelivery.action.withIn') }
                                        template={ this.dropDownItemTextTemplate }
                                        value={ this.state.days }
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
                <div className={ formButtonsClassName }>
                  <Button icon="chevron_left" onClick={ () => this.setTabIndex(2) } label={ t('campaigns.create.scheduleDelivery.back') } raised />
                  <Button onClick={ () => this.setTabIndex(4) } label={ t('campaigns.create.scheduleDelivery.next') } raised primary />
                </div>
              </div>
            </Tab>
            <Tab label={ t('campaigns.create.nav.selectAudience') }>
              <div>
                <h3 className={ classnames(styles['tab-heading']) }>{ t('campaigns.create.selectAudience.heading') }</h3>
                <div><small className={ classnames(styles['text-muted']) }>{ t('campaigns.create.selectAudience.subtitle') }</small></div>
                <Dropdown
                  allowBlank={ false }
                  source={ this.ageGroupOptions }
                  onChange={ this.handleChange.bind(this, 'ageGroup') }
                  label={ t('campaigns.create.selectAudience.selectAgeGroup') }
                  template={ this.dropDownItemTextTemplate }
                  value={ this.state.ageGroup }
                />
                <div className={ formButtonsClassName }>
                  <Button icon="chevron_left" onClick={ () => this.setTabIndex(3) } label={ t('campaigns.create.selectAudience.back') } raised />
                  <Button onClick={ () => this.setTabIndex(5) } label={ t('campaigns.create.selectAudience.next') } raised primary />
                </div>
              </div>
            </Tab>
            <Tab label={ t('campaigns.create.nav.previewAndLaunch') }>
              <div>
                <h3 className={ classnames(styles['tab-heading']) }>{ t('campaigns.create.previewAndLaunch.heading') }</h3>
                <div className={ classnames(styles['row']) }>
                  <div className={ classnames(styles['col-md-6']) }>
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
                  <div className={ classnames(styles['col-md-6']) }>
                    <h4>Mobile Phone Preview</h4>
                    <img src="https://placeimg.com/300/500/tech" />
                  </div>
                </div>
                <div className={ formButtonsClassName }>
                  <Button icon="save" onClick={ () => this.handleSaveDraft() } label={ t('campaigns.create.previewAndLaunch.saveAsDraft') } raised accent />
                  <Button icon="done_all" onClick={ () => this.handleSave() } label={ t('campaigns.create.previewAndLaunch.launchNow') } raised primary />
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default translate()(CampaignStart);
