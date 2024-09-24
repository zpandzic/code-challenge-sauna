import Direction from "../constants/direction.enum";
import { PathError } from "../constants/errors.enum";
import { DirectionFinder } from "../core/DirectionFinder";
import { PathNode } from "../core/PathNode";

describe("DirectionFinder", () => {
  let startNode: PathNode;
  let endNode: PathNode;
  let intermediateNode: PathNode;

  beforeEach(() => {
    startNode = new PathNode("@", 0, 0);
    intermediateNode = new PathNode("-", 0, 1);
    endNode = new PathNode("x", 0, 2);

    startNode.directions[Direction.RIGHT] = intermediateNode;
    intermediateNode.directions[Direction.LEFT] = startNode;
    intermediateNode.directions[Direction.RIGHT] = endNode;
    endNode.directions[Direction.LEFT] = intermediateNode;
  });

  describe("Valid direction tests", () => {
    it("should return valid direction based on the node and previous direction", () => {
      const validDirection = DirectionFinder.getValidDirection(startNode, null);
      expect(validDirection).toBe(Direction.RIGHT);
    });

    it("should return valid direction when previous direction is provided", () => {
      const validDirection = DirectionFinder.getValidDirection(
        startNode,
        Direction.RIGHT
      );
      expect(validDirection).toBe(Direction.RIGHT);
    });
  });

  describe("Error handling for invalid paths", () => {
    it("should throw an error if the path is broken", () => {
      startNode.directions = {};

      expect(() => DirectionFinder.getValidDirection(startNode, null)).toThrow(
        PathError.BROKEN_PATH
      );
    });

    it("should throw an error for fork in the path", () => {
      startNode.directions[Direction.DOWN] = new PathNode("|", 1, 0);

      expect(() => DirectionFinder.getValidDirection(startNode, null)).toThrow(
        PathError.FORK_IN_PATH
      );
    });

    it("should throw an error for fake turn", () => {
      intermediateNode.char = "+";

      expect(() =>
        DirectionFinder.getValidDirection(intermediateNode, Direction.RIGHT)
      ).toThrow(PathError.FAKE_TURN);
    });
  });

  describe("Edge case validations", () => {
    it("should throw ForkInPath error when multiple directions are available", () => {
      startNode.directions[Direction.DOWN] = new PathNode("|", 1, 0);

      expect(() => DirectionFinder.getValidDirection(startNode, null)).toThrow(
        PathError.FORK_IN_PATH
      );
    });

    it("should throw BrokenPath error when no directions are available", () => {
      startNode.directions = {};

      expect(() => DirectionFinder.getValidDirection(startNode, null)).toThrow(
        PathError.BROKEN_PATH
      );
    });

    it("should throw FakeTurn error when encountering an intersection with a fake turn", () => {
      intermediateNode.char = "+";

      expect(() =>
        DirectionFinder.getValidDirection(intermediateNode, Direction.RIGHT)
      ).toThrow(PathError.FAKE_TURN);
    });
  });
});
