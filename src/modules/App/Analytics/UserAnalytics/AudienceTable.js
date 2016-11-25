import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Table from '../../../../components/Table';
import { getAudiences } from '../redux/actions';

export class UserAnalytics extends Component {
  displayName: 'UserAnalytics'

  componentWillMount() {
    this.props.getAudiences(this.props.segmentId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.segmentId && nextProps.segmentId !== this.props.segmentId) {
      this.props.getAudiences(nextProps.segmentId);
    }
  }

  props: {
    segmentId: string,
    audiences: Array<any>,
    loading: bool,
    getAudiences: Function
  }

  render() {
    const { audiences, loading } = this.props;
    const audienceMapped = audiences.map((u) => ({
      ...u.userDevice,
      ...u
    }));

    const model = {
      name: { title: 'Name' },
      email: { title: 'Email' },
      pushNotificationEnabled: { title: 'Push Enabled' },
      gender: { title: 'Gender' },
      devicePlatform: { title: 'Platform' },
      deviceVendor: { title: 'Vendor' },
      deviceModel: { title: 'Model' }
    };

    return (
      <Table model={ model } source={ audienceMapped } loading={ loading } selectable={ false } />
    );
  }
}

const mapStatesToProps = ({ analytics: { audiences, loading } }) => ({
  audiences,
  loading
});

const mapDispatchToProps = (dispatch) => ({
  getAudiences: (segmentId) => dispatch(getAudiences(segmentId))
});

export default translate()(
  connect(mapStatesToProps, mapDispatchToProps)(UserAnalytics)
);
