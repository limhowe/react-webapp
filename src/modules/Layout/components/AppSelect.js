import React, { Component } from 'react';
import { IconMenu, MenuItem, MenuDivider, Avatar, Button } from 'react-toolbox';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { changeCurrentApp } from '../../App/Applications/redux/actions';

export class AppSelect extends Component {
  displayName: 'AppSelect'
  state = { menuActive: false }
  props: {
    loading: bool,
    currentApp: Object,
    applications: Array<Object>,
    changeCurrentApp: Function,
    goAppCreate: Function,
    goAppList: Function
  }

  toggleMenu = () => {
    this.setState({ menuActive: !this.state.menuActive });
  }

  hideMenu = () => {
    this.setState({ menuActive: false });
  }

  render() {
    const { loading, currentApp, applications } = this.props;

    // render create app button if no application is create yet.
    if (loading) {
      return null;
    }

    if (!applications.length) {
      return <Button onClick={ this.props.goAppCreate }>Create First App</Button>;
    }

    // @TODO implement appIcon
    const menuItems = applications.map((app) => {
      const avatar = <Avatar title={ app.appName.toUpperCase() } />;
      return <MenuItem key={ app.appName } icon={ avatar } caption={ app.appName } onClick={ () => this.props.changeCurrentApp(app) } />;
    });
    const mainIcon = (
      <Avatar title={ currentApp.appName } />
    );

    return (
      <IconMenu icon={ mainIcon } position="topRight" active={ this.state.menuActive } onHide={ this.hideMenu }>
        { menuItems }
        <MenuDivider />
        <MenuItem caption="List apps" onClick={ this.props.goAppList } />
        <MenuItem caption="Add more app" onClick={ this.props.goAppCreate } />
      </IconMenu>
    );
  }
}

const mapStatesToProps = ({ application: { currentApp, applications, loading } }) => ({
  loading,
  currentApp,
  applications
});

const mapDispatchToProps = (dispatch) => ({
  changeCurrentApp: (app) => dispatch(changeCurrentApp(app)),
  goAppCreate: () => dispatch(push('/app/applications/new')),
  goAppList: () => dispatch(push('/app/applications'))
});

export default connect(mapStatesToProps, mapDispatchToProps)(AppSelect);
