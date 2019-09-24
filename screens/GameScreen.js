import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Board from '../components/Board';

const GameScreen = () => {
  return (
    <View style={styles.container}>
      <Text>this is the game</Text>
      <Board />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default GameScreen;
