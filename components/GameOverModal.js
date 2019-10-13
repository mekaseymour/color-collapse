import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from './Modal';
import { Button, Colors, Modal as ModalStyles } from '../styles';

const GameOverModal = ({ context, visible, onHomePress, onNewGamePress }) => {
  return (
    <Modal visible={visible}>
      <React.Fragment>
        <Text style={ModalStyles.title}>GAME OVER</Text>
        <View style={ModalStyles.scoreSection}>
          <Text style={ModalStyles.scoreLabel}>SCORE:</Text>
          <Text style={ModalStyles.scoreNumber}>{context.score}</Text>
        </View>
        <View style={ModalStyles.buttonContainer}>
          <TouchableOpacity
            style={ModalStyles.primaryCta}
            onPress={onNewGamePress}
          >
            <Text style={ModalStyles.primaryCtaText}>PLAY AGAIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ModalStyles.secondaryCta}
            onPress={onHomePress}
          >
            <Text style={ModalStyles.secondaryCtaText}>HOME</Text>
          </TouchableOpacity>
        </View>
      </React.Fragment>
    </Modal>
  );
};

export default GameOverModal;