import { Dimensions } from 'react-native';

export const GAME_BOARD_DIMENSION = 3;
export const GAME_BOARD_SPACING = Dimensions.get('window').width * 0.04;

export const DOT_ACTION_DURATION = 150;
export const GET_DOT_WIDTH = boardWidth =>
  (boardWidth - GAME_BOARD_SPACING * (GAME_BOARD_DIMENSION + 1)) /
  GAME_BOARD_DIMENSION;
