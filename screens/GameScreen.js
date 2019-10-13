import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Board from '../components/Board';
import ScoreSection from '../components/ScoreSection';
import HelpModal from '../components/HelpModal';
import GameOverModal from '../components/GameOverModal';
import PauseModal from '../components/PauseModal';

const GameScreen = props => {
  const context = props.screenProps.context;
  const score = context.score;

  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gamesPerSession, setGamesPerSession] = useState(0);

  const startNewGame = () => {
    setGameOver(false);
    context.setScore(0);
    setGamesPerSession(gamesPerSession + 1);
  };

  const endGameAndNavigateHome = () => {
    props.navigation.navigate('Home');
    startNewGame();
  };

  return (
    <View style={styles.container}>
      <PauseModal
        context={context}
        visible={showPauseModal}
        onContinueGamePress={() => setShowPauseModal(false)}
        onQuitGamePress={endGameAndNavigateHome}
      />
      <HelpModal visible={showHelpModal} />
      <GameOverModal
        context={context}
        visible={gameOver}
        onHomePress={endGameAndNavigateHome}
        onNewGamePress={startNewGame}
      />
      <ScoreSection
        score={score}
        onHelpPress={() => {
          setShowHelpModal(true);
        }}
        onPausePress={() => setShowPauseModal(true)}
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
