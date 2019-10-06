import { BoardHelpers } from '../helpers';
import { GAME_BOARD_DIMENSION } from '../util/configs';

const validCollisionOnSwipe = (initiatingSwipePosition, direction, board) => {
  switch (direction) {
    case 'up':
      // need to check if space colliding with is out of range AND if space is not null
      if (!BoardHelpers.positionIsInTopRow(initiatingSwipePosition)) {
        const spaceCollidingWith =
          initiatingSwipePosition - GAME_BOARD_DIMENSION;

        if (board[spaceCollidingWith].color !== null) {
          return spaceCollidingWith;
        }

        break;
      }
    case 'down':
      if (!BoardHelpers.positionIsInBottomRow(initiatingSwipePosition)) {
        const spaceCollidingWith =
          initiatingSwipePosition + GAME_BOARD_DIMENSION;

        if (board[spaceCollidingWith].color !== null) {
          return spaceCollidingWith;
        }

        break;
      }
    case 'left':
      if (!BoardHelpers.positionIsInLeftColumn(initiatingSwipePosition)) {
        const spaceCollidingWith = initiatingSwipePosition - 1;

        if (board[spaceCollidingWith].color !== null) {
          return spaceCollidingWith;
        }

        break;
      }
    case 'right':
      if (!BoardHelpers.positionIsInRightColumn(initiatingSwipePosition)) {
        const spaceCollidingWith = initiatingSwipePosition + 1;

        if (board[spaceCollidingWith].color !== null) {
          return spaceCollidingWith;
        }

        break;
      }
    default:
      return undefined;
  }
};

export default validCollisionOnSwipe;
