import React, { Component } from 'react';
import { Button, Dropdown } from 'react-toolbox/lib';
import { ProgressBar } from 'react-toolbox';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';

import SegmentConfigurator from '../../../Segments/SegmentConfigurator';

import { changeTabIndex, editCampaignField, saveCampaignRequest } from '../../redux/actions';
import { segmentListRequest, setCurrentSegment } from '../../../Segments/redux/actions';

export class SelectAudience extends Component {
  displayName: 'SelectAudience'
  state = {
  }
  componentWillMount() {
    this.props.listSegments().then(() => {
      if (this.props.campaign.segment) {
        this.props.setCurrentSegment(this.props.segments.find((s) => {
          return s._id === this.props.campaign.segment;
        }));
      }
    });
  }
  props: {
    t: Function,
    loading: bool,
    reading: bool,
    campaign: Object,
    segments: Array<Object>,
    changeTab: Function,
    listSegments: Function,
    setCurrentSegment: Function,
    editCampaignField: Function,
    saveCampaign: Function
  }

  editField = (field) => (...args) => this.props.editCampaignField(field, ...args);
  editSegment = (value) => {
    if (value !== null) {
      this.props.setCurrentSegment(this.props.segments.find((s) => {
        return s._id === value;
      }));
    }
    this.props.editCampaignField('segment', value);
  }

  handleChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
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

  render() {
    if (this.props.loading) {
      return (
        <div className="c-container c-container__center">
          <ProgressBar mode="indeterminate" type="circular" multicolor />
        </div>
      );
    }

    const { t, changeTab, saveCampaign, campaign, reading } = this.props;
    const segments = this.props.segments.map((s) => ({
      value: s._id,
      label: s.name
    }));
    segments.unshift({ value: null, label: 'All' });

    return (
      <div>
        <h3 className="tab-heading">{ t('campaigns.create.selectAudience.heading') }</h3>
        <div><small className="text-muted">{ t('campaigns.create.selectAudience.subtitle') }</small></div>
        <div className="row">
          <div className="col-md-12">
            <Dropdown
              label={ t('campaigns.create.selectAudience.selectSegment') }
              onChange={ this.editSegment.bind(this) }
              source={ segments }
              value={ campaign.segment }
            />
          </div>
          <div className="col-md-12">
            {
              campaign.segment !== null && !reading ? (
                <SegmentConfigurator />
              ) : null
            }
          </div>
        </div>
        <div className="form-buttons">
          <Button icon="chevron_left" onClick={ () => changeTab(3) } label={ t('campaigns.create.scheduleDelivery.back') } raised />
          <Button onClick={ saveCampaign } label={ t('campaigns.create.selectAudience.next') } raised primary />
        </div>
      </div>
    );
  }
}

const mapStatesToProps = ({ campaign: { campaign }, segments: { segments, listLoading, reading } }) => ({ campaign, segments, loading: listLoading, reading });

const mapDispatchToProps = (dispatch) => ({
  listSegments: () => dispatch(segmentListRequest()),
  setCurrentSegment: (segment) => dispatch(setCurrentSegment(segment)),
  changeTab: (index) => dispatch(changeTabIndex(index)),
  editCampaignField: (field, value) => dispatch(editCampaignField(field, value)),
  saveCampaign: () => dispatch(saveCampaignRequest())
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(SelectAudience));
