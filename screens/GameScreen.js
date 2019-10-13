import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Board from '../components/Board';
import ScoreSection from '../components/ScoreSection';

const GameScreen = props => {
  const score = props.screenProps.context.score;

  return (
    <View style={styles.container}>
      <ScoreSection score={score} />
      <Board context={props.screenProps.context} />
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: '5%',
    paddingTop: '15%',
  },
});

export default GameScreen;
