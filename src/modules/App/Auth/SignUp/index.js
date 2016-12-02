import React, { Component } from 'react';
import SignUpForm from './SignUpForm';

export class SignUp extends Component {
  displayName: 'SignUp';

  render() {
    return (
      <div className="c-container__medium">
        <h2>Create Account</h2>
        <SignUpForm />
      </div>
    );
  }
}

export default SignUp;
