import { CHARS } from "../constants";
import Direction, { ALL_DIRECTIONS } from "../constants/direction.enum";
import { PathError } from "../constants/errors.enum";
import { getOppositeDirection } from "../utils/direction-utils";
import { PathNode } from "./PathNode";

export class DirectionFinder {
  public static getValidDirection(
    node: PathNode,
    previousDirection: Direction | null
  ): Direction {
    const potentialDirections = this.getPotentialDirections(
      node,
      previousDirection
    );

    this.validatePath(potentialDirections, previousDirection, node.char);

    return potentialDirections[0];
  }

  private static getPotentialDirections(
    node: PathNode,
    previousDirection: Direction | null
  ): Direction[] {
    return [...ALL_DIRECTIONS]
      .sort((a, b) =>
        a === previousDirection ? -1 : b === previousDirection ? 1 : 0
      )
      .filter((direction) =>
        this.canMoveToDirection(node, direction, previousDirection)
      );
  }

  private static canMoveToDirection(
    node: PathNode,
    direction: Direction,
    previousDirection: Direction | null
  ): boolean {
    return (
      node.isDirectionConnected(direction) &&
      previousDirection !== getOppositeDirection(direction)
    );
  }

  private static validatePath(
    potentialDirections: Direction[],
    previousDirection: Direction | null,
    char: string
  ): void {
    if (this.checkBrokenPath(potentialDirections)) {
      throw new Error(PathError.BROKEN_PATH);
    }

    if (this.checkPathForFork(potentialDirections, previousDirection)) {
      throw new Error(PathError.FORK_IN_PATH);
    }

    if (
      char === CHARS.INTERSECTION &&
      this.checkForFakeTurn(potentialDirections, previousDirection)
    ) {
      throw new Error(PathError.FAKE_TURN);
    }
  }

  private static checkBrokenPath(potentialDirections: Direction[]): boolean {
    return !potentialDirections.length;
  }

  private static checkPathForFork(
    potentialDirections: Direction[],
    previousDirection: Direction | null
  ): boolean {
    return (
      potentialDirections.length > 1 &&
      !potentialDirections.find((d) => d === previousDirection)
    );
  }

  private static checkForFakeTurn(
    potentialDirections: Direction[],
    previousDirection: Direction | null
  ): boolean {
    return (
      potentialDirections.length === 1 &&
      potentialDirections[0] === previousDirection
    );
  }
}
