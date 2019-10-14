import React, { createContext, useState } from 'react';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import GameScreen from './screens/GameScreen';
import HomeScreen from './screens/HomeScreen';
import { HIGH_SCORE } from './util/storageKeys';

function handleLoadingError(error: Error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

const loadResourcesAsync = async setHighScore => {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/icons/pauseIcon.png'),
      require('./assets/icons/questionMarkIcon.png'),
      require('./assets/icons/sideToSide.png'),
    ]),
    Font.loadAsync({
      paytone: require('./assets/fonts/PaytoneOne-Regular.ttf'),
    }),
  ]);

  const highScore = await AsyncStorage.getItem(HIGH_SCORE);

  if (!!highScore) {
    setHighScore(parseInt(highScore));
  }
};

const MainNavigator = createSwitchNavigator({
  Home: HomeScreen,
  Game: GameScreen,
});

const AppContainer = createAppContainer(MainNavigator);

const { Provider, Consumer } = createContext();

export default App = () => {
  const [isReady, setIsReady] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [newHighScoreReached, setNewHighScoreReached] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={() => loadResourcesAsync(setHighScore)}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  } else {
    return (
      <Provider
        value={{
          score,
          setScore,
          highScore,
          setHighScore,
          newHighScoreReached,
          setNewHighScoreReached,
        }}
      >
        <View style={styles.container}>
          <Consumer>
            {context => <AppContainer screenProps={{ context }} />}
          </Consumer>
        </View>
      </Provider>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
