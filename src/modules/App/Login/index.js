import React, { Component } from 'react';
import { Link } from 'react-toolbox';
import LoginForm from './LoginForm';
import styles from '../../../styles';

export class Login extends Component {
  displayName: 'Login';

  render() {
    return (
      <div className={ styles['c-container__small'] }>
        <h2>Log In</h2>
        <LoginForm />
        <Link href="/app/forgot-password" label="Forgot password ?" />
      </div>
    );
  }
}

export default Login;
