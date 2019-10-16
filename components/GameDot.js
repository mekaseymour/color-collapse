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
  onCollisionComplete,
  data,
  onShiftComplete,
}) => {
  const [dotColor, setDotColor] = useState(null);
  const [horizontalShift, setHorizontalShift] = useState(0);
  const [verticalShift, setVerticalShift] = useState(0);

  const {
    color,
    position,
    isAnimating,
    colorWhileAnimating,
    shift,
    swell,
  } = data;

  useEffect(() => {
    const colorToDisplay = color ? Colors[color] : 'transparent';
    setDotColor(isAnimating ? Colors[colorWhileAnimating] : colorToDisplay);
  });

  useEffect(() => {
    if (shift) {
      setVerticalShift(GAME_BOARD_SPACING);
    }
  }, [shift]);

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
      <View style={{ zIndex: 1 }}>
        <Dot
          boardWidth={boardWidth}
          color={dotColor}
          horizontalShift={horizontalShift}
          verticalShift={verticalShift}
          onAnimationComplete={() =>
            shift ? onShiftComplete(position) : onCollisionComplete(position)
          }
          isShifting={shift}
          showSwell={!!swell}
        />
      </View>
    </GestureRecognizer>
  );
};

export default GameDot;
