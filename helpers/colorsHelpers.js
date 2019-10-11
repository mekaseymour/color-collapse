import { GAME_BOARD_DIMENSION } from '../util/configs';
import { COLORFUL_COLORS } from '../util/colors';

export const generateRandomColor = () => {
  const colors = Object.values(COLORFUL_COLORS);
  return colors[Math.floor(Math.random() * colors.length - 1) + 1];
};

export const generateStartingColors = () => {
  return Array(GAME_BOARD_DIMENSION * GAME_BOARD_DIMENSION)
    .fill(undefined)
    .map(() => generateRandomColor());
};
