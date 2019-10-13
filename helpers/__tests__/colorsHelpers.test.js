import * as ColorsHelpers from '../colorsHelpers';
import {
  GREEN,
  ORANGE,
  PURPLE,
  RED,
  BLUE,
  BLACK,
  YELLOW,
} from '../../util/colors';

describe('colorsAreBothSecondary', () => {
  test('returns true when both given colors are secondary colors', () => {
    const actual = ColorsHelpers.colorsAreBothSecondary(PURPLE, GREEN);

    expect(actual).toEqual(true);
  });

  test('returns false if one of the given colors is not a secondary colors', () => {
    const actual = ColorsHelpers.colorsAreBothSecondary(RED, GREEN);

    expect(actual).toEqual(false);
  });

  test('returns false if both given colors are not secondary colors', () => {
    const actual = ColorsHelpers.colorsAreBothSecondary(RED, BLUE);

    expect(actual).toEqual(false);
  });
});

describe('colorsAreBothPrimary', () => {
  test('returns true when both given colors are primary colors', () => {
    const actual = ColorsHelpers.colorsAreBothPrimary(RED, YELLOW);

    expect(actual).toEqual(true);
  });

  test('returns false if one of the given colors is not a primary colors', () => {
    const actual = ColorsHelpers.colorsAreBothPrimary(RED, GREEN);

    expect(actual).toEqual(false);
  });

  test('returns false if both given colors are not primary colors', () => {
    const actual = ColorsHelpers.colorsAreBothPrimary(PURPLE, ORANGE);

    expect(actual).toEqual(false);
  });
});

describe('colorsAreBothBlack', () => {
  test('returns true if both given colors are black', () => {
    const actual = ColorsHelpers.colorsAreBothBlack(BLACK, BLACK);

    expect(actual).toEqual(true);
  });

  test('returns false if both given colors are not black', () => {
    const actual = ColorsHelpers.colorsAreBothBlack(BLACK, BLUE);

    expect(actual).toEqual(false);
  });
});

describe('getResultingColor', () => {
  test('returns given color when given colors are the same', () => {
    const actual = ColorsHelpers.getResultingColor(BLUE, BLUE);

    expect(actual).toEqual(BLUE);
  });

  test('returns ORANGE when given colors are RED and YELLOW', () => {
    const actual = ColorsHelpers.getResultingColor(RED, YELLOW);

    expect(actual).toEqual(ORANGE);
  });

  test('returns GREEN when given colors are BLUE and YELLOW', () => {
    const actual = ColorsHelpers.getResultingColor(BLUE, YELLOW);

    expect(actual).toEqual(GREEN);
  });

  test('returns PURPLE when given colors are RED and BLUE', () => {
    const actual = ColorsHelpers.getResultingColor(RED, BLUE);

    expect(actual).toEqual(PURPLE);
  });

  test('returns BLACK when given colors are ORANGE and GREEN', () => {
    const actual = ColorsHelpers.getResultingColor(ORANGE, GREEN);

    expect(actual).toEqual(BLACK);
  });

  test('returns BLACK when given colors are ORANGE and PURPLE', () => {
    const actual = ColorsHelpers.getResultingColor(ORANGE, PURPLE);

    expect(actual).toEqual(BLACK);
  });

  test('returns BLACK when given colors are PURPLE and GREEN', () => {
    const actual = ColorsHelpers.getResultingColor(PURPLE, GREEN);

    expect(actual).toEqual(BLACK);
  });
});
