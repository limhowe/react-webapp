import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Input, Button, ProgressBar } from 'react-toolbox';

import { editAppField, saveApp } from '../../redux/actions';

export class BasicInfo extends Component {
  displayName: 'BasicInfo'
  props: {
    activeApp: Object,
    saveApplication: Function,
    editAppField: Function,
    goList: Function,
    t: Function,
    saving: bool,
    editing: bool
  }

  editField = (field) =>
    (...args) => this.props.editAppField(field, ...args);

  render() {
    const { saveApplication, activeApp, saving, editing, t, goList } = this.props;
    return (
      <div>
        <h2>{ editing ? t('applications.updateYourApp') : t('applications.addYourApp') }</h2>
        { editing ? <p>{ t('applications.welcomeMessage', { applicationName: __APP_CONFIG__.APP_NAME })}</p> : null }
        { saving ? <ProgressBar mode="indeterminate" multicolor /> : null }
        <Input type="text" value={ activeApp.appName } onChange={ this.editField('appName') } required label={ t('applications.appName') } />
        <Input type="text" value={ activeApp.packageName } onChange={ this.editField('packageName') } required label={ t('applications.packageName') } />
        <p>-- App Icon will be here once api is updated --</p>
        <Button label={ t('applications.nextRegisterYourApp') } onClick={ saveApplication } primary raised disabled={ saving } />&nbsp;
        <Button label={ t('shared.cancel') } onClick={ goList } raised />
      </div>
    );
  }
}

const mapStateToProps = ({ application: { activeApp, saving } }) => ({
  activeApp,
  saving,
  editing: !!(activeApp && activeApp._id)
});

const mapDispatchToProps = (dispatch) => ({
  editAppField: (field, value) => dispatch(editAppField(field, value)),
  saveApplication: () => dispatch(saveApp()),
  goList: () => dispatch(push('/app/applications'))
});

export default translate()(connect(mapStateToProps, mapDispatchToProps)(BasicInfo));
