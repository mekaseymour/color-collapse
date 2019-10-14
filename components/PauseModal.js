import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from './Modal';
import { Button, Colors, Modal as ModalStyles } from '../styles';
import ModalScoreSection from './ModalScoreSection';

const PauseModal = ({
  context,
  onContinueGamePress,
  onQuitGamePress,
  visible,
}) => {
  return (
    <Modal visible={visible}>
      <React.Fragment>
        <Text style={ModalStyles.title}>GAME PAUSED</Text>
        <ModalScoreSection context={context} />
        <View style={ModalStyles.buttonContainer}>
          <TouchableOpacity
            style={ModalStyles.primaryCta}
            onPress={onContinueGamePress}
          >
            <Text style={ModalStyles.primaryCtaText}>CONTINUE GAME</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ModalStyles.secondaryCta}
            onPress={onQuitGamePress}
          >
            <Text style={ModalStyles.secondaryCtaText}>QUIT</Text>
          </TouchableOpacity>
        </View>
      </React.Fragment>
    </Modal>
  );
};

export default PauseModal;
