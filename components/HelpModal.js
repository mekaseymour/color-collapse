import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from './Modal';
import DemoSection from './DemoSection';
import { Colors, Typography } from '../styles';

const HelpModal = ({ onCompletePress, visible }) => {
  const [step, setStep] = useState(1);
  const [show, setShow] = useState(null);

  const TOTAL_STEPS = 3;

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  const handleButtonPress = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      setShow(false);
      onCompletePress();
      setStep(1);
    }
  };

  return (
    <Modal visible={show}>
      {step === 1 ? (
        <React.Fragment>
          <Text style={styles.header}>
            Combine primary colors with each other to get secondary colors
          </Text>
          <View>
            <DemoSection
              colorOne={Colors.red}
              colorTwo={Colors.yellow}
              result={Colors.orange}
            />
            <DemoSection
              colorOne={Colors.yellow}
              colorTwo={Colors.blue}
              result={Colors.green}
            />
            <DemoSection
              colorOne={Colors.red}
              colorTwo={Colors.blue}
              result={Colors.purple}
            />
          </View>
        </React.Fragment>
      ) : null}
      {step === 2 ? (
        <React.Fragment>
          <Text style={styles.header}>
            Combine secondary colors with each other to get black
          </Text>
          <View>
            <DemoSection
              colorOne={Colors.orange}
              colorTwo={Colors.green}
              result={Colors.black}
            />
            <DemoSection
              colorOne={Colors.green}
              colorTwo={Colors.purple}
              result={Colors.black}
            />
            <DemoSection
              colorOne={Colors.orange}
              colorTwo={Colors.purple}
              result={Colors.black}
            />
          </View>
        </React.Fragment>
      ) : null}
      {step === 3 ? (
        <React.Fragment>
          <Text style={styles.header}>
            Collapse any two of the same color together
          </Text>
          <View>
            <DemoSection
              colorOne={Colors.red}
              colorTwo={Colors.red}
              result={Colors.red}
            />
            <DemoSection
              colorOne={Colors.purple}
              colorTwo={Colors.purple}
              result={Colors.purple}
            />
            <DemoSection
              colorOne={Colors.black}
              colorTwo={Colors.black}
              result={Colors.black}
            />
          </View>
        </React.Fragment>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>{step === 3 ? 'PLAY' : 'NEXT'}</Text>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.navy,
    height: 55,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    ...Typography.mainTypography,
    color: Colors.white,
    fontSize: 20,
  },
  header: {
    ...Typography.mainTypography,
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HelpModal;
