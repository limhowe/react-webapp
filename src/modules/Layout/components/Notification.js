import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Snackbar } from 'react-toolbox';
import classnames from 'classnames';

import { hideNotification } from '../redux/actions';

export class Notification extends Component {
  static displayName = 'Notification';
  props: {
    notification: Object,
    hide: Function
  };

  render() {
    const { notification, hide } = this.props;
    const styles = require('./Notification.scss');

    if (!notification) {
      return null;
    }

    const notificationClassName = classnames(
      styles[`notification__${ notification.type }`]
    );

    return (
      <Snackbar
        className={ notificationClassName }
        action="Dismiss"
        type={ notification.type === 'error' ? 'cancel' : 'accept' }
        label={ notification.message }
        active={ !!notification.message }
        timeout={ 10000 }
        onTimeout={ hide }
        onClick={ hide }
      />
    );
  }
}

const mapStatesToProps = ({ layout: { notification } }) => ({
  notification
});

const mapDispatchToProps = (dispatch) => ({
  hide: () => dispatch(hideNotification())
});

export default connect(mapStatesToProps, mapDispatchToProps)(Notification);
