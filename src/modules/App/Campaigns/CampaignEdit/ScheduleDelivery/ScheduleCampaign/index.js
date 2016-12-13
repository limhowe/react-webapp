import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import moment from 'moment-timezone';
import { Switch, Dropdown, TimePicker } from 'react-toolbox';

import { SCHEDULE_FREQUENCY, SCHEDULE_REPEAT } from '../../../../../../constants/CampaignSchedule';
import { changeScheduleType, editScheduleField } from '../../../redux/actions';
import ExpiresAt from './ExpiresAt';
import TimeZones from './TimeZones';

export class ScheduleCampaign extends Component {
  displayName: 'ScheduleCampaign';

  props: {
    t: Function,
    campaignSchedule: Object,
    changeScheduleType: Function,
    editScheduleField: Function
  }

  toggleDeliverySchedule = () => {
    const { campaignSchedule: { type } } = this.props;
    this.props.changeScheduleType(type === 'schedule' ? 'action' : 'schedule');
  }

  editScheduleField = (field) =>
    (value) => this.props.editScheduleField(field, value)

  editScheduleTimeField = (field) =>
    (value) => this.props.editScheduleField(field, moment(value).utcOffset(0, true).format())

  getLocalTime = (val) => {
    const utcOffset = moment().utcOffset();
    const newVal = moment(val).utcOffset(utcOffset).subtract(utcOffset, 'minute').toDate();
    return newVal;
  }

  renderSchedulingFields() {
    const { t, campaignSchedule: { schedule } } = this.props;
    const repeatSource = Object.keys(SCHEDULE_REPEAT).map((key) => ({
      value: SCHEDULE_REPEAT[key],
      label: t(`campaigns.create.scheduleDelivery.scheduleRepeat.${ SCHEDULE_REPEAT[key] }`)
    }));

    return (
      <div>
        <Dropdown
          allowBlank={ false }
          source={ repeatSource }
          onChange={ this.editScheduleField('repeat') }
          label={ t('campaigns.create.scheduleDelivery.schedule.repeat') }
          value={ schedule.repeat }
        />
        <div className="row">
          <div className="col-lg-6">
            <TimePicker
              label={ t('shared.time') }
              onChange={ this.editScheduleTimeField('sendDate') }
              value={ this.getLocalTime(schedule.sendDate) }
            />
          </div>
          <div className="col-lg-6">
            <TimeZones />
          </div>
        </div>
        <ExpiresAt />
      </div>
    );
  }

  renderFields() {
    const { t, campaignSchedule } = this.props;
    const schedule = campaignSchedule.schedule;
    const frequencySource = Object.keys(SCHEDULE_FREQUENCY).map((key) => ({
      value: SCHEDULE_FREQUENCY[key],
      label: t(`campaigns.create.scheduleDelivery.scheduleFrequency.${ SCHEDULE_FREQUENCY[key] }`)
    }));

    if (campaignSchedule.type !== 'schedule') {
      return null;
    }

    return (
      <div>
        <Dropdown
          allowBlank={ false }
          source={ frequencySource }
          onChange={ this.editScheduleField('frequency') }
          label={ t('campaigns.create.scheduleDelivery.schedule.send') }
          value={ schedule.frequency }
        />
        { schedule.frequency === 'scheduled' ? this.renderSchedulingFields() : null }
      </div>
    );
  }

  render() {
    const { t, campaignSchedule } = this.props;
    return (
      <div className="panel">
        <Switch checked={ campaignSchedule.type === 'schedule' } label={ t('campaigns.create.scheduleDelivery.schedule.heading') } onChange={ this.toggleDeliverySchedule } />
        <small className="text-muted">{ t('campaigns.create.scheduleDelivery.schedule.subtitle') }</small>
        { this.renderFields() }
      </div>
    );
  }
}

const mapStatesToProps = ({ campaign: { campaignSchedule } }) => ({ campaignSchedule });

const mapDispatchToProps = (dispatch) => ({
  changeScheduleType: (...args) => dispatch(changeScheduleType(...args)),
  editScheduleField: (...args) => dispatch(editScheduleField(...args))
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(ScheduleCampaign));
