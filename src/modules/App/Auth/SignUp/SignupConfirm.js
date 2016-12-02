import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resendConfirmEmailRequest } from '../redux/actions';

export class SignupConfirm extends Component {
  displayName: 'SignupConfirm';

  props: {
    resendConfirmEmail: Function,
    location: Object
  }

  onSend = () => {
    if (this.props.location.query.email) {
      this.props.resendConfirmEmail(this.props.location.query.email);
    }
  }

  render() {
    return (
      <div className="c-container__medium">
        <h2>Create Account</h2>
        <h3>You are almost done</h3>
        <p>An email has been sent to the address you provided. The email contains a verification link to sign in.</p>
        <p>Didn't receive one? <a href="#" onClick={ this.onSend }>We'll send you new one</a></p>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  resendConfirmEmail: (email) => dispatch(resendConfirmEmailRequest(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupConfirm);
