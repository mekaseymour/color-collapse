import React from 'react';
import { Text, View } from 'react-native';

import GameDot from '../components/GameDot';

const GameScreen = () => {
  return (
    <View>
      <Text>this is the game</Text>
      <GameDot />
    </View>
  );
};

export default GameScreen;
