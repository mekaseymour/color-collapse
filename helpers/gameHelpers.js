import * as ColorsHelpers from './colorsHelpers';

const POINTS_FOR_PRIMARY_COLLISION = 5;
const POINTS_FOR_SECONDARY_COLLISION = 10;
const POINTS_FOR_BLACK_COLLISION = 20;

export const getPointsEarnedFromCollision = (pieceOne, pieceTwo) => {
  if (ColorsHelpers.colorsAreBothPrimary(pieceOne, pieceTwo)) {
    return POINTS_FOR_PRIMARY_COLLISION;
  } else if (ColorsHelpers.colorsAreBothSecondary(pieceOne, pieceTwo)) {
    return POINTS_FOR_SECONDARY_COLLISION;
  } else if (ColorsHelpers.colorsAreBothBlack(pieceOne, pieceTwo)) {
    return POINTS_FOR_BLACK_COLLISION;
  } else {
    return 0;
  }
};
