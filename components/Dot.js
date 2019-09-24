import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../styles';

import { GAME_BOARD_DIMENSION, GAME_BOARD_SPACING } from '../util/configs';

const Dot = ({ boardWidth, color }) => {
  return <View style={styles.dot(boardWidth, color)} />;
};

const styles = StyleSheet.create({
  dot: (boardWidth, color) => ({
    backgroundColor: color || Colors.darkGray,
    width:
      (boardWidth - GAME_BOARD_SPACING * (GAME_BOARD_DIMENSION + 1)) /
      GAME_BOARD_DIMENSION,
    aspectRatio: 1,
    borderRadius: 50,
  }),
});

export default Dot;
