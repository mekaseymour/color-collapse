import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Dot from './Dot';
import GameDot from './GameDot';
import { Colors } from '../styles';
import generateStartingColors from '../helpers/generateStartingColors';
import { BoardHelpers } from '../helpers';

import {
  DOT_ACTION_DURATION,
  GAME_BOARD_DIMENSION,
  GAME_BOARD_SPACING,
} from '../util/configs';
import getResultingColor from '../helpers/getResultingColor';

const Board = () => {
  const [boardWidth, setBoardWidth] = useState(null);
  const [colorKeys, setColorKeys] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    setColors(generateStartingColors());
  }, []);

  const generateRows = colors => {
    const rows = [];

    for (let i = 0; i < GAME_BOARD_DIMENSION; i++) {
      const rowStart = i * GAME_BOARD_DIMENSION;
      const rowEnd = rowStart + GAME_BOARD_DIMENSION;
      const row = colors.slice(rowStart, rowEnd);
      rows.push(row);
    }

    return rows;
  };

  const checkCollision = (actorPosition, direction, afterCollision) => {
    let spaceCollidingWith;

    switch (direction) {
      case 'up':
        if (!BoardHelpers.positionIsInTopRow(actorPosition)) {
          spaceCollidingWith = actorPosition - GAME_BOARD_DIMENSION;
          afterCollision();
        }
        break;
      case 'down':
        if (!BoardHelpers.positionIsInBottomRow(actorPosition)) {
          spaceCollidingWith = actorPosition + GAME_BOARD_DIMENSION;
          afterCollision();
        }
        break;
      case 'left':
        if (!BoardHelpers.positionIsInLeftColumn(actorPosition)) {
          spaceCollidingWith = actorPosition - 1;
          afterCollision();
        }
        break;
      case 'right':
        if (!BoardHelpers.positionIsInRightColumn(actorPosition)) {
          spaceCollidingWith = actorPosition + 1;
          afterCollision();
        }
        break;
    }

    if (spaceCollidingWith) {
      handleCollision(actorPosition, spaceCollidingWith);
    }
  };

  const handleCollision = (actorPosition, collidedPosition) => {
    const colorsFromState = [...colors];

    const firstColor = colorsFromState[actorPosition];
    const secondColor = colorsFromState[collidedPosition];

    const resultingColorFromCollision = getResultingColor(
      firstColor,
      secondColor
    );

    if (resultingColorFromCollision) {
      colorsFromState[collidedPosition] = resultingColorFromCollision;
      colorsFromState[actorPosition] = null;

      setTimeout(() => setColors(colorsFromState), DOT_ACTION_DURATION);
    }
  };

  return (
    <View
      style={styles.boardContainer}
      onLayout={event => setBoardWidth(event.nativeEvent.layout.width)}
    >
      <View style={styles.placeholderRowsWrapper}>
        {generateRows(colors).map((row, i) => {
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
        {generateRows(colors).map((row, i) => {
          return (
            <View key={`row-${i}`} style={styles.boardRow}>
              {row.map((color, j) => {
                return (
                  <GameDot
                    key={`${i}-${j}`}
                    position={i * GAME_BOARD_DIMENSION + j}
                    boardWidth={boardWidth}
                    color={color === null ? 'transparent' : Colors[color]}
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
