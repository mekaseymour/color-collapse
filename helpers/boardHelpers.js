import { GAME_BOARD_DIMENSION } from '../util/configs';

export const positionIsInTopRow = (
  position,
  boardDimension = GAME_BOARD_DIMENSION
) => position < boardDimension;
export const positionIsInBottomRow = (
  position,
  boardDimension = GAME_BOARD_DIMENSION
) => position >= boardDimension * boardDimension - boardDimension;
export const positionIsInLeftColumn = (
  position,
  boardDimension = GAME_BOARD_DIMENSION
) => position === 0 || position % boardDimension === 0;
export const positionIsInRightColumn = (
  position,
  boardDimension = GAME_BOARD_DIMENSION
) => (position + 1) % boardDimension === 0;
