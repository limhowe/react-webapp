import React, { Component } from 'react';
import { Menu, MenuItem, MenuDivider, Button, FontIcon } from 'react-toolbox';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import cn from 'classnames';

import { changeCurrentApp } from '../../../App/Applications/redux/actions';
import AppIcon from '../../../../components/AppIcon';
import styles from './styles/AppSelect.scss';
import menuTheme from './styles/Menu.scss';

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

    const menuItems = applications.map((app) => {
      const avatar = <AppIcon image={ app.image } />;
      return <MenuItem theme={ menuTheme } key={ app.appName } icon={ avatar } caption={ app.appName } onClick={ () => this.props.changeCurrentApp(app) } />;
    });

    const appName = currentApp.appName.length < 10 ? currentApp.appName : `${ currentApp.appName.substr(0, 10) }...`;
    const buttonClassName = cn(styles.selectedAppIconWrapper, {
      [styles.active]: this.state.menuActive
    });

    return (
      <div className={ styles.appSelect }>
        <div className={ buttonClassName } onClick={ this.toggleMenu }>
          <AppIcon image={ currentApp.image } />
          <small>{ appName }<FontIcon value="keyboard_arrow_down" className="c-icon" /></small>
        </div>
        <div className="u-position-relative">
          <Menu theme={ menuTheme } position="topLeft" active={ this.state.menuActive } onHide={ this.hideMenu }>
            { menuItems }
            <MenuDivider />
            <MenuItem theme={ menuTheme } caption="List apps" onClick={ this.props.goAppList } />
            <MenuItem theme={ menuTheme } caption="Add more app" onClick={ this.props.goAppCreate } />
          </Menu>
        </div>
      </div>
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
