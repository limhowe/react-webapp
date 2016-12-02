import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-toolbox';

import { verifyAccountRequest } from '../redux/actions';

export class VerifyAccount extends Component {
  displayName: 'VerifyAccount';

  componentWillMount() {
    this.props.verifyAccount({
      email: this.props.location.query.email,
      confirmToken: this.props.location.query.verifyToken
    });
  }

  props: {
    verifyAccount: Function,
    location: Object
  }

  render() {
    return (
      <div className="c-container__medium">
        <ProgressBar mode="indeterminate" type="circular" multicolor />
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  verifyAccount: (email) => dispatch(verifyAccountRequest(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAccount);
