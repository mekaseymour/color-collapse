import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Dot from './Dot';
import GameDot from './GameDot';
import { Colors } from '../styles';

import { GAME_BOARD_DIMENSION, GAME_BOARD_SPACING } from '../util/configs';

const startingGame = [3, 3, 6, 1, 7, 6, 2, 2, 3, 6, 1, 6, 2, 1, 7, 5];

const Board = () => {
  const [boardWidth, setBoardWidth] = useState(null);

  const generateRows = () => {
    const rows = [];

    for (let i = 0; i < GAME_BOARD_DIMENSION; i++) {
      const rowStart = i * GAME_BOARD_DIMENSION;
      const rowEnd = rowStart + GAME_BOARD_DIMENSION;
      const row = startingGame.slice(rowStart, rowEnd);
      rows.push(row);
    }

    return rows;
  };

  return (
    <View
      style={styles.boardContainer}
      onLayout={event => setBoardWidth(event.nativeEvent.layout.width)}
    >
      <View style={styles.placeholderRowsWrapper}>
        {generateRows().map((row, i) => {
          return (
            <View key={`row-${i}`} style={styles.boardRow}>
              {row.map((space, j) => (
                <Dot key={`${i}-${j}`} boardWidth={boardWidth} />
              ))}
            </View>
          );
        })}
      </View>
      <View style={styles.gameDotRowsWrapper}>
        {generateRows().map((row, i) => {
          return (
            <View key={`row-${i}`} style={styles.boardRow}>
              {row.map((space, j) => (
                <GameDot
                  key={`${i}-${j}`}
                  boardWidth={boardWidth}
                  color={Colors.red}
                />
              ))}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boardContainer: {
    width: '100%',
    aspectRatio: 1,
    flexDirection: 'column',
    borderColor: Colors.gray,
    borderRadius: 8,
    backgroundColor: Colors.gray,
    padding: GAME_BOARD_SPACING,
    justifyContent: 'space-between',
  },
  boardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gameDotRowsWrapper: {
    justifyContent: 'space-between',
    width: '100%',
    aspectRatio: 1,
    position: 'absolute',
    top: GAME_BOARD_SPACING,
    left: GAME_BOARD_SPACING,
  },
  placeholderRowsWrapper: {
    justifyContent: 'space-between',
    width: '100%',
    aspectRatio: 1,
  },
});

export default Board;
