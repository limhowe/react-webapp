import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { DatePicker, TimePicker } from 'react-toolbox';
import moment from 'moment';

import { editCampaignField } from '../../../redux/actions';

export class ExpiresAt extends Component {
  displayName: 'ExpiresAt';

  props: {
    t: Function,
    campaign: Object,
    editCampaignField: Function
  }

  getLocalTime = (val) => {
    const utcOffset = moment().utcOffset();
    const newVal = moment(val).utcOffset(utcOffset).subtract(utcOffset, 'minute').toDate();
    return newVal;
  }

  editField = (value) => this.props.editCampaignField('expiresAt', moment(value).utcOffset(0, true).format())

  render() {
    const { t, campaign } = this.props;

    const date = campaign.expiresAt ? this.getLocalTime(campaign.expiresAt) : moment.utc().add(1, 'day').startOf('day').toDate();

    return (
      <div>
        <h4 className="margin-t-40">{ t('campaigns.create.scheduleDelivery.schedule.expirationNote') }</h4>
        <div className="row">
          <div className="col-lg-6">
            <DatePicker
              label={ t('campaigns.create.scheduleDelivery.schedule.expirationDate') }
              minDate={ new Date() }
              onChange={ this.editField }
              value={ date }
              sundayFirstDayOfWeek
            />
          </div>
          <div className="col-lg-6">
            <TimePicker
              label={ t('campaigns.create.scheduleDelivery.schedule.expirationTime') }
              onChange={ this.editField }
              value={ date }
            />
          </div>
        </div>
      </div>
    );
  }
}


const mapStatesToProps = ({ campaign: { campaign } }) => ({ campaign });

const mapDispatchToProps = (dispatch) => ({
  editCampaignField: (...args) => dispatch(editCampaignField(...args))
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(ExpiresAt));
