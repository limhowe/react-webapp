import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from 'react-toolbox';

import renderInput from '../../../../helpers/renderInput';
import { authSignupRequest } from '../redux/actions';

// @TODO move validation redux actions
const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'First name is required';
  }

  if (!values.lastName) {
    errors.lastName = 'Last name is required';
  }

  if (!values.email) {
    errors.email = 'Email is Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  if (values.password && values.password.length < 8) {
    errors.password = 'Password should contain at least 8 characters';
  }

  if (values.password && values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Password and confirm password does not match';
  }

  if (!values.company) {
    errors.company = 'Company name is required';
  }

  if (!values.phone) {
    errors.phone = 'Phone number is required';
  }

  if (!values.address) {
    errors.address = 'Address is required';
  }
  return errors;
};

export class SignUpForm extends Component {
  displayName: 'SignUpForm';
  props: {
    handleSubmit: Function,
    signup: Function,
    submitting: bool,
    pristine: bool
  };

  render() {
    const { handleSubmit, signup, pristine, submitting } = this.props;
    return (
      <form onSubmit={ handleSubmit(signup) }>
        <div className="row">
          <div className="col-sm-6">
            <Field name="firstName" type="text" label="First Name" component={ renderInput } required />
          </div>
          <div className="col-sm-6">
            <Field name="lastName" type="text" label="Last Name" component={ renderInput } required />
          </div>
          <div className="col-sm-6">
            <Field name="email" type="email" label="Email" component={ renderInput } required />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <Field name="password" type="password" label="Password" component={ renderInput } required />
          </div>
          <div className="col-sm-6">
            <Field name="confirmPassword" type="password" label="Confirm Password" component={ renderInput } required />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <Field name="company" type="text" label="Company Name" component={ renderInput } required />
          </div>
          <div className="col-sm-6">
            <Field name="phone" type="text" label="Phone Number" component={ renderInput } required />
          </div>
          <div className="col-sm-12">
            <Field name="address" type="text" label="Address" component={ renderInput } required />
          </div>
        </div>
        <Button label="Create Account" disabled={ pristine || submitting } primary raised />
      </form>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  signup: (authData) => {
    dispatch(authSignupRequest(authData));
  }
});

export default reduxForm({
  form: 'user-signup',
  validate
})(
  connect(mapStateToProps, mapDispatchToProps)(SignUpForm)
);
