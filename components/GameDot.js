import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';

import Dot from './Dot';
import { GAME_BOARD_SPACING } from '../util/configs';

const GameDot = ({ boardWidth, color, onMove, position }) => {
  const [dotColor, setDotColor] = useState(null);
  const [horizontalShift, setHorizontalShift] = useState(0);
  const [verticalShift, setVerticalShift] = useState(0);

  useEffect(() => {
    setDotColor(color);
  });

  const onSwipe = (gestureName, gestureState) => {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

    switch (gestureName) {
      case SWIPE_UP:
        onMove(position, 'up', () => setVerticalShift(-GAME_BOARD_SPACING));
        break;
      case SWIPE_DOWN:
        onMove(position, 'down', () => setVerticalShift(GAME_BOARD_SPACING));
        break;
      case SWIPE_LEFT:
        onMove(position, 'left', () => setHorizontalShift(-GAME_BOARD_SPACING));
        break;
      case SWIPE_RIGHT:
        onMove(position, 'right', () => setHorizontalShift(GAME_BOARD_SPACING));
        break;
    }
  };

  return (
    <GestureRecognizer
      onSwipe={(direction, state) => onSwipe(direction, state)}
    >
      <View>
        <Dot
          boardWidth={boardWidth}
          color={dotColor}
          horizontalShift={horizontalShift}
          verticalShift={verticalShift}
        />
      </View>
    </GestureRecognizer>
  );
};

export default GameDot;
