import { GAME_BOARD_DIMENSION } from '../util/configs';
import { PRIMARY_COLORS, SECONDARY_COLORS, BLACK } from '../util/colors';
import {
  pieceIsPrimaryColor,
  pieceIsSecondaryColor,
  pieceIsBlack,
} from './colorsHelpers';

export const positionIsInBoardRange = (
  position,
  boardDimension = GAME_BOARD_DIMENSION
) => position >= 0 && position < boardDimension * boardDimension;

export const positionIsInTopRow = (
  position,
  boardDimension = GAME_BOARD_DIMENSION
) =>
  position < boardDimension && positionIsInBoardRange(position, boardDimension);

export const positionIsInBottomRow = (
  position,
  boardDimension = GAME_BOARD_DIMENSION
) =>
  position >= boardDimension * boardDimension - boardDimension &&
  positionIsInBoardRange(position, boardDimension);

export const positionIsInLeftColumn = (
  position,
  boardDimension = GAME_BOARD_DIMENSION
) =>
  (position === 0 || position % boardDimension === 0) &&
  positionIsInBoardRange(position, boardDimension);

export const positionIsInRightColumn = (
  position,
  boardDimension = GAME_BOARD_DIMENSION
) =>
  (position + 1) % boardDimension === 0 &&
  positionIsInBoardRange(position, boardDimension);

export const getAdjacentPieces = (piece, board) => {
  const adjacentPieces = [];
  const boardDimension = Math.sqrt(Object.values(board).length);

  if (!positionIsInTopRow(piece.position, boardDimension)) {
    const topAdjacent = piece.position - boardDimension;
    adjacentPieces.push(board[topAdjacent]);
  }

  if (!positionIsInBottomRow(piece.position, boardDimension)) {
    const bottomAdjacent = piece.position + boardDimension;
    adjacentPieces.push(board[bottomAdjacent]);
  }

  if (!positionIsInLeftColumn(piece.position, boardDimension)) {
    const leftAdjacent = piece.position - 1;
    adjacentPieces.push(board[leftAdjacent]);
  }

  if (!positionIsInRightColumn(piece.position, boardDimension)) {
    const rightAdjacent = piece.position + 1;
    adjacentPieces.push(board[rightAdjacent]);
  }

  return adjacentPieces;
};

export const pieceHasValidMove = (piece, board) => {
  const adjacentPieces = getAdjacentPieces(piece, board);

  if (pieceIsPrimaryColor(piece)) {
    return adjacentPieces.some(p => pieceIsPrimaryColor(p));
  }

  if (pieceIsSecondaryColor(piece)) {
    return adjacentPieces.some(p => pieceIsSecondaryColor(p));
  }

  if (pieceIsBlack(piece)) {
    return adjacentPieces.some(p => pieceIsBlack(p));
  }
};

export const noSpacesAreEmpty = pieces =>
  !Object.values(pieces).some(piece => piece.color === null);
