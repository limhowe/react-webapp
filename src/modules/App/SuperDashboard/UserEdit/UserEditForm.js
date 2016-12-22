import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Input, Button, ProgressBar, Switch } from 'react-toolbox';
import { editAdminField, adminCreateRequest, adminUpdateRequest } from '../redux/actions';
import { hasErrors } from '../redux/selector';

export class UserEditForm extends Component {
  displayName: 'UserEditForm'
  props: {
    adminCreateRequest: Function,
    adminUpdateRequest: Function,
    editAdminField: Function,
    goList: Function,
    t: Function,
    saving: bool,
    editingAdmin: Object,
    formErrors: bool,
    editing: bool,
    hasErrors: bool
  }

  editField = (field) =>
    (value) => this.props.editAdminField(field, value, this.props.editing);

  togggleActivate = (value) => {
    this.props.editAdminField('disabled', !value);
  }

  save = () => {
    if (this.props.editing) {
      this.props.adminUpdateRequest(this.props.editingAdmin);
    } else {
      this.props.adminCreateRequest(this.props.editingAdmin);
    }
  }

  getErrorMessage = (field) => {
    const { t, formErrors } = this.props;
    const error = formErrors[field];
    if (error) {
      if (typeof error === 'string') {
        return t(`validation.${ error }`);
      } else {
        return t(`validation.${ error[0] }`, error[1]);
      }
    }

    return '';
  }

  render() {
    const { saving, editing, t, goList, editingAdmin } = this.props;
    return (
      <div>
        <h2>{ editing ? t('users.editCompany') : t('users.createCompany') }</h2>
        { saving ? <ProgressBar mode="indeterminate" multicolor /> : null }
        <div className="row">
          <div className="col-sm-6">
            <Input type="text" label={ t('users.firstName') } error={ this.getErrorMessage('firstName') } value={ editingAdmin.firstName } onChange={ this.editField('firstName') } required />
          </div>
          <div className="col-sm-6">
            <Input type="text" label={ t('users.lastName') } error={ this.getErrorMessage('lastName') } value={ editingAdmin.lastName } onChange={ this.editField('lastName') } required />
          </div>
          <div className="col-sm-6">
            <Input type="email" label={ t('users.email') } error={ this.getErrorMessage('email') } value={ editingAdmin.email } onChange={ this.editField('email') } required />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <Input type="text" label={ t('users.password') } error={ this.getErrorMessage('password') } value={ editingAdmin.password } onChange={ this.editField('password') } />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <Input type="text" label={ t('users.company') } error={ this.getErrorMessage('company') } value={ editingAdmin.company } onChange={ this.editField('company') } required />
          </div>
          <div className="col-sm-6">
            <Input type="text" label={ t('users.phone') } error={ this.getErrorMessage('phone') } value={ editingAdmin.phone } onChange={ this.editField('phone') } required />
          </div>
          <div className="col-sm-12">
            <Input type="text" label={ t('users.address') } error={ this.getErrorMessage('address') } value={ editingAdmin.address } onChange={ this.editField('address') } required />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <Switch label={ t('users.verified') } checked={ editingAdmin.verified } onChange={ this.editField('verified') } />
          </div>
          <div className="col-sm-6">
            <Switch label={ t('users.activated') } checked={ !editingAdmin.disabled } onChange={ this.togggleActivate } />
          </div>
        </div>
        <Button label={ t('users.save') } onClick={ this.save } primary raised disabled={ saving || this.props.hasErrors } />&nbsp;
        <Button label={ t('shared.cancel') } onClick={ goList } raised />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { superdashboard: { formErrors, saving, editingAdmin } } = state;
  return {
    editingAdmin,
    saving,
    formErrors,
    editing: !!(editingAdmin && editingAdmin._id),
    hasErrors: hasErrors(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  editAdminField: (...args) => dispatch(editAdminField(...args)),
  adminCreateRequest: (...args) => dispatch(adminCreateRequest(...args)),
  adminUpdateRequest: (...args) => dispatch(adminUpdateRequest(...args)),
  goList: () => dispatch(push('/app/companies'))
});

export default translate()(connect(mapStateToProps, mapDispatchToProps)(UserEditForm));
