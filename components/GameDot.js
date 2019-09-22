import React from 'react';
import { StyleSheet, View } from 'react-native';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';

import { Colors } from '../styles';

const GameDot = ({ color }) => {
  const onSwipe = (gestureName, gestureState) => {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

    switch (gestureName) {
      case SWIPE_UP:
        console.log('swiped up');
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
      <View style={styles.container(color)} />
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: (color = 'red') => ({
    backgroundColor: Colors[color],
    width: 100,
    height: 100,
    borderRadius: 50,
  }),
});

export default GameDot;
