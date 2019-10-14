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
  onSwellComplete,
  showSwell,
}) => {
  const defaultDotSize =
    (boardWidth - GAME_BOARD_SPACING * (GAME_BOARD_DIMENSION + 1)) /
    GAME_BOARD_DIMENSION;

  const [position, setPosition] = useState(
    new Animated.ValueXY({ x: 0, y: 0 })
  );
  const [size, setSize] = useState(new Animated.Value(1));

  const interpolatedSize = size.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  useEffect(() => {
    if (showSwell) {
      Animated.spring(size, {
        toValue: 1.2,
        speed: 500,
        bounciness: 20,
      }).start(() =>
        Animated.spring(size, {
          toValue: 1,
          speed: 500,
          bounciness: 20,
        }).start(() => {})
      );
    }
  }, [showSwell]);

  useEffect(() => {
    if (horizontalShift) {
      let xShift = 0;

      if (horizontalShift > 0) {
        xShift = horizontalShift + defaultDotSize;
      } else {
        xShift = horizontalShift - defaultDotSize;
      }

      Animated.timing(position, {
        toValue: { x: xShift, y: 0 },
        duration: DOT_ACTION_DURATION,
      }).start(() => onAnimationComplete());
    }

    if (verticalShift) {
      let yShift = 0;

      if (verticalShift > 0) {
        yShift = verticalShift + defaultDotSize;
      } else {
        yShift = verticalShift - defaultDotSize;
      }

      Animated.timing(position, {
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
        styles.dot(defaultDotSize, colorToDisplay(), isShifting),
        position.getLayout(),
        { transform: [{ scale: interpolatedSize }] },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  dot: (defaultDotSize, color, isShifting) => ({
    backgroundColor: color,
    width: defaultDotSize,
    aspectRatio: 1,
    borderRadius: 100,
  }),
});

export default Dot;
