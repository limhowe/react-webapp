import React, { Component } from 'react';
import { Button, IconButton } from 'react-toolbox/lib/button';
import { Tab, Tabs } from 'react-toolbox';
import { translate } from 'react-i18next';
import Checkbox from 'react-toolbox/lib/checkbox';
import Dropdown from 'react-toolbox/lib/dropdown';
import Input from 'react-toolbox/lib/input';
import Chip from 'react-toolbox/lib/chip';

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
    pushText: 'haho'
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

  handleLoopsChange = (value) => {
    this.setState({ loopsSelected: value });
  };

  handleDelayChange = (value) => {
    this.setState({ delaySelected: value });
  };

  handleScreenLocationChange = (value) => {
    this.setState({ screenLocationSelected: value });
  };

  dropDownItemTemplate(item) {
    return (
      <div>
        <strong>{ item.value }</strong>
      </div>
    );
  }

  render() {
    const className = classnames(styles['campaigns_list']);
    const pageHeaderClassName = classnames(styles['page_header']);
    const formFieldClassName = classnames(styles['form-field']);
    const formButtonsClassName = classnames(styles['form-buttons']);
    const textMutedClassName = classnames(styles['text-muted']);
    const panelClassName = classnames(styles['panel']);
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
                <small className={ textMutedClassName }>{ t('campaigns.create.createPush.addAnimationNote') }</small>
                <div className={ panelClassName }>
                  <Button icon="file_upload" label={ t('campaigns.create.createPush.uploadAnimation') } flat primary />
                  <p className={ textMutedClassName }><small>{ t('campaigns.create.createPush.uploadAnimationNote') }</small></p>
                </div>
                <div className={ panelClassName }>
                  <Button label={ t('campaigns.create.createPush.createAnimation') } flat primary />
                  <p className={ textMutedClassName }><small>{ t('campaigns.create.createPush.createAnimationNote') }</small></p>
                </div>
                <div className={ panelClassName }>
                  <h4><IconButton icon="add" />{ t('campaigns.create.createPush.setDuration.heading') }</h4>
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
                <div className={ panelClassName }>
                  <h4><IconButton icon="add" />{ t('campaigns.create.createPush.addPushNotification.heading') }</h4>
                  {/* <label>{ t('campaigns.create.createPush.addPushNotification.enterNotification') }</label> */}
                  <Input type="text" multiline label={ t('campaigns.create.createPush.addPushNotification.enterNotification') } rows={ 5 } maxLength={ 20 } value={ this.state.pushText } onChange={ this.handleChange.bind(this, 'pushText') } />
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
                <div className={ formButtonsClassName }>
                  <Button icon="chevron_left" onClick={ () => this.setTabIndex(0) } label={ t('campaigns.create.createPush.back') } raised />
                  <Button onClick={ () => this.setTabIndex(1) } label={ t('campaigns.create.createPush.next') } raised primary />
                </div>
              </div>
            </Tab>
            <Tab label={ t('campaigns.create.nav.addAction') }>
              <small>Paused addAction</small>
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
