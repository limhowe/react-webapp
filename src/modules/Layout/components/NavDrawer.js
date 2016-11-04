import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavDrawer } from 'react-toolbox';

import { hideNavDrawer } from '../redux/actions';

export class SideBar extends Component {
  static displayName = 'NavDrawer';
  props: {
    active: bool,
    hide: Function,
    user: ?Object
  };

  render() {
    const { active, hide, user } = this.props;
    if (!user) {
      return null;
    }

    return (
      <NavDrawer
        active={ active }
        permanentAt="md"
        onOverlayClick={ hide }
      >
        Placeholder for sidebar
      </NavDrawer>
    );
  }
}

const mapStatesToProps = ({ layout: { navDrawerActive }, auth: { user } }) => ({
  active: navDrawerActive,
  user
});

const mapDispatchToProps = (dispatch) => ({
  hide: () => dispatch(hideNavDrawer())
});

export default connect(mapStatesToProps, mapDispatchToProps)(SideBar);
