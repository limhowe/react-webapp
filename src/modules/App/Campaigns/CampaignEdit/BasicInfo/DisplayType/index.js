import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import cn from 'classnames';
import _ from 'lodash';
import { Checkbox, RadioGroup, RadioButton, Tooltip as tooltip, IconButton } from 'react-toolbox';

import { AVAILABLE_TYPES } from '../../../../../../constants/DisplayType';
import styles from './styles.scss';
import { addPlatform, removePlatform } from '../../../redux/actions';

const TooltipIconButton = tooltip(IconButton);

export class DisplayTypes extends Component {
  displayName: 'DisplayTypes';

  props: {
    platform: string,
    checked: bool,
    t: Function,
    addPlatform: Function,
    displayTypes: Array<string>,
    removePlatform: Function
  }

  onTogglePlatform = (checked) => {
    if (!checked) {
      this.props.removePlatform();
    } else {
      this.props.addPlatform([]);
    }
  }

  onChangeValue = (name, value) => {
    const displayTypes = [];
    if (name === 'radio') {
      AVAILABLE_TYPES[this.props.platform].forEach((t) => {
        if (!t.grouped && this.props.displayTypes.indexOf(t.value) !== -1) {
          displayTypes.push(t.value);
        }
      });
      displayTypes.push(value);
    } else {
      const index = this.props.displayTypes.indexOf(name);
      if (index === -1) {
        displayTypes.push(...this.props.displayTypes, name);
      } else {
        this.props.displayTypes.splice(index, 1);
        displayTypes.push(...this.props.displayTypes);
      }
    }

    this.props.addPlatform(displayTypes);
  }

  renderOptions() {
    const { t, platform } = this.props;
    const availableTypes = AVAILABLE_TYPES[platform];
    const radios = [];
    const checkboxes = [];
    availableTypes.forEach((option) => {
      if (option.grouped) {
        radios.push(
          <RadioButton theme={ styles } key={ option.value } label={ t(`campaigns.create.start.displayType.${ option.value }`) } value={ option.value } />,
          <TooltipIconButton
            key={ `${ option.value }_tooltip`  }
            icon="help_outline"
            primary
            tooltip={ <img className="img-tooltip" src="http://live.dynamicpush.com/assets/cell.jpg" /> }
            theme={ styles }
          />
        );
      } else {
        const checked = this.props.displayTypes.indexOf(option.value) !== -1;
        checkboxes.push(
          <div className={ styles.checkboxGroup } key={ option.value }>
            <Checkbox theme={ styles } label={ t(`campaigns.create.start.displayType.${ option.value }`) } checked={ checked } onChange={ (val) => this.onChangeValue(option.value, val) } />
            <TooltipIconButton
              icon="help_outline"
              primary
              tooltip={ <img className="img-tooltip" src="http://live.dynamicpush.com/assets/cell.jpg" /> }
              theme={ styles }
            />
          </div>
        );
      }
    });
    const optionClassName = cn(styles.options, {
      [styles.hidden]: !this.props.checked
    });
    let radioValue = '';
    AVAILABLE_TYPES[platform].forEach((type) => {
      if (type.grouped && this.props.displayTypes.indexOf(type.value) !== -1) {
        radioValue = type.value;
      }
    });

    return (
      <div className={ optionClassName }>
        { checkboxes }
        <RadioGroup className={ styles.radioGroup } value={ radioValue } onChange={ (val) => this.onChangeValue('radio', val) }>
          { radios }
        </RadioGroup>
      </div>
    );
  }

  render() {
    const { t, platform } = this.props;
    return (
      <div>
        <div>
          <Checkbox
            checked={ this.props.checked }
            label={ t(`campaigns.create.start.${ platform }`) }
            onChange={ this.onTogglePlatform }
          />
        </div>
        { this.renderOptions() }
      </div>
    );
  }
}

const mapStatesToProps = ({ campaign: { campaign: { platform } } }, ownProps) => {
  const index = _.findIndex(platform, { name: ownProps.platform });
  if (index === -1) {
    return {
      checked: false,
      displayTypes: []
    };
  }

  return {
    checked: true,
    displayTypes: platform[index].displayType
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  addPlatform: (displayType) => dispatch(addPlatform(ownProps.platform, displayType)),
  removePlatform: () => dispatch(removePlatform(ownProps.platform))
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(DisplayTypes));
