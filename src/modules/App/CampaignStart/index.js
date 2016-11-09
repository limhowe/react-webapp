import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';
import { Tab, Tabs } from 'react-toolbox';
import { translate } from 'react-i18next';
import Checkbox from 'react-toolbox/lib/checkbox';
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
    check2: false
  };
  props: {
    t: Function
  };

  handleTabIndexChange = (index) => {
    this.setState({ tabIndex: index });
  };

  setTabIndex = (index) => {
    console.log(index, '---!');
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

  handleChange = (field, value) => {
    this.setState({ ...this.state, [field]: value });
  };

  render() {
    const className = classnames(styles['campaigns_list']);
    const pageHeaderClassName = classnames(styles['page_header']);
    const formFieldClassName = classnames(styles['form-field']);
    const formButtonsClassName = classnames(styles['form-buttons']);

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
              <small>Scheduled createPush</small>
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
