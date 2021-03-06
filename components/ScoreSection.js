import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../styles';

const ScoreSection = ({ context, onHelpPress, onPausePress, score }) => {
  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        {context.newHighScoreReached ? (
          <Text style={styles.highScoreLabel}>HIGH SCORE!</Text>
        ) : (
          <Text style={styles.scoreLabel}>score:</Text>
        )}
        <Text style={styles.score}>{score}</Text>
      </View>
      <View style={styles.gameControlsContainer}>
        <TouchableOpacity style={styles.gameControl} onPress={onHelpPress}>
          <Image
            style={{ width: 25, height: 40 }}
            source={require('../assets/icons/questionMarkIcon.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.gameControl} onPress={onPausePress}>
          <Image
            style={{ width: 30, height: 30 }}
            source={require('../assets/icons/pauseIcon.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray,
    height: '16%',
    borderRadius: 8,
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  highScoreLabel: {
    fontFamily: 'paytone',
    fontSize: 20,
    color: Colors.green,
    letterSpacing: 1.8,
    paddingBottom: 5,
  },
  gameControl: {
    height: 60,
    aspectRatio: 1,
    borderWidth: 3,
    borderColor: Colors.darkGray,
    borderRadius: 50,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameControlsContainer: {
    flexDirection: 'row',
  },
  scoreLabel: {
    fontFamily: 'paytone',
    fontSize: 24,
    color: Colors.navy,
    paddingBottom: 5,
  },
  score: {
    fontFamily: 'paytone',
    fontSize: 36,
    lineHeight: 36,
    letterSpacing: 3.75,
    color: Colors.navy,
  },
});

export default ScoreSection;
