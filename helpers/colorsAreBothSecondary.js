import { GREEN, ORANGE, PURPLE } from '../util/colors';

const secondaryColors = [GREEN, ORANGE, PURPLE];

const colorsAreBothSecondary = (firstColor, secondColor) => {
  return (
    secondaryColors.includes(firstColor) &&
    secondaryColors.includes(secondColor)
  );
};

export default colorsAreBothSecondary;
