import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import moment from 'moment';
import { IconButton, Button, Tooltip } from 'react-toolbox';
import { push } from 'react-router-redux';

import Table from '../../../../components/Table';
import { adminListRequest, adminFetchTokenRequest, adminUpdateRequest } from '../redux/actions';
import { changeBehalfUser } from '../../Auth/redux/actions';
import { appListRequest, changeCurrentApp } from '../../Applications/redux/actions';

const TooltipIconButton = new Tooltip(IconButton);

export class AdminList extends Component {
  displayName: 'AdminList'

  componentWillMount() {
    this.props.listAdmins({ role: 'admin' });
  }

  props: {
    users: Array<any>,
    listLoading: bool,
    listAdmins: Function,
    fetchToken: Function,
    changeBehalfUser: Function,
    appListRequest: Function,
    changeCurrentApp: Function,
    updateAdmin: Function,
    changeLocation: Function
  }

  signinBehalf(userId) {
    this.props.fetchToken(userId).then((otherUser) => {
      this.props.changeCurrentApp(null);
      this.props.changeBehalfUser(otherUser);
      this.props.appListRequest();
    });
  }

  activate(user) {
    this.props.updateAdmin({
      ...user,
      disabled: false
    }, {
      successMessage: 'Account activated.'
    }).then(() => {
      this.props.listAdmins({ role: 'admin' });
    });
  }

  deactivate(user) {
    this.props.updateAdmin({
      ...user,
      disabled: true
    }, {
      successMessage: 'Account deactivated.'
    }).then(() => {
      this.props.listAdmins({ role: 'admin' });
    });
  }

  render() {
    const { users, listLoading, changeLocation } = this.props;
    const model = {
      company: { title: 'Company' },
      name: { title: 'User Name' },
      email: { title: 'Email' },
      verified: { title: 'Verified' },
      activated: { title: 'Activated' },
      created: { title: 'Account Created' },
      actions: { title: 'Actions' }
    };

    const extendedUsers = users.map((user) => ({
      ...user,
      name: `${ user.firstName } ${ user.lastName }`,
      created: moment(user.created).format('MM/DD/YYYY'),
      verified: user.verified ? 'Yes' : 'No',
      activated: !user.disabled ? 'Yes' : 'No',
      actions: (
        <span>
          <TooltipIconButton icon="exit_to_app" onClick={ () => this.signinBehalf(user._id) } primary tooltip="View Dashboard As This User" />
          <TooltipIconButton icon="edit" onClick={ () => changeLocation(`/app/companies/${ user._id }`) } primary tooltip="Edit User" />
          { !user.disabled ? <TooltipIconButton icon="lock" onClick={ () => this.deactivate(user) } primary tooltip="Deactivate" /> : null }
          { user.disabled ? <TooltipIconButton icon="lock_open" onClick={ () => this.activate(user) } primary tooltip="Activate" /> : null }
        </span>
      )
    }));

    return (
      <div className="c-container__large">
        <div className="row">
          <div className="col-sm-8">
            <h2>Companies</h2>
          </div>
          <div className="col-sm-4 text-right u-padding-top-lg">
            <Button label="Add New Company" primary raised onClick={ () => changeLocation('/app/companies/new') } />
          </div>
        </div>
        <Table model={ model } source={ extendedUsers } loading={ listLoading } selectable={ false } />
      </div>
    );
  }
}

const mapStatesToProps = ({ superdashboard: { users, listLoading } }) => ({
  users,
  listLoading
});

const mapDispatchToProps = (dispatch) => ({
  listAdmins: (...args) => dispatch(adminListRequest(...args)),
  updateAdmin: (...args) => dispatch(adminUpdateRequest(...args)),
  fetchToken: (...args) => dispatch(adminFetchTokenRequest(...args)),
  changeBehalfUser: (...args) => dispatch(changeBehalfUser(...args)),
  appListRequest: (...args) => dispatch(appListRequest(...args)),
  changeCurrentApp: (...args) => dispatch(changeCurrentApp(...args)),
  changeLocation: (...args) => dispatch(push(...args))
});

export default translate()(
  connect(mapStatesToProps, mapDispatchToProps)(AdminList)
);
