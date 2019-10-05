import { GREEN, ORANGE, PURPLE, RED } from '../../util/colors';
import colorsAreBothSecondary from '../colorsAreBothSecondary';

test('returns true if both given colors are secondary colors', () => {
  const actual = colorsAreBothSecondary(ORANGE, PURPLE);

  expect(actual).toEqual(true);
});

test('returns false if either one of, or both, given colors are not secondary colors', () => {
  const actual = colorsAreBothSecondary(RED, GREEN);

  expect(actual).toEqual(false);
});
