import colorsAreBothSecondary from './colorsAreBothSecondary';
import {
  BLACK,
  BLUE,
  GREEN,
  ORANGE,
  PURPLE,
  RED,
  YELLOW,
} from '../util/colors';

const colorsAreTheSame = (firstColor, secondColor) =>
  firstColor === secondColor;

const getResultingColor = (firstColor, secondColor) => {
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

export default getResultingColor;
