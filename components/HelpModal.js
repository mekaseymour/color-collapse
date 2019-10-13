import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from './Modal';
import DemoSection from './DemoSection';
import { Colors } from '../styles';

const HelpModal = ({ visible }) => {
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
            Collapse any two of the same colors together to get one of that
            color
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
    color: Colors.white,
    fontSize: 20,
    fontFamily: 'Arial',
  },
  header: {
    fontFamily: 'Arial',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HelpModal;
