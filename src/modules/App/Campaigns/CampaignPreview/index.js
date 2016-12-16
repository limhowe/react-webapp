import React, { Component } from 'react';
import { ProgressBar, Button } from 'react-toolbox';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { push } from 'react-router-redux';
import moment from 'moment-timezone';

import { campaignReadRequest } from '../redux/actions';
import { segmentReadRequest } from '../../Segments/redux/actions';
import { getAudienceCount, getDPCount } from '../../Analytics/redux/actions';

export class CampaignEdit extends Component {
  displayName: 'Edit Campaign';
  state = {
    loaded: false
  }

  componentWillMount() {
    const campaignId = this.props.params && this.props.params.campaignId;
    this.props.readCampaign(campaignId).then((campaign) => {
      this.setState({ loaded: true });
      if (campaign.segment) {
        this.props.readSegment(campaign.segment);
        this.props.getAudienceCount([campaign.segment]);
      } else {
        this.props.getAudienceCount();
      }
      this.props.getDPCount({
        campaignId,
        groupBy: 'status'
      });
    });
  }

  props: {
    params: Object,
    currentSegment: Object,
    campaign: Object,
    t: Function,
    dpCount: Function,
    audienceCounts: Object,
    getAudienceCount: Function,
    readSegment: Function,
    getDPCount: Function,
    readCampaign: Function,
    gotoList: Function
  }

  renderSegmentData() {
    const { currentSegment, audienceCounts, campaign } = this.props;

    return (
      <div className="row">
        <div className="col-xs-6"><h4>Audience</h4></div>
        <div className="col-xs-6">{ currentSegment.name || 'All' } ({ `${ audienceCounts[campaign.segment || 'all'] || 0 } users`  })</div>
      </div>
    );
  }

  renderDelivery() {
    const { campaign } = this.props;

    let schedule = 'No Schedule';
    if (campaign.deliverySchedule) {
      if (campaign.deliverySchedule.frequency === 'immediate') {
        schedule = `${ campaign.deliverySchedule.frequency }`;
      } else {
        const utcOffset = moment().utcOffset();
        schedule = `${ campaign.deliverySchedule.frequency } - ${  campaign.deliverySchedule.repeat } - ${ moment(campaign.deliverySchedule.sendDate).subtract(utcOffset, 'minute').format('HH:mm') }`;
      }
    }
    return (
      <div className="row">
        <div className="col-xs-6"><h4>Schedule</h4></div>
        <div className="col-xs-6">{ schedule }</div>
      </div>
    );
  }

  renderAnalytics() {
    const byStatus = {};
    this.props.dpCount.forEach((d) => {
      byStatus[d._id.status] = d.count;
    });
    return (
      <div>
        <h3>Analytics</h3>
        <div className="row">
          <div className="col-xs-6"><h4>Total DP Count</h4></div>
          <div className="col-xs-6">{ `${ (byStatus[2] + byStatus[3]) || 0 }` }</div>
          <div className="col-xs-6"><h4>Total DP Click</h4></div>
          <div className="col-xs-6">{ `${ byStatus[3] || 0 }` }</div>
        </div>
      </div>
    );
  }

  render() {
    const { t, gotoList, campaign } = this.props;
    const { loaded } = this.state;

    if (!loaded) {
      return (
        <div className="c-container c-container__center">
          <ProgressBar mode="indeterminate" type="circular" multicolor />
        </div>
      );
    }

    return (
      <div className="c-container__large">
        <div className="page_header">
          <h2>
            { t('campaigns.preview.heading') }
            <Button className="pull-right" onClick={ gotoList } label={ t('campaigns.create.nav.gotoList') } raised primary />
          </h2>
        </div>
        <div className="c-campaign-detail">
          <h3>Details</h3>
          <div className="row">
            <div className="col-xs-6"><h4>Title</h4></div>
            <div className="col-xs-6">{ campaign.title }</div>
          </div>
          <div className="row">
            <div className="col-xs-6"><h4>Animation</h4></div>
            <div className="col-xs-6"><img className="table-animation-preview" src={ campaign.animation.url } /></div>
          </div>
          <div className="row">
            <div className="col-xs-6"><h4>Notification Message</h4></div>
            <div className="col-xs-6">{ campaign.message }</div>
            <div className="col-xs-6"><h4>Message Position</h4></div>
            <div className="col-xs-6">{ campaign.messagePosition }</div>
            <div className="col-xs-6"><h4>Campaign Type</h4></div>
            <div className="col-xs-6">{ campaign.campaignType }</div>
            <div className="col-xs-6"><h4>Action URL</h4></div>
            <div className="col-xs-6">{ campaign.url }</div>
          </div>
          <div className="row">
            <div className="col-xs-6"><h4>Targeted Platform</h4></div>
            <div className="col-xs-6">{ campaign.platform.map((p) => (<span key={ p.name }>{ p.name } ({ p.displayType.join(', ') })<br /></span>)) }</div>
          </div>
          { this.renderSegmentData() }
          { this.renderDelivery() }
          { this.renderAnalytics() }
        </div>
      </div>
    );
  }
}

const mapStatesToProps = ({ campaign: { campaign }, segments: { currentSegment }, analytics: { audienceCounts, dpCount } }) => ({ campaign, currentSegment, audienceCounts, dpCount });

const mapDispatchToProps = (dispatch) => ({
  readSegment: (id) => dispatch(segmentReadRequest(id)),
  readCampaign: (id) => dispatch(campaignReadRequest(id)),
  getAudienceCount: (...args) => dispatch(getAudienceCount(...args)),
  getDPCount: (...args) => dispatch(getDPCount(...args)),
  gotoList: () => dispatch(push('/app/campaigns'))
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(CampaignEdit));
