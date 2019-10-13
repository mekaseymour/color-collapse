import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Board from '../components/Board';
import ScoreSection from '../components/ScoreSection';
import HelpModal from '../components/HelpModal';
import GameOverModal from '../components/GameOverModal';

const GameScreen = props => {
  const context = props.screenProps.context;
  const score = context.score;

  const [showHelpModal, setShowHelpModal] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gamesPerSession, setGamesPerSession] = useState(0);

  const startNewGame = () => {
    setGameOver(false);
    context.setScore(0);
    setGamesPerSession(gamesPerSession + 1);
  };

  return (
    <View style={styles.container}>
      <HelpModal visible={showHelpModal} />
      <GameOverModal
        context={context}
        visible={gameOver}
        onHomePress={() => {
          props.navigation.navigate('Home');
          startNewGame();
        }}
        onNewGamePress={startNewGame}
      />
      <ScoreSection
        score={score}
        onHelpPress={() => {
          setShowHelpModal(true);
          startNewGame();
        }}
      />
      <Board
        context={context}
        onGameOver={() => setGameOver(true)}
        gamesCount={gamesPerSession}
      />
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
