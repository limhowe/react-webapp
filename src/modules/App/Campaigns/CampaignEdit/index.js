import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib';
import { ProgressBar, Tab, Tabs } from 'react-toolbox';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { push } from 'react-router-redux';

import BasicInfo from './BasicInfo';
import BasicInfo2 from './BasicInfo2';
import styles from '../theme/styles.scss';

import { initNew, campaignReadRequest } from '../redux/actions';

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
    readCampaign: Function,
    gotoList: Function
  }

  handleTabIndexChange = (index) => {
    if (this.props.campaign) {
      this.setState({ tabIndex: index });
    }
  };

  render() {
    const { t, tabIndex, gotoList } = this.props;
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
      1: () => <BasicInfo2 />
    };

    return (
      <div className="campaigns_list">
        <div className="page_header">
          <h2>
            { t('campaigns.edit.editCampaign') }
            <Button className="pull-right" onClick={ gotoList } label={ t('campaigns.create.nav.gotoList') } raised primary />
          </h2>
          <h3>current step - { tabIndex }</h3>
        </div>
        <div>
          <Tabs
            index={ this.state.tabIndex }
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

const mapStatesToProps = ({ campaign: { tabIndex } }) => ({
  tabIndex
});

const mapDispatchToProps = (dispatch) => ({
  initNew: () => dispatch(initNew()),
  readCampaign: (id) => dispatch(campaignReadRequest(id)),
  gotoList: () => dispatch(push('/app/campaigns'))
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(CampaignEdit));
