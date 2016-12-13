import React, { Component } from 'react';
import { Switch } from 'react-toolbox';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { editCampaignField } from '../../../redux/actions';

export class ActionTrigger extends Component {
  displayName: 'ActionTrigger';
  props: {
    t: Function,
    campaign: Object,
    editCampaignField: Function
  }


  triggerEventOptions = [
    { value: 1, text: 'Inactivity' }
  ];

  appInactiveDaysOptions = [
    { value: 1, text: '1 day' },
    { value: 2, text: '2 days' },
    { value: 3, text: '3 days' },
    { value: 4, text: '4 days' },
    { value: 5, text: '5 days' },
    { value: 6, text: '6 days' },
    { value: 7, text: '7 days' },
    { value: 10, text: '10 days' },
    { value: 15, text: '15 days' }
  ];

  numberDPsOptions = [
    { value: 1, text: '1 DP' },
    { value: 2, text: '2 DPs' },
    { value: 3, text: '3 DPs' }
  ];

  daysOptions = [
    { value: 1, text: '1 day' },
    { value: 2, text: '2 days' },
    { value: 3, text: '3 days' },
    { value: 4, text: '4 days' },
    { value: 5, text: '5 days' }
  ];

  render() {
    const { t } = this.props;
    return (
      <div className="panel">
        <Switch
          checked={ false }
          label={ t('campaigns.create.scheduleDelivery.action.heading') }
          disabled
        />
        <small className="text-muted">{ t('campaigns.create.scheduleDelivery.action.subtitle') }</small>
        {/* {
          this.state.toggleDeliveryAction ? (
            <div className="margin-t-40">
              <Dropdown
                allowBlank={ false }
                source={ this.triggerEventOptions }
                onChange={ this.handleChange.bind(this, 'triggerEvent') }
                label={ t('campaigns.create.scheduleDelivery.action.selectEvent') }
                template={ this.dropDownItemTextTemplate }
                value={ this.state.triggerEvent }
              />
              <Dropdown
                allowBlank={ false }
                source={ this.appInactiveDaysOptions }
                onChange={ this.editDeliveryActionField('inactiveDays') }
                label={ t('campaigns.create.scheduleDelivery.action.idleDays') }
                template={ this.dropDownItemTextTemplate }
                value={ campaign.deliveryAction.inactiveDays }
              />
              <div className="row">
                <div className="col-md-6">
                  <Dropdown
                    allowBlank={ false }
                    source={ this.numberDPsOptions }
                    onChange={ this.editDeliveryActionField('dpLimit') }
                    label={ t('campaigns.create.scheduleDelivery.action.sendLimit') }
                    template={ this.dropDownItemTextTemplate }
                    value={ campaign.deliveryAction.dpLimit }
                  />
                </div>
                <div className="col-md-6">
                  <Dropdown
                    allowBlank={ false }
                    source={ this.daysOptions }
                    onChange={ this.editDeliveryActionField('dayLimit') }
                    label={ t('campaigns.create.scheduleDelivery.action.withIn') }
                    template={ this.dropDownItemTextTemplate }
                    value={ campaign.deliveryAction.dayLimit }
                  />
                </div>
              </div>
            </div>
          ) : null
        } */}
      </div>
    );
  }
}

const mapStatesToProps = ({ campaign: { campaign } }) => ({ campaign });

const mapDispatchToProps = (dispatch) => ({
  editCampaignField: (...args) => dispatch(editCampaignField(...args))
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(ActionTrigger));
