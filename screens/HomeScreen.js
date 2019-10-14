import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Typography } from '../styles';

const HomeScreen = props => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.titleLine}>
          <Text style={styles.title}>C</Text>
          <View style={styles.titleDot(Colors.green)} />
          <Text style={styles.title}>L</Text>
          <View style={styles.titleDot(Colors.orange)} />
          <Text style={styles.title}>R</Text>
        </View>
        <View style={styles.titleLine}>
          <Text style={styles.title}>C</Text>
          <View style={styles.titleDot(Colors.red)} />
          <Text style={styles.title}>LLAPSE</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate('Game')}
      >
        <Text style={styles.buttonText}>PLAY</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.navy,
    width: '90%',
    maxWidth: 450,
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    position: 'absolute',
    bottom: '15%',
  },
  buttonText: {
    ...Typography.mainTypography,
    color: Colors.white,
    fontSize: 24,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: '50%',
  },
  title: {
    fontSize: 48,
    fontFamily: 'paytone',
    textAlign: 'center',
    letterSpacing: 7,
  },
  titleDot: color => ({
    backgroundColor: color,
    height: 40,
    aspectRatio: 1,
    borderRadius: 50,
    marginHorizontal: 7,
  }),
  titleLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
