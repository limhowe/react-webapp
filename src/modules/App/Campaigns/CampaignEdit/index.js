import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib';
import { ProgressBar, Tab, Tabs } from 'react-toolbox';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { push } from 'react-router-redux';

import BasicInfo from './BasicInfo';
import CreatePush from './CreatePush';
import AddAction from './AddAction';
import ScheduleDelivery from './ScheduleDelivery';

import styles from '../theme/styles.scss';

import { initNew, changeTabIndex, campaignReadRequest } from '../redux/actions';

export class CampaignEdit extends Component {
  displayName: 'Edit Campaign';
  state = {
    loaded: false
  }
  componentWillMount() {
    const campaignId = this.props.params && this.props.params.campaignId;
    if (campaignId === 'start') {
      this.props.initNew();
      this.setState({ loaded: true });
    } else {
      this.props.readCampaign(campaignId).then(() => {
        this.setState({ loaded: true });
      });
    }
  }
  props: {
    params: Object,
    tabIndex: number,
    campaign: Object,
    t: Function,
    initNew: Function,
    changeTabIndex: Function,
    readCampaign: Function,
    gotoList: Function
  }

  handleTabIndexChange = (index) => {
    this.props.changeTabIndex(index);
  };

  render() {
    const { t, tabIndex, gotoList, campaign } = this.props;
    const { loaded } = this.state;

    if (!loaded) {
      return (
        <div className="c-container c-container__center">
          <ProgressBar mode="indeterminate" type="circular" multicolor />
        </div>
      );
    }

    const map = {
      0: () => <BasicInfo />,
      1: () => <CreatePush />,
      2: () => <AddAction />,
      3: () => <ScheduleDelivery />
    };

    return (
      <div className="campaigns_list">
        <div className="page_header">
          <h2>
            { campaign && campaign._id ? t('campaigns.edit.editCampaign') : t('campaigns.create.heading') }
            <Button className="pull-right" onClick={ gotoList } label={ t('campaigns.create.nav.gotoList') } raised primary />
          </h2>
          <h3>current step - { tabIndex }</h3>
        </div>
        <div>
          <Tabs
            index={ tabIndex }
            onChange={ this.handleTabIndexChange }
            theme={ styles }
            fixed
          >
            <Tab label={ t('campaigns.create.nav.start') } />
            <Tab label={ t('campaigns.create.nav.createPush') } />
            <Tab label={ t('campaigns.create.nav.addAction') } />
            <Tab label={ t('campaigns.create.nav.scheduleDelivery') } />
            <Tab label={ t('campaigns.create.nav.selectAudience') } />
            <Tab label={ t('campaigns.create.nav.previewAndLaunch') } />
          </Tabs>
        </div>
        <div>
          {
            map[tabIndex]()
          }
        </div>
      </div>
    );
  }
}

const mapStatesToProps = ({ campaign: { campaign, tabIndex } }) => ({ campaign, tabIndex });

const mapDispatchToProps = (dispatch) => ({
  initNew: () => dispatch(initNew()),
  readCampaign: (id) => dispatch(campaignReadRequest(id)),
  changeTabIndex: (index) => dispatch(changeTabIndex(index)),
  gotoList: () => dispatch(push('/app/campaigns'))
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(CampaignEdit));
