export const PLATFORMS = {
  ANDROID: 'android',
  IOS: 'ios'
};

export const DISPLAY_TYPES = {
  WIDGET: {
    value: 'dpi',
    grouped: false
  },
  NOVA: {
    value: 'nova',
    grouped: true
  },
  SUPERNOVA: {
    value: 'supernova',
    grouped: true
  },
  MEGANOVA: {
    value: 'meganova',
    grouped: true
  }
};

export const AVAILABLE_TYPES = {
  [PLATFORMS.ANDROID]: [DISPLAY_TYPES.WIDGET, DISPLAY_TYPES.NOVA, DISPLAY_TYPES.SUPERNOVA, DISPLAY_TYPES.MEGANOVA],
  [PLATFORMS.IOS]: [DISPLAY_TYPES.NOVA, DISPLAY_TYPES.SUPERNOVA, DISPLAY_TYPES.MEGANOVA]
};
