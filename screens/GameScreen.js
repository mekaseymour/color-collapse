import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Board from '../components/Board';
import ScoreSection from '../components/ScoreSection';
import HelpModal from '../components/HelpModal';

const GameScreen = props => {
  const score = props.screenProps.context.score;

  const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <View style={styles.container}>
      <HelpModal visible={showHelpModal} />
      <ScoreSection score={score} onHelpPress={() => setShowHelpModal(true)} />
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
