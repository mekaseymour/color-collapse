import { Platform } from 'react-native';

export const mainTypography = {
  fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif',
};
