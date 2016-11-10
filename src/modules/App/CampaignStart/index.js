import React, { Component } from 'react';
import { Button, IconButton } from 'react-toolbox/lib/button';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import { Tab, Tabs } from 'react-toolbox';
import { translate } from 'react-i18next';
import Checkbox from 'react-toolbox/lib/checkbox';
import Dropdown from 'react-toolbox/lib/dropdown';
import Input from 'react-toolbox/lib/input';
import Chip from 'react-toolbox/lib/chip';
import Dropzone from 'react-dropzone';

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
    toggleAddPushNotification: false
    // loopsSelected: 1,
    // delaySelected: '10 secs'
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

  loops = [
    { value: 1 },
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

  handleLoopsChange = (value) => {
    this.setState({ loopsSelected: value });
  };

  handleDelayChange = (value) => {
    this.setState({ delaySelected: value });
  };

  handleScreenLocationChange = (value) => {
    this.setState({ screenLocationSelected: value });
  };

  handleAppActionChange = (value) => {
    this.setState({ appAction: value });
  };

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
    const textMutedClassName = classnames(styles['text-muted']);
    const panelClassName = classnames(styles['panel']);
    const noMarginClassName = classnames(styles['no-margin']);

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
                <h3>{ t('campaigns.create.start.heading') }</h3>
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
                <h3>{ t('campaigns.create.createPush.heading') }</h3>
                <span>{ t('campaigns.create.createPush.addAnimation') }</span>
                <div><small className={ textMutedClassName }>{ t('campaigns.create.createPush.addAnimationNote') }</small></div>
                <div className={ classnames(styles['row'])  }>
                  <div className={ classnames(styles['col-xs-12'], styles['col-md-7']) }>
                    <div className={ classnames(styles['row'])  }>
                      <div className={ classnames(styles['col-md-8']) }>
                        <div className={ panelClassName }>
                          <List selectable ripple className={ noMarginClassName }>
                            <ListItem
                              leftIcon='file_upload'
                              caption={ t('campaigns.create.createPush.uploadAnimation') }
                              legend={ t('campaigns.create.createPush.uploadAnimationNote') }
                            />
                          </List>
                        </div>
                      </div>
                      <div className={ classnames(styles['col-md-4']) }>
                        <div className={ panelClassName }>
                          <List selectable ripple className={ noMarginClassName }>
                            <ListItem
                              // leftIcon='file_upload'
                              caption={ t('campaigns.create.createPush.createAnimation') }
                              legend={ t('campaigns.create.createPush.createAnimationNote') }
                            />
                          </List>
                        </div>
                      </div>
                    </div>
                    <div className={ panelClassName }>
                      <List selectable ripple className={ noMarginClassName }>
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
                                onChange={ this.handleLoopsChange }
                                label={ t('campaigns.create.createPush.setDuration.loopsNote') }
                                template={ this.dropDownItemTemplate }
                                value={ this.state.loopsSelected }
                              />
                              <label>{ t('campaigns.create.createPush.setDuration.delay') }</label>
                              <Dropdown
                                allowBlank={ false }
                                source={ this.delays }
                                onChange={ this.handleDelayChange }
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
                    <div className={ panelClassName }>
                      <List selectable ripple className={ noMarginClassName }>
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
                            <small className={ textMutedClassName }>{ t('campaigns.create.createPush.addPushNotification.forAndroidOnly') }</small>
                            <Dropdown
                              allowBlank={ false }
                              source={ this.screenLocations }
                              onChange={ this.handleScreenLocationChange }
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
                <h3>{ t('campaigns.create.addAction.heading') }</h3>
                <small className={ textMutedClassName }>{ t('campaigns.create.addAction.subtitle') }</small>
                <Dropdown
                  allowBlank={ false }
                  source={ this.appActions }
                  onChange={ this.handleAppActionChange }
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
              <small>campaigns.create.nav.scheduleDelivery</small>
            </Tab>
            <Tab label={ t('campaigns.create.nav.selectAudience') }>
              <small>campaigns.create.nav.selectAudience</small>
            </Tab>
            <Tab label={ t('campaigns.create.nav.previewAndLaunch') }>
              <small>campaigns.create.nav.previewAndLaunch</small>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default translate()(CampaignStart);
