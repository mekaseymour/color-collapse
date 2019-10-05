import {
  BLACK,
  BLUE,
  GREEN,
  ORANGE,
  PURPLE,
  RED,
  YELLOW,
} from '../../util/colors';
import getResultingColor from '../getResultingColor';

test('returns given color when given colors are the same', () => {
  const actual = getResultingColor(BLUE, BLUE);

  expect(actual).toEqual(BLUE);
});

test('returns ORANGE when given colors are RED and YELLOW', () => {
  const actual = getResultingColor(RED, YELLOW);

  expect(actual).toEqual(ORANGE);
});

test('returns GREEN when given colors are BLUE and YELLOW', () => {
  const actual = getResultingColor(BLUE, YELLOW);

  expect(actual).toEqual(GREEN);
});

test('returns PURPLE when given colors are RED and BLUE', () => {
  const actual = getResultingColor(RED, BLUE);

  expect(actual).toEqual(PURPLE);
});

test('returns BLACK when given colors are ORANGE and GREEN', () => {
  const actual = getResultingColor(ORANGE, GREEN);

  expect(actual).toEqual(BLACK);
});

test('returns BLACK when given colors are ORANGE and PURPLE', () => {
  const actual = getResultingColor(ORANGE, PURPLE);

  expect(actual).toEqual(BLACK);
});

test('returns BLACK when given colors are PURPLE and GREEN', () => {
  const actual = getResultingColor(PURPLE, GREEN);

  expect(actual).toEqual(BLACK);
});
