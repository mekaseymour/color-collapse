import React from 'react';
import {
  Dimensions,
  Modal as ModalComponent,
  StyleSheet,
  View,
} from 'react-native';
import { Colors } from '../styles';

const IPHONE_X_SCREEN_HEIGHT = 850;
export const IPHONE_X_OR_SMALLER =
  Dimensions.get('window').height <= IPHONE_X_SCREEN_HEIGHT;

const Modal = ({ children, visible }) => {
  return (
    <ModalComponent animationType="slide" transparent={true} visible={visible}>
      <View style={styles.wrapper}>
        <View style={styles.container}>{children}</View>
      </View>
    </ModalComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '85%',
    height: IPHONE_X_OR_SMALLER ? '60%' : '50%',
    backgroundColor: Colors.gray,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 25,
    paddingTop: 35,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.whiteWithOpacity,
  },
});

export default Modal;
