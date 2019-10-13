import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from './Modal';
import { Button, Colors } from '../styles';

const GameOverModal = ({ context, visible, onHomePress, onNewGamePress }) => {
  return (
    <Modal visible={visible}>
      <React.Fragment>
        <Text style={styles.modalTitle}>GAME OVER</Text>
        <Text style={styles.scoreLabel}>SCORE:</Text>
        <Text style={styles.scoreNumber}>{context.score}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryCta} onPress={onNewGamePress}>
            <Text style={styles.primaryCtaText}>PLAY AGAIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryCta} onPress={onHomePress}>
            <Text style={styles.secondaryCtaText}>HOME</Text>
          </TouchableOpacity>
        </View>
      </React.Fragment>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
  },
  modalTitle: {
    fontFamily: 'Arial',
    fontSize: 24,
    color: Colors.navy,
  },
  scoreLabel: {
    fontFamily: 'Arial',
    fontSize: 21,
    color: Colors.navy,
    fontWeight: '500',
  },
  scoreNumber: {
    fontFamily: 'paytone',
    fontSize: 48,
    fontWeight: '500',
    letterSpacing: 5,
  },
  primaryCta: {
    ...Button.button,
    backgroundColor: Colors.green,
    width: '100%',
  },
  primaryCtaText: {
    color: Colors.white,
    fontSize: 21,
    fontFamily: 'Arial',
  },
  secondaryCta: {
    ...Button.button,
    borderWidth: 4,
    borderColor: Colors.purple,
    width: '100%',
    marginTop: 15,
  },
  secondaryCtaText: {
    color: Colors.purple,
    fontSize: 21,
    fontFamily: 'Arial',
  },
});

export default GameOverModal;
