import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Dot from './Dot';
import GameDot from './GameDot';
import { Colors } from '../styles';
import generateStartingColors from '../helpers/generateStartingColors';
import { COLORS } from '../util/colors';

import { GAME_BOARD_DIMENSION, GAME_BOARD_SPACING } from '../util/configs';
import getResultingColor from '../helpers/getResultingColor';

const Board = () => {
  const [boardWidth, setBoardWidth] = useState(null);
  const [colorKeys, setColorKeys] = useState([]);

  useEffect(() => {
    setColorKeys(generateStartingColors());
  }, []);

  const generateRows = colors => {
    const rows = [];
    console.log('inside generateRows');

    for (let i = 0; i < GAME_BOARD_DIMENSION; i++) {
      const rowStart = i * GAME_BOARD_DIMENSION;
      const rowEnd = rowStart + GAME_BOARD_DIMENSION;
      const row = colors.slice(rowStart, rowEnd);
      rows.push(row);
    }

    return rows;
  };

  const checkCollision = (actorPosition, direction) => {
    let spaceCollidingWith;

    switch (direction) {
      case 'up':
        spaceCollidingWith = actorPosition - GAME_BOARD_DIMENSION;
        break;
      case 'down':
        spaceCollidingWith = actorPosition + GAME_BOARD_DIMENSION;
        break;
      case 'left':
        spaceCollidingWith = actorPosition - 1;
        break;
      case 'right':
        spaceCollidingWith = actorPosition + 1;
        break;
    }

    if (colorKeys[spaceCollidingWith]) {
      handleCollision(actorPosition, spaceCollidingWith);
    }
  };

  const handleCollision = (actorPosition, collidedPosition) => {
    const colorsFromState = [...colorKeys];

    console.log('need to handle collision');

    const firstColor = COLORS[colorsFromState[actorPosition]];
    const secondColor = COLORS[colorsFromState[collidedPosition]];

    console.log('firstColor', firstColor);
    console.log('secondColor', secondColor);

    const resultingColorFromCollision = getResultingColor(
      firstColor,
      secondColor
    );

    console.log('resultingColorFromCollision', resultingColorFromCollision);

    if (resultingColorFromCollision) {
      colorsFromState[collidedPosition] = COLORS.indexOf(
        resultingColorFromCollision
      );
      colorsFromState[actorPosition] = null;

      console.log('colorsFromState', colorsFromState);

      setColorKeys(colorsFromState);
    }
  };

  console.log('colorKeys', colorKeys);

  return (
    <View
      style={styles.boardContainer}
      onLayout={event => setBoardWidth(event.nativeEvent.layout.width)}
    >
      <View style={styles.placeholderRowsWrapper}>
        {generateRows(colorKeys).map((row, i) => {
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
        {generateRows(colorKeys).map((row, i) => {
          return (
            <View key={`row-${i}`} style={styles.boardRow}>
              {row.map((colorKey, j) => {
                return (
                  <GameDot
                    key={`${i}-${j}`}
                    position={i * GAME_BOARD_DIMENSION + j}
                    boardWidth={boardWidth}
                    color={
                      colorKey === null
                        ? Colors.darkGray
                        : Colors[COLORS[colorKey]]
                    }
                    onMove={checkCollision}
                  />
                );
              })}
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
