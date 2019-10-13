import React from 'react';
import { Modal as ModalComponent, StyleSheet, View } from 'react-native';
import { Colors } from '../styles';

const Modal = ({ children, visible }) => {
  return (
    <ModalComponent animationType="fade" transparent={true} visible={visible}>
      <View style={styles.wrapper}>
        <View style={styles.container}>{children}</View>
      </View>
    </ModalComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '85%',
    height: '50%',
    backgroundColor: Colors.gray,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 25,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.whiteWithOpacity,
  },
});

export default Modal;
