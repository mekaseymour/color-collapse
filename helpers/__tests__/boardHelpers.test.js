import * as BoardHelpers from '../boardHelpers';
import * as TestSetupHelpers from '../testSetupHelpers';

describe('positionIsInTopRow', () => {
  test('returns true if space is in top row', () => {
    const actual = BoardHelpers.positionIsInTopRow(3, 4);

    expect(actual).toEqual(true);
  });

  test('returns false if space is not in top row', () => {
    const actual = BoardHelpers.positionIsInTopRow(11, 4);

    expect(actual).toEqual(false);
  });

  test('returns false if space is out of range', () => {
    const actual = BoardHelpers.positionIsInTopRow(-5, 4);

    expect(actual).toEqual(false);
  });
});

describe('positionIsInBottomRow', () => {
  test('returns true if space is in bottom row', () => {
    const actual = BoardHelpers.positionIsInBottomRow(13, 4);

    expect(actual).toEqual(true);
  });

  test('returns false if space is not in bottom row', () => {
    const actual = BoardHelpers.positionIsInBottomRow(5, 4);

    expect(actual).toEqual(false);
  });

  test('returns false if space is out of range', () => {
    const actual = BoardHelpers.positionIsInBottomRow(100, 4);

    expect(actual).toEqual(false);
  });
});

describe('positionIsInBottomRow', () => {
  test('returns true if space is in bottom row', () => {
    const actual = BoardHelpers.positionIsInBottomRow(13, 4);

    expect(actual).toEqual(true);
  });

  test('returns false if space is not in bottom row', () => {
    const actual = BoardHelpers.positionIsInBottomRow(5, 4);

    expect(actual).toEqual(false);
  });

  test('returns false if space is out of range', () => {
    const actual = BoardHelpers.positionIsInBottomRow(100, 4);

    expect(actual).toEqual(false);
  });
});

describe('positionIsInLeftColumn', () => {
  test('returns true if space is in left column', () => {
    const actual = BoardHelpers.positionIsInLeftColumn(0, 4);

    expect(actual).toEqual(true);
  });

  test('returns false if space is not in left column', () => {
    const actual = BoardHelpers.positionIsInLeftColumn(15, 4);

    expect(actual).toEqual(false);
  });

  test('returns false if space is out of range', () => {
    const actual = BoardHelpers.positionIsInLeftColumn(50, 4);

    expect(actual).toEqual(false);
  });
});

describe('positionIsInRightColumn', () => {
  test('returns true if space is in right column', () => {
    const actual = BoardHelpers.positionIsInRightColumn(11, 4);

    expect(actual).toEqual(true);
  });

  test('returns false if space is not in right column', () => {
    const actual = BoardHelpers.positionIsInRightColumn(6, 4);

    expect(actual).toEqual(false);
  });

  test('returns false if space is out of range', () => {
    const actual = BoardHelpers.positionIsInRightColumn(-50, 4);

    expect(actual).toEqual(false);
  });
});

describe('positionIsInBoardRange', () => {
  test('returns true if position is in the range of the board', () => {
    const actual = BoardHelpers.positionIsInBoardRange(0, 4);

    expect(actual).toEqual(true);
  });

  test('returns false if position is not in the range of the board', () => {
    const actual = BoardHelpers.positionIsInBoardRange(67, 4);

    expect(actual).toEqual(false);
  });
});

describe('pieceHasValidMove', () => {
  it('returns true if piece has valid move available', () => {
    const board = TestSetupHelpers.boardWithNoValidMoves;
    const piece = board['5'];

    const actual = BoardHelpers.pieceHasValidMove(piece, board);

    expect(actual).toEqual(false);
  });

  it('returns false if piece does not have valid move available', () => {
    const board = TestSetupHelpers.boardWithValidMoves;
    const piece = board['1'];

    const actual = BoardHelpers.pieceHasValidMove(piece, board);

    expect(actual).toEqual(true);
  });
});
