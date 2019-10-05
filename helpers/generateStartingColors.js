import { GAME_BOARD_DIMENSION } from '../util/configs';
import { COLORFUL_COLORS } from '../util/colors';

const generateStartingColors = () => {
  const colors = Object.values(COLORFUL_COLORS);
  return Array(GAME_BOARD_DIMENSION * GAME_BOARD_DIMENSION)
    .fill(undefined)
    .map(() => colors[Math.floor(Math.random() * colors.length - 1) + 1]);
};

export default generateStartingColors;
