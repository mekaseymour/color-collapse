import * as Colors from './colors';
import * as Button from './button';

export const buttonContainer = {
  width: '100%',
};

export const title = {
  fontFamily: 'Arial',
  fontSize: 24,
  color: Colors.navy,
};

export const primaryCta = {
  ...Button.button,
  backgroundColor: Colors.green,
  width: '100%',
};

export const primaryCtaText = {
  color: Colors.white,
  fontSize: 21,
  fontFamily: 'Arial',
};

export const highScoreLabel = {
  fontFamily: 'Arial',
  fontSize: 21,
  color: Colors.blue,
  fontWeight: '500',
};

export const scoreLabel = {
  fontFamily: 'Arial',
  fontSize: 21,
  color: Colors.navy,
  fontWeight: '500',
};

export const scoreNumber = {
  fontFamily: 'paytone',
  fontSize: 48,
  fontWeight: '500',
  letterSpacing: 5,
};

export const scoreSection = {
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
};

export const secondaryCta = {
  ...Button.button,
  borderWidth: 4,
  borderColor: Colors.purple,
  width: '100%',
  marginTop: 15,
};

export const secondaryCtaText = {
  color: Colors.purple,
  fontSize: 21,
  fontFamily: 'Arial',
};
