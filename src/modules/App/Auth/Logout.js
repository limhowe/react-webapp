import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-toolbox';

import { authSignoutRequest } from './redux/actions';

export class Logout extends Component {
  displayName: 'Logout';

  componentWillMount() {
    this.props.signout();
  }

  props: {
    signout: Function
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
  signout: () => dispatch(authSignoutRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
