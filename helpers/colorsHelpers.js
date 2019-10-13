import { GAME_BOARD_DIMENSION } from '../util/configs';
import {
  PRIMARY_COLORS,
  COLORFUL_COLORS,
  SECONDARY_COLORS,
  BLACK,
  BLUE,
  GREEN,
  ORANGE,
  PURPLE,
  RED,
  YELLOW,
} from '../util/colors';

export const generateRandomColor = (primaryOnly = false) => {
  const collection = primaryOnly ? PRIMARY_COLORS : COLORFUL_COLORS;
  const colors = Object.values(collection);
  return colors[Math.floor(Math.random() * colors.length - 1) + 1];
};

export const generateStartingColors = () => {
  return Array(GAME_BOARD_DIMENSION * GAME_BOARD_DIMENSION)
    .fill(undefined)
    .map(() => generateRandomColor(true));
};

export const colorsAreBothSecondary = (firstColor, secondColor) => {
  return !!(
    SECONDARY_COLORS[firstColor.toUpperCase()] &&
    SECONDARY_COLORS[secondColor.toUpperCase()]
  );
};

export const colorsAreBothPrimary = (firstColor, secondColor) => {
  return !!(
    PRIMARY_COLORS[firstColor.toUpperCase()] &&
    PRIMARY_COLORS[secondColor.toUpperCase()]
  );
};

export const colorsAreBothBlack = (firstColor, secondColor) => {
  return colorsAreTheSame(firstColor, secondColor) && firstColor === BLACK;
};

const colorsAreTheSame = (firstColor, secondColor) =>
  firstColor === secondColor;

export const getResultingColor = (firstColor, secondColor) => {
  const combination = [firstColor, secondColor].sort();

  if (colorsAreTheSame(firstColor, secondColor)) {
    return firstColor;
  } else if (colorsAreBothSecondary(firstColor, secondColor)) {
    return BLACK;
  } else {
    if (
      [BLUE, YELLOW].includes(firstColor) &&
      [BLUE, YELLOW].includes(secondColor)
    ) {
      return GREEN;
    } else if (
      [RED, YELLOW].includes(firstColor) &&
      [RED, YELLOW].includes(secondColor)
    ) {
      return ORANGE;
    } else if (
      [BLUE, RED].includes(firstColor) &&
      [BLUE, RED].includes(secondColor)
    ) {
      return PURPLE;
    }
  }
};

const isPrimaryColor = color => color && !!PRIMARY_COLORS[color.toUpperCase()];
const isSecondaryColor = color =>
  color && !!SECONDARY_COLORS[color.toUpperCase()];

export const pieceIsPrimaryColor = piece => isPrimaryColor(piece.color);
export const pieceIsSecondaryColor = piece => isSecondaryColor(piece.color);
export const pieceIsBlack = piece => piece.color === BLACK;
