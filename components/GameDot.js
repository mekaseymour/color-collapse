import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';

import Dot from './Dot';

const GameDot = ({ boardWidth, color, onMove, position }) => {
  const [dotColor, setDotColor] = useState(null);

  useEffect(() => {
    setDotColor(color);
  });

  const onSwipe = (gestureName, gestureState) => {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

    switch (gestureName) {
      case SWIPE_UP:
        console.log('swiped up');
        onMove(position, 'up');
        break;
      case SWIPE_DOWN:
        console.log('swiped down');
        onMove(position, 'down');
        break;
      case SWIPE_LEFT:
        console.log('swiped left');
        onMove(position, 'left');
        break;
      case SWIPE_RIGHT:
        console.log('swiped right');
        onMove(position, 'right');
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
