import React, { Component } from 'react';

export class AppIcon extends Component {
  displayName: 'AppIcon';
  props: {
    image: string
  }

  render() {
    return (
      <img src={ this.props.image || __APP_CONFIG__.DEFAULT_ICON } className="app-icon" />
    );
  }
}

export default AppIcon;
