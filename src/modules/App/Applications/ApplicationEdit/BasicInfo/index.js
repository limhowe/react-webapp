import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Input, Button, ProgressBar, Dropdown } from 'react-toolbox';
import Dropzone from 'react-dropzone';

import AppIcon from '../../../../../components/AppIcon';
import { editAppField, saveApp, appImageUpload } from '../../redux/actions';
import { ENVIRONMENTS } from '../../../../../constants/Application';

export class BasicInfo extends Component {
  displayName: 'BasicInfo'
  props: {
    activeApp: Object,
    saveApplication: Function,
    editAppField: Function,
    goList: Function,
    uploadImage: Function,
    t: Function,
    saving: bool,
    currentApp: Object,
    imgUploading: bool,
    editing: bool
  }

  onDrop = (files) => {
    if (files.length === 0) {
      return;
    } else {
      const payload = new FormData();
      payload.append('image', files[0]);
      this.props.uploadImage(payload);
    }
  };

  triggerUpload = () => {
    this.dropzone.open();
  }

  editField = (field) =>
    (...args) => this.props.editAppField(field, ...args);

  render() {
    const { saveApplication, activeApp, saving, editing, t, goList, imgUploading, currentApp } = this.props;
    const environments = Object.keys(ENVIRONMENTS).map((key) => ({
      label: t(`applications.${ ENVIRONMENTS[key] }`),
      value: ENVIRONMENTS[key]
    }));
    return (
      <div>
        <h2>{ editing ? t('applications.updateYourApp') : (currentApp ? t('applications.addYourApp') : t('applications.addYourFirstApp')) }</h2>
        { editing ? <p>{ t('applications.welcomeMessage', { applicationName: __APP_CONFIG__.APP_NAME })}</p> : null }
        { saving ? <ProgressBar mode="indeterminate" multicolor /> : null }
        <Input type="text" value={ activeApp.appName } onChange={ this.editField('appName') } required label={ t('applications.appName') } />
        <Input type="text" value={ activeApp.packageName } onChange={ this.editField('packageName') } required label={ t('applications.packageName') } />
        <Dropdown source={ environments } onChange={ this.editField('environment') } value={ activeApp.environment } required label={ t('applications.environment') } />
        <div className="u-margin-bottom-lg">
          <h4>{t('applications.appIcon')}</h4>
          <div className="pull-left u-margin-right-sm">
            { !imgUploading ? <AppIcon image={ activeApp.image } /> : null }
            { imgUploading ? <ProgressBar mode="indeterminate" multicolor type="circular" /> : null }
          </div>
          <small>{t('applications.iconTooltip')}</small>
          <br />
          <a href="#" onClick={ this.triggerUpload }>{t('applications.uploadAnotherIcon')}</a>
          <Dropzone ref={ (c) => { this.dropzone = c; } } style={ { display: 'none' } } onDrop={ this.onDrop } />
        </div>
        <Button label={ t('applications.nextRegisterYourApp') } onClick={ saveApplication } primary raised disabled={ saving || imgUploading } />&nbsp;
        <Button label={ t('shared.cancel') } onClick={ goList } raised />
      </div>
    );
  }
}

const mapStateToProps = ({ application: { activeApp, saving, imgUploading, currentApp } }) => ({
  activeApp,
  saving,
  imgUploading,
  currentApp,
  editing: !!(activeApp && activeApp._id)
});

const mapDispatchToProps = (dispatch) => ({
  editAppField: (field, value) => dispatch(editAppField(field, value)),
  saveApplication: () => dispatch(saveApp()),
  uploadImage: (...args) => dispatch(appImageUpload(...args)),
  goList: () => dispatch(push('/app/applications'))
});

export default translate()(connect(mapStateToProps, mapDispatchToProps)(BasicInfo));
