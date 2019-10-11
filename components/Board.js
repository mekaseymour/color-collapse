import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Dot from './Dot';
import GameDot from './GameDot';
import { Colors } from '../styles';
import generateStartingColors from '../helpers/generateStartingColors';
import { BoardHelpers } from '../helpers';
import validCollisionOnSwipe from '../helpers/validCollisionOnSwipe';

import {
  DOT_ACTION_DURATION,
  GAME_BOARD_DIMENSION,
  GAME_BOARD_SPACING,
} from '../util/configs';
import getResultingColor from '../helpers/getResultingColor';

const Board = () => {
  const [boardWidth, setBoardWidth] = useState(null);
  const [gamePieces, setPiecesData] = useState({});

  useEffect(() => {
    const startingColors = generateStartingColors();
    const data = {};

    startingColors.forEach((color, i) => {
      data[i] = { position: i, color: color };
    });

    setPiecesData(data);
  }, []);

  const generateRows = pieces => {
    const rows = [];

    for (let i = 0; i < GAME_BOARD_DIMENSION; i++) {
      const rowStart = i * GAME_BOARD_DIMENSION;
      const rowEnd = rowStart + GAME_BOARD_DIMENSION;
      const row = pieces.slice(rowStart, rowEnd);
      rows.push(row);
    }

    return rows;
  };

  const handleMove = (originatedPosition, moveDirection, onSuccessfulMove) => {
    const validSpaceCollidingWith = validCollisionOnSwipe(
      originatedPosition,
      moveDirection,
      gamePieces
    );

    if (validSpaceCollidingWith) {
      handleCollision(
        originatedPosition,
        validSpaceCollidingWith,
        onSuccessfulMove
      );
    }
  };

  const handleCollision = (actorPosition, collidedPosition, afterCollision) => {
    const firstColor = gamePieces[actorPosition].color;
    const secondColor = gamePieces[collidedPosition].color;

    const resultingColorFromCollision = getResultingColor(
      firstColor,
      secondColor
    );

    if (resultingColorFromCollision) {
      const gamePiecesFromState = { ...gamePieces };
      gamePiecesFromState[actorPosition].color = null;
      gamePiecesFromState[actorPosition].colorWhileAnimating = firstColor;
      gamePiecesFromState[actorPosition].isAnimating = true;

      gamePiecesFromState[collidedPosition].color = resultingColorFromCollision;

      setPiecesData(gamePiecesFromState);

      afterCollision();
    }
  };

  const fillSpacesDown = vacatedPosition => {
    if (BoardHelpers.positionIsInTopRow(vacatedPosition)) {
      console.log('need to generate new piece');
      return;
    }

    const spaceAboveVacatedPosition = vacatedPosition - GAME_BOARD_DIMENSION;
    const gamePiecesFromState = { ...gamePieces };
    gamePiecesFromState[spaceAboveVacatedPosition].shift = true;
    setPiecesData(gamePiecesFromState);

    return fillSpacesDown(spaceAboveVacatedPosition);
  };

  const onCollisionComplete = position => {
    const gamePiecesFromState = { ...gamePieces };
    gamePiecesFromState[position].color = null;
    gamePiecesFromState[position].colorWhileAnimating = null;
    gamePiecesFromState[position].isAnimating = false;
    setPiecesData(gamePiecesFromState);

    fillSpacesDown(position);
  };

  const onShiftComplete = position => {
    const gamePiecesFromState = { ...gamePieces };
    const colorOfShiftedPiece = gamePiecesFromState[position].color;
    const spaceShiftedInto = position + GAME_BOARD_DIMENSION;

    gamePiecesFromState[position].shift = false;
    gamePiecesFromState[position].color = null;
    gamePiecesFromState[spaceShiftedInto].color = colorOfShiftedPiece;
    setPiecesData(gamePiecesFromState);
  };

  console.log('gamePieces', gamePieces);

  return (
    <View
      style={styles.boardContainer}
      onLayout={event => setBoardWidth(event.nativeEvent.layout.width)}
    >
      <View style={styles.placeholderRowsWrapper}>
        {generateRows(Object.values(gamePieces)).map((row, i) => {
          return (
            <View key={`row-${i}`} style={styles.boardRow}>
              {row.map((space, j) => (
                <Dot
                  key={`${i}-${j}`}
                  boardWidth={boardWidth}
                  color="PLACEHOLDER"
                />
              ))}
            </View>
          );
        })}
      </View>
      <View style={styles.gameDotRowsWrapper}>
        {generateRows(Object.values(gamePieces)).map((row, i) => {
          return (
            <View key={`row-${i}`} style={styles.boardRow}>
              {row.map((space, j) => {
                const position = i * GAME_BOARD_DIMENSION + j;

                if (
                  gamePieces[position].color ||
                  gamePieces[position].isAnimating
                ) {
                  return (
                    <GameDot
                      key={`${i}-${j}`}
                      data={gamePieces[position]}
                      boardWidth={boardWidth}
                      onValidCollision={handleCollision}
                      onMove={handleMove}
                      onCollisionComplete={onCollisionComplete}
                      onShiftComplete={onShiftComplete}
                    />
                  );
                } else {
                  return <Dot key={`${i}-${j}`} boardWidth={boardWidth} />;
                }
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
    zIndex: 1,
  },
  placeholderRowsWrapper: {
    justifyContent: 'space-between',
    width: '100%',
    aspectRatio: 1,
  },
});

export default Board;
