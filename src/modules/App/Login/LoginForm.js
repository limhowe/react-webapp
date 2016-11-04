import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from 'react-toolbox';

import renderInput from '../../../helpers/renderInput';
import { authSigninRequest } from './redux/actions';

export class LoginForm extends Component {
  displayName: 'LoginForm';
  props: {
    handleSubmit: Function,
    signin: Function
  };

  render() {
    const { handleSubmit, signin } = this.props;
    return (
      <form onSubmit={ handleSubmit(signin) }>
        <Field name="email" type="email" label="Email" component={ renderInput } />
        <Field name="password" type="password" label="Password" component={ renderInput } />
        <Button label="Log In" primary raised />
      </form>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  signin: (authData) => {
    dispatch(authSigninRequest(authData));
  }
});

export default reduxForm({
  form: 'user-login'
})(
  connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);
