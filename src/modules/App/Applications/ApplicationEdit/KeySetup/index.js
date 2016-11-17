import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Input, Button, ProgressBar, Tabs, Tab } from 'react-toolbox';

import { editAppField, saveApp, changeStep } from '../../redux/actions';

export class KeySetup extends Component {
  displayName: 'KeySetup'
  state = {
    tabIndex: 0
  }
  props: {
    activeApp: Object,
    saveApplication: Function,
    editAppField: Function,
    changeStep: Function,
    t: Function,
    saving: bool,
    step: number
  }

  handleTabChange = (tabIndex) => this.setState({ tabIndex })

  editField = (field) =>
    (...args) => this.props.editAppField(field, ...args);

  goPrevStep = () => this.props.changeStep(this.props.step - 1)

  render() {
    const { saveApplication, activeApp, saving, t } = this.props;
    return (
      <div>
        <h2>{ t('applications.updateYourApp') }</h2>
        <p>{ t('applications.registerYourApp', { applicationName: __APP_CONFIG__.APP_NAME })}</p>
        { saving ? <ProgressBar mode="indeterminate" multicolor /> : null }
        <div className="row">
          <div className="col-sm-6">
            <Input type="text" value={ activeApp.apiKey } label={ t('applications.dpAPIKey') } />
            <Input type="text" value={ activeApp.apiSecret } label={ t('applications.dpAPISecret') } />
          </div>
          <div className="col-sm-6">
            <p><small>{ t('applications.apiTooltip', { applicationName: __APP_CONFIG__.APP_NAME }) }</small></p>
          </div>
        </div>
        <div className="row">
          <Tabs index={ this.state.tabIndex } onChange={ this.handleTabChange }>
            <Tab label="Android">
              <Input type="text" value={ activeApp.fcmServerKey } onChange={ this.editField('fcmServerKey') } required label={ t('applications.fcmServerKey') } />
            </Tab>
            <Tab label="iOS">
              TBD for iOS Pems
            </Tab>
          </Tabs>
        </div>
        <Button label={ t('shared.save') } onClick={ saveApplication } primary raised disabled={ saving } />
        <Button label={ t('shared.cancel') } onClick={ this.goPrevStep } raised />
      </div>
    );
  }
}

const mapStateToProps = ({ application: { activeApp, saving, step } }) => ({
  activeApp,
  saving,
  step
});

const mapDispatchToProps = (dispatch) => ({
  editAppField: (field, value) => dispatch(editAppField(field, value)),
  saveApplication: () => dispatch(saveApp()),
  changeStep: (newStep) => dispatch(changeStep(newStep))
});

export default translate()(connect(mapStateToProps, mapDispatchToProps)(KeySetup));
