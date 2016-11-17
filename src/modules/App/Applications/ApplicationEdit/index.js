import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-toolbox';

import BasicInfo from './BasicInfo';
import Congratulations from './Congratulations';
import KeySetup from './KeySetup';
import { appReadRequest, initNew } from '../redux/actions';

export class ApplicationEdit extends Component {
  displayName: 'ApplicationEdit'
  state = {
    loaded: false
  }
  componentWillMount() {
    const appId = this.props.params && this.props.params.appId;
    if (appId === 'new') {
      this.props.initNew();
      this.setState({ loaded: true });
    } else {
      this.props.readApplication(appId).then(() => {
        this.setState({ loaded: true });
      });
    }
  }

  props: {
    params: Object,
    step: number,
    initNew: Function,
    readApplication: Function,
    t: Function
  }

  render() {
    const { step } = this.props;
    const { loaded } = this.state;

    if (!loaded) {
      return (
        <div className="c-container c-container__center">
          <ProgressBar mode="indeterminate" type="circular" multicolor />
        </div>
      );
    }

    const map = {
      0: () => <BasicInfo />,
      1: () => <KeySetup />,
      2: () => <Congratulations />
    };
    return (
      <div>
        { map[step]() }
      </div>
    );
  }
}

const mapStateToProps = ({ application: { step, reading } }) => ({ step, reading });
const mapDispatchToProps = (dispatch) => ({
  readApplication: (id) => dispatch(appReadRequest(id)),
  initNew: () => dispatch(initNew())
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationEdit);
