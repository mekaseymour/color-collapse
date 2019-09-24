import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';

import Dot from './Dot';

const GameDot = ({ boardWidth, color }) => {
  const [dotColor, setDotColor] = useState(color);

  const onSwipe = (gestureName, gestureState) => {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

    switch (gestureName) {
      case SWIPE_UP:
        console.log('swiped up');
        setDotColor(null);
        break;
      case SWIPE_DOWN:
        console.log('swiped down');
        break;
      case SWIPE_LEFT:
        console.log('swiped left');
        break;
      case SWIPE_RIGHT:
        console.log('swiped right');
        break;
    }
  };

  return (
    <GestureRecognizer
      onSwipe={(direction, state) => onSwipe(direction, state)}
    >
      <Dot boardWidth={boardWidth} color={dotColor} />
    </GestureRecognizer>
  );
};

export default GameDot;
