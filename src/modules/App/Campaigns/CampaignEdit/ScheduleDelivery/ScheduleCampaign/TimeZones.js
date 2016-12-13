import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Autocomplete } from 'react-toolbox';
import { connect } from 'react-redux';
import moment from 'moment';

import theme from './styles/AutoComplete.scss';
import { editScheduleField } from '../../../redux/actions';

export class TimeZones extends Component {
  displayName: 'TimeZones';

  props: {
    t: Function,
    editScheduleField: Function,
    campaignSchedule: Object
  }

  onChange = (val) => {
    this.props.editScheduleField('timeZone', val);
  }

  render() {
    const { t, campaignSchedule } = this.props;
    const source = moment.tz.names();

    return (
      <Autocomplete
        theme={ theme }
        direction="down"
        multiple={ false }
        label={ t('campaigns.create.scheduleDelivery.schedule.selectTimezone') }
        onChange={ this.onChange }
        source={ source }
        value={ campaignSchedule.schedule.timeZone }
      />
    );
  }
}

const mapStatesToProps = ({ campaign: { campaignSchedule } }) => ({ campaignSchedule });

const mapDispatchToProps = (dispatch) => ({
  editScheduleField: (...args) => dispatch(editScheduleField(...args))
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(TimeZones));
