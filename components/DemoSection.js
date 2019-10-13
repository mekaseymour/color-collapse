import React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';

const DemoSection = ({ colorOne, colorTwo, result }) => {
  return (
    <View style={styles.demoSection}>
      <View style={styles.dot(colorOne)} />
      <Image
        source={require('../assets/icons/sideToSide.png')}
        style={{ width: 26, height: 28 }}
      />
      <View style={styles.dot(colorTwo)} />
      <Text style={styles.equalSign}>=</Text>
      <View style={styles.dot(result)} />
    </View>
  );
};

export default DemoSection;

const styles = StyleSheet.create({
  demoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: color => ({
    height: 60,
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: color,
    margin: 10,
  }),
  equalSign: {
    fontSize: 25,
  },
});
