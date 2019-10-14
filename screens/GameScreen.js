import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';

import Board from '../components/Board';
import ScoreSection from '../components/ScoreSection';
import HelpModal from '../components/HelpModal';
import GameOverModal from '../components/GameOverModal';
import PauseModal from '../components/PauseModal';
import { BANNER_AD_UNIT_ID } from '../util/adConfigs';

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
    context.setNewHighScoreReached(false);
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
      <HelpModal
        visible={showHelpModal}
        onCompletePress={() => setShowHelpModal(false)}
      />
      <GameOverModal
        context={context}
        visible={gameOver}
        onHomePress={endGameAndNavigateHome}
        onNewGamePress={startNewGame}
      />
      <ScoreSection
        context={context}
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
      <View style={styles.adSection}>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID={BANNER_AD_UNIT_ID}
          testDeviceID="EMULATOR"
          servePersonalizedAds={true}
          onDidFailToReceiveAdWithError={this.bannerError}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  adSection: {
    marginHorizontal: '-5%',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: '5%',
    paddingTop: '15%',
  },
});

export default GameScreen;
