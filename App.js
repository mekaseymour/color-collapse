import React, { createContext, useState } from 'react';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import GameScreen from './screens/GameScreen';
import HomeScreen from './screens/HomeScreen';

function handleLoadingError(error: Error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

const loadResourcesAsync = async () => {
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

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  } else {
    return (
      <Provider value={{ score, setScore }}>
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
