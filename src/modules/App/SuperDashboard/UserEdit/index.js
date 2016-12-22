import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-toolbox';

import { adminReadRequest, initNewAdmin } from '../redux/actions';
import UserEditForm from './UserEditForm';

export class UserEdit extends Component {
  displayName: 'UserEdit'
  state = {
    loaded: false
  }
  componentWillMount() {
    const userId = this.props.params && this.props.params.userId;
    if (userId === 'new') {
      this.props.initNewAdmin();
      this.setState({ loaded: true });
    } else {
      this.props.adminReadRequest(userId).then(() => {
        this.setState({ loaded: true });
      });
    }
  }

  props: {
    params: Object,
    step: number,
    initNewAdmin: Function,
    adminReadRequest: Function
  }

  render() {
    const { loaded } = this.state;

    if (!loaded) {
      return (
        <div className="c-container c-container__center">
          <ProgressBar mode="indeterminate" type="circular" multicolor />
        </div>
      );
    }

    return (
      <div className="c-container__large">
        <UserEditForm />
      </div>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  adminReadRequest: (id) => dispatch(adminReadRequest(id)),
  initNewAdmin: () => dispatch(initNewAdmin())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
