import { GAME_BOARD_DIMENSION } from '../util/configs';
import { COLORS } from '../util/colors';

const generateStartingColors = () => {
  return Array(GAME_BOARD_DIMENSION * GAME_BOARD_DIMENSION)
    .fill(undefined)
    .map(() => Math.floor(Math.random() * COLORS.length - 1) + 1);
};

export default generateStartingColors;
