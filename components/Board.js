import React, { useEffect, useState } from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';

import Dot from './Dot';
import GameDot from './GameDot';
import { Colors } from '../styles';
import { BoardHelpers, ColorsHelpers, GameHelpers } from '../helpers';
import validCollisionOnSwipe from '../helpers/validCollisionOnSwipe';
import { HIGH_SCORE } from '../util/storageKeys';

import {
  DOT_ACTION_DURATION,
  GAME_BOARD_DIMENSION,
  GAME_BOARD_SPACING,
} from '../util/configs';

const Board = ({ context, gamesCount, onGameOver }) => {
  const [boardWidth, setBoardWidth] = useState(null);
  const [gamePieces, setGamePiecesData] = useState({});

  useEffect(() => {
    const startingColors = ColorsHelpers.generateStartingColors();
    const data = {};

    startingColors.forEach((color, i) => {
      data[i] = { position: i, color: color };
    });

    setGamePiecesData(data);
  }, [gamesCount]);

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

    if (validSpaceCollidingWith !== undefined) {
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

    const resultingColorFromCollision = ColorsHelpers.getResultingColor(
      firstColor,
      secondColor
    );

    if (resultingColorFromCollision) {
      /* update pieces' colors after move */
      const gamePiecesFromState = { ...gamePieces };
      gamePiecesFromState[actorPosition].color = null;
      gamePiecesFromState[actorPosition].colorWhileAnimating = firstColor;
      gamePiecesFromState[actorPosition].isAnimating = true;

      gamePiecesFromState[collidedPosition].color = resultingColorFromCollision;

      setGamePiecesData(gamePiecesFromState);

      /* update points after move */
      const points = GameHelpers.getPointsEarnedFromCollision(
        firstColor,
        secondColor
      );
      updateScore(points);

      afterCollision();
    }
  };

  const updateScore = newPoints => {
    const totalFromState = context.score;
    const newTotalScore = totalFromState + newPoints;
    context.setScore(newTotalScore);

    if (newTotalScore > context.highScore) {
      context.setHighScore(newTotalScore);
      context.setNewHighScoreReached(true);
      AsyncStorage.setItem(HIGH_SCORE, String(newTotalScore));
    }
  };

  const noValidMovesAvailable = () =>
    !Object.values(gamePieces).some(p =>
      BoardHelpers.pieceHasValidMove(p, gamePieces)
    );

  const fillSpacesDown = vacatedPosition => {
    const gamePiecesFromState = { ...gamePieces };

    if (BoardHelpers.positionIsInTopRow(vacatedPosition)) {
      const newGeneratedColor = ColorsHelpers.generateRandomColor();

      gamePiecesFromState[vacatedPosition].color = newGeneratedColor;
      gamePiecesFromState[vacatedPosition].swell = true;
      setGamePiecesData(gamePiecesFromState);

      if (noValidMovesAvailable()) {
        onGameOver();
      }
      return;
    }

    const spaceAboveVacatedPosition = vacatedPosition - GAME_BOARD_DIMENSION;
    gamePiecesFromState[spaceAboveVacatedPosition].shift = true;
    setGamePiecesData(gamePiecesFromState);
  };

  const onCollisionComplete = position => {
    const gamePiecesFromState = { ...gamePieces };
    gamePiecesFromState[position].color = null;
    gamePiecesFromState[position].colorWhileAnimating = null;
    gamePiecesFromState[position].isAnimating = false;
    setGamePiecesData(gamePiecesFromState);

    fillSpacesDown(position);
  };

  const onShiftComplete = position => {
    const gamePiecesFromState = { ...gamePieces };
    const colorOfShiftedPiece = gamePiecesFromState[position].color;
    const spaceShiftedInto = position + GAME_BOARD_DIMENSION;

    gamePiecesFromState[position].shift = false;
    gamePiecesFromState[position].color = null;
    gamePiecesFromState[spaceShiftedInto].color = colorOfShiftedPiece;
    setGamePiecesData(gamePiecesFromState);

    fillSpacesDown(position);
    if (noValidMovesAvailable()) {
      onGameOver();
    }
  };

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
