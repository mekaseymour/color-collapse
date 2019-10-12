import { GAME_BOARD_DIMENSION } from '../util/configs';

export const positionIsInBoardRange = (
  position,
  boardDimension = GAME_BOARD_DIMENSION
) =>
  position >= 0 && position < GAME_BOARD_DIMENSION * GAME_BOARD_DIMENSION - 1;

export const positionIsInTopRow = (
  position,
  boardDimension = GAME_BOARD_DIMENSION
) => position < boardDimension && positionIsInBoardRange(position);
export const positionIsInBottomRow = (
  position,
  boardDimension = GAME_BOARD_DIMENSION
) =>
  position >= boardDimension * boardDimension - boardDimension &&
  positionIsInBoardRange(position);
export const positionIsInLeftColumn = (
  position,
  boardDimension = GAME_BOARD_DIMENSION
) =>
  (position === 0 || position % boardDimension === 0) &&
  positionIsInBoardRange(position);
export const positionIsInRightColumn = (
  position,
  boardDimension = GAME_BOARD_DIMENSION
) => (position + 1) % boardDimension === 0 && positionIsInBoardRange(position);
