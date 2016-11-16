import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Table from '../../../../components/Table';
import { appListRequest } from '../redux/actions';

export class ApplicationList extends Component {
  displayName: 'ApplicationList'
  props: {
    applications: Array<any>,
    loading: bool
  }

  render() {
    const { applications, loading } = this.props;
    const model = {
      appName: { title: 'Application Name' },
      packageName: { title: 'Package' }
    };

    return (
      <div>
        <h2>Applications</h2>
        <Table model={ model } source={ applications } loading={ loading } selectable={ false } />
      </div>
    );
  }
}

const mapStatesToProps = ({ application: { applications, loading } }) => ({
  applications,
  loading
});

const mapDispatchToProps = (dispatch) => ({
  listApps: () => dispatch(appListRequest())
});

export default translate()(
  connect(mapStatesToProps, mapDispatchToProps)(ApplicationList)
);
