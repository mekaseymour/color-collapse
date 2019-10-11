import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Colors } from '../styles';

import {
  DOT_ACTION_DURATION,
  GAME_BOARD_DIMENSION,
  GAME_BOARD_SPACING,
} from '../util/configs';

const Dot = ({
  boardWidth,
  color,
  horizontalShift,
  verticalShift,
  onAnimationComplete,
  isShifting,
}) => {
  const [leftPosition, setLeftPosition] = useState(
    new Animated.ValueXY({ x: 0, y: 0 })
  );

  const dotWidth =
    (boardWidth - GAME_BOARD_SPACING * (GAME_BOARD_DIMENSION + 1)) /
    GAME_BOARD_DIMENSION;

  useEffect(() => {
    if (horizontalShift) {
      let xShift = 0;

      // if shift to right else shift to left
      if (horizontalShift > 0) {
        xShift = horizontalShift + dotWidth;
      } else {
        xShift = horizontalShift - dotWidth;
      }

      Animated.timing(leftPosition, {
        toValue: { x: xShift, y: 0 },
        duration: DOT_ACTION_DURATION,
      }).start(() => onAnimationComplete());
    }

    if (verticalShift) {
      let yShift = 0;

      // if shift up else shift down
      if (verticalShift > 0) {
        yShift = verticalShift + dotWidth;
      } else {
        yShift = verticalShift - dotWidth;
      }

      Animated.timing(leftPosition, {
        toValue: { x: 0, y: yShift },
        duration: DOT_ACTION_DURATION,
      }).start(() => onAnimationComplete());
    }
  }, [horizontalShift, verticalShift]);

  const colorToDisplay = () => {
    if (color === 'PLACEHOLDER') {
      return Colors.darkGray;
    } else if (color) {
      return color;
    } else {
      ('transparent');
    }
  };

  return (
    <Animated.View
      style={[
        styles.dot(dotWidth, colorToDisplay(), isShifting),
        leftPosition.getLayout(),
      ]}
    />
  );
};

const styles = StyleSheet.create({
  dot: (dotWidth, color, isShifting) => ({
    backgroundColor: color,
    width: dotWidth,
    aspectRatio: 1,
    borderRadius: 50,
  }),
});

export default Dot;
