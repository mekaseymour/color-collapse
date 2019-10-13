import * as BoardHelpers from '../boardHelpers';

describe('positionIsInTopRow', () => {
  test('returns true if space is in top row', () => {
    const actual = BoardHelpers.positionIsInTopRow(3);

    expect(actual).toEqual(true);
  });

  test('returns false if space is not in top row', () => {
    const actual = BoardHelpers.positionIsInTopRow(11);

    expect(actual).toEqual(false);
  });

  test('returns false if space is out of range', () => {
    const actual = BoardHelpers.positionIsInTopRow(-5);

    expect(actual).toEqual(false);
  });
});

describe('positionIsInBottomRow', () => {
  test('returns true if space is in bottom row', () => {
    const actual = BoardHelpers.positionIsInBottomRow(13);

    expect(actual).toEqual(true);
  });

  test('returns false if space is not in bottom row', () => {
    const actual = BoardHelpers.positionIsInBottomRow(5);

    expect(actual).toEqual(false);
  });

  test('returns false if space is out of range', () => {
    const actual = BoardHelpers.positionIsInBottomRow(100);

    expect(actual).toEqual(false);
  });
});

describe('positionIsInBottomRow', () => {
  test('returns true if space is in bottom row', () => {
    const actual = BoardHelpers.positionIsInBottomRow(13);

    expect(actual).toEqual(true);
  });

  test('returns false if space is not in bottom row', () => {
    const actual = BoardHelpers.positionIsInBottomRow(5);

    expect(actual).toEqual(false);
  });

  test('returns false if space is out of range', () => {
    const actual = BoardHelpers.positionIsInBottomRow(100);

    expect(actual).toEqual(false);
  });
});

describe('positionIsInLeftColumn', () => {
  test('returns true if space is in left column', () => {
    const actual = BoardHelpers.positionIsInLeftColumn(0);

    expect(actual).toEqual(true);
  });

  test('returns false if space is not in left column', () => {
    const actual = BoardHelpers.positionIsInLeftColumn(15);

    expect(actual).toEqual(false);
  });

  test('returns false if space is out of range', () => {
    const actual = BoardHelpers.positionIsInLeftColumn(50);

    expect(actual).toEqual(false);
  });
});

describe('positionIsInRightColumn', () => {
  test('returns true if space is in right column', () => {
    const actual = BoardHelpers.positionIsInRightColumn(11);

    expect(actual).toEqual(true);
  });

  test('returns false if space is not in right column', () => {
    const actual = BoardHelpers.positionIsInRightColumn(6);

    expect(actual).toEqual(false);
  });

  test('returns false if space is out of range', () => {
    const actual = BoardHelpers.positionIsInRightColumn(-50);

    expect(actual).toEqual(false);
  });
});

describe('positionIsInBoardRange', () => {
  test('returns true if position is in the range of the board', () => {
    const actual = BoardHelpers.positionIsInBoardRange(0);

    expect(actual).toEqual(true);
  });

  test('returns false if position is not in the range of the board', () => {
    const actual = BoardHelpers.positionIsInBoardRange(67);

    expect(actual).toEqual(false);
  });
});
