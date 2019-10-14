import React from 'react';
import { Text, View } from 'react-native';
import { Modal as ModalStyles } from '../styles';

const ModalScoreSection = ({ context }) => {
  return (
    <React.Fragment>
      <View style={ModalStyles.scoreSection}>
        {context.newHighScoreReached ? (
          <Text style={ModalStyles.highScoreLabel}>NEW HIGH SCORE!</Text>
        ) : (
          <Text style={ModalStyles.scoreLabel}>SCORE:</Text>
        )}
        <Text style={ModalStyles.scoreNumber}>{context.score}</Text>
      </View>
    </React.Fragment>
  );
};

export default ModalScoreSection;
