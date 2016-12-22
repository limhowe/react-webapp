import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { translate } from 'react-i18next';
import { IconButton, Button } from 'react-toolbox';

import Table from '../../../../components/Table';
import AppIcon from '../../../../components/AppIcon';
import { appListRequest } from '../redux/actions';

export class ApplicationList extends Component {
  displayName: 'ApplicationList'

  componentWillMount() {
    this.props.listApps(true);
  }

  props: {
    applications: Array<any>,
    loading: bool,
    listApps: Function,
    newApp: Function,
    editApp: Function
  }

  render() {
    const { applications, loading } = this.props;
    const model = {
      image: { title: 'Icon' },
      appName: { title: 'Application Name' },
      packageName: { title: 'Package' },
      environment: { title: 'Environment' },
      actions: { title: 'Actions' }
    };

    const extendedApps = applications.map((app) => ({
      ...app,
      image: (
        <AppIcon image={ app.image } />
      ),
      actions: (
        <span>
          <IconButton primary icon="edit" onClick={ () => this.props.editApp(app._id) } />
        </span>
      )
    }));

    return (
      <div className="c-container__large">
        <div className="row">
          <div className="col-sm-8">
            <h2>Applications</h2>
          </div>
          <div className="col-sm-4 text-right u-padding-top-lg">
            <Button label="Create Application" primary raised onClick={ this.props.newApp } />
          </div>
        </div>
        <Table model={ model } source={ extendedApps } loading={ loading } selectable={ false } />
      </div>
    );
  }
}

const mapStatesToProps = ({ application: { applications, loading } }) => ({
  applications,
  loading
});

const mapDispatchToProps = (dispatch) => ({
  listApps: (...args) => dispatch(appListRequest(...args)),
  newApp: () => dispatch(push('/app/applications/new')),
  editApp: (id) => dispatch(push(`/app/applications/${ id }`))
});

export default translate()(
  connect(mapStatesToProps, mapDispatchToProps)(ApplicationList)
);
