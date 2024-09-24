import { CHARS } from "../constants";
import Direction, { ALL_DIRECTIONS } from "../constants/direction.enum";

export const DIRECTION_OFFSETS: Record<Direction, [number, number]> = {
  [Direction.UP]: [-1, 0],
  [Direction.RIGHT]: [0, 1],
  [Direction.DOWN]: [1, 0],
  [Direction.LEFT]: [0, -1],
} as const;

export const getOppositeDirection = (direction: Direction): Direction =>
  OPPOSITE_DIRECTION_MAP[direction];

export const getValidDirectionsForChar = (char: string): Direction[] => {
  switch (char) {
    case CHARS.HORIZONTAL:
      return [Direction.LEFT, Direction.RIGHT];
    case CHARS.VERTICAL:
      return [Direction.UP, Direction.DOWN];
    default:
      return ALL_DIRECTIONS;
  }
};

export const isMoveAllowed = (
  char: string,
  nextChar: string,
  direction: Direction
): boolean => {
  if (!isDirectionAllowed(char, direction)) {
    return false;
  }
  return isDirectionAllowed(nextChar, getOppositeDirection(direction));
};

const isDirectionAllowed = (char: string, direction: Direction): boolean =>
  getValidDirectionsForChar(char).includes(direction);

const OPPOSITE_DIRECTION_MAP: Record<Direction, Direction> = {
  [Direction.UP]: Direction.DOWN,
  [Direction.DOWN]: Direction.UP,
  [Direction.LEFT]: Direction.RIGHT,
  [Direction.RIGHT]: Direction.LEFT,
};
