import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';
import validCollisionOnSwipe from '../helpers/validCollisionOnSwipe';

import Dot from './Dot';
import { GAME_BOARD_SPACING, GET_DOT_WIDTH } from '../util/configs';
import { Colors } from '../styles';

const GameDot = ({
  boardWidth,
  onMove,
  onAnimationComplete,
  onValidCollision,
  data,
}) => {
  const [dotColor, setDotColor] = useState(null);
  const [horizontalShift, setHorizontalShift] = useState(0);
  const [verticalShift, setVerticalShift] = useState(0);

  const { color, position, isAnimating, colorWhileAnimating } = data;

  useEffect(() => {
    // const colorDisplay = color === null ? 'transparent' : Colors[color];
    setDotColor(isAnimating ? Colors[colorWhileAnimating] : Colors[color]);
  });

  const onSwipe = (gestureName, gestureState) => {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

    let validSpaceCollidingWith;
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

  const shouldShow = () => color || isAnimating;

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
          onAnimationComplete={() => onAnimationComplete(position)}
        />
      </View>
    </GestureRecognizer>
  );
};

export default GameDot;
