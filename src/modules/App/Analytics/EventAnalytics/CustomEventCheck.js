import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'react-toolbox';
import cn from 'classnames';

import { toggleCustomEvent } from '../redux/actions';
import styles from './EventCharts.scss';

export class CustomEventCheck extends Component {
  displayName: 'CustomEventCheck'
  props: {
    selectedEvents: Object,
    toggleEvent: Function
  }

  renderCheckboxes() {
    const { selectedEvents, toggleEvent } = this.props;
    return Object.keys(selectedEvents).map((id, index) => (
      <Checkbox
        theme={ styles }
        className={ cn('u-display-inline-block', styles[`checkbox-color-${ index + 1 }`]) }
        checked={ selectedEvents[id].selected }
        label={ selectedEvents[id].name }
        onChange={ () => toggleEvent(id) }
        key={ id }
      />
    ));
  }

  render() {
    return (
      <div>
        <h4>Displayig Events:</h4>
        { this.renderCheckboxes() }
      </div>
    );
  }
}

const mapStatesToProps = ({ analytics: { selectedEvents } }) => ({
  selectedEvents
});

const mapDispatchToProps = (dispatch) => ({
  toggleEvent: (eventId) => dispatch(toggleCustomEvent(eventId))
});

export default connect(mapStatesToProps, mapDispatchToProps)(CustomEventCheck);
