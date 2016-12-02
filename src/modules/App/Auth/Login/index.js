import React, { Component } from 'react';
import { Link } from 'react-toolbox';
import LoginForm from './LoginForm';

export class Login extends Component {
  displayName: 'Login';

  render() {
    return (
      <div className="c-container__small">
        <h2>Log In</h2>
        <LoginForm />
        <Link href="/app/forgot-password" label="Forgot password ?" />
        <Link href="/app/auth/signup" label="Create Account" />
      </div>
    );
  }
}

export default Login;
