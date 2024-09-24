import Direction from "../constants/direction.enum";
import { PathError, ValidationError } from "../constants/errors.enum";
import { PathMap } from "../core/PathMap";

describe("PathMap", () => {
  describe("Invalid Map Tests", () => {
    it("should throw an error if the map is missing a start character", () => {
      const invalidMap = `
        -x
      `;

      expect(() => new PathMap(invalidMap)).toThrow(
        ValidationError.MISSING_START_CHARACTER
      );
    });

    it("should throw an error if the map is missing an end character", () => {
      const invalidMap = `
        @-
      `;

      expect(() => new PathMap(invalidMap)).toThrow(
        ValidationError.MISSING_END_CHARACTER
      );
    });

    it("should throw an error if there are multiple start characters", () => {
      const invalidMap = `
        @-x-@
      `;

      expect(() => new PathMap(invalidMap)).toThrow(
        ValidationError.MULTIPLE_START_CHARACTERS
      );
    });

    it("should throw an error if there are multiple paths starting from the start node", () => {
      const invalidMap = `
        x-@-x
      `;

      expect(() => new PathMap(invalidMap)).toThrow(
        PathError.MULTIPLE_STARTING_PATHS
      );
    });

    it("should throw an error for invalid characters in the map", () => {
      const invalidMap = `
        @-a-x
      `;

      expect(() => new PathMap(invalidMap)).toThrow(
        ValidationError.INVALID_CHARACTER
      );
    });
  });

  describe("Simple Node Connections", () => {
    it("should correctly connect nodes for a simple map", () => {
      const validMap = `
        @A+
          x
      `;

      const pathMap = new PathMap(validMap);
      const startNode = pathMap.getStartNode();

      const nodeA = startNode.directions[Direction.RIGHT];
      expect(nodeA).not.toBeNull();
      expect(nodeA?.char).toBe("A");

      const turnNode = nodeA?.directions[Direction.RIGHT];
      expect(turnNode).not.toBeNull();
      expect(turnNode?.char).toBe("+");

      const endNode = turnNode?.directions[Direction.DOWN];
      expect(endNode).not.toBeNull();
      expect(endNode?.char).toBe("x");
    });

    it("should create separate nodes for each '-' character in the map", () => {
      const validMap = `
        @-A-x
      `;

      const pathMap = new PathMap(validMap);
      const startNode = pathMap.getStartNode();

      const firstDash = startNode.directions[Direction.RIGHT];
      expect(firstDash).not.toBeNull();
      expect(firstDash?.char).toBe("-");

      const nodeA = firstDash?.directions[Direction.RIGHT];
      expect(nodeA).not.toBeNull();
      expect(nodeA?.char).toBe("A");

      const secondDash = nodeA?.directions[Direction.RIGHT];
      expect(secondDash).not.toBeNull();
      expect(secondDash?.char).toBe("-");

      const endNode = secondDash?.directions[Direction.RIGHT];
      expect(endNode).not.toBeNull();
      expect(endNode?.char).toBe("x");
    });
  });

  describe("Various Map Structures", () => {
    it("should correctly connect nodes for '@ -> + -> x' structure", () => {
      const validMap = `
        @
        +x
      `;
      const pathMap = new PathMap(validMap);
      const startNode = pathMap.getStartNode();

      const plusNode = startNode.directions[Direction.DOWN];
      expect(plusNode).not.toBeNull();
      expect(plusNode?.char).toBe("+");

      const endNode = plusNode?.directions[Direction.RIGHT];
      expect(endNode).not.toBeNull();
      expect(endNode?.char).toBe("x");
    });

    it("should correctly connect nodes for 'x -> + -> @' structure", () => {
      const validMap = `
        x
        +@
      `;
      const pathMap = new PathMap(validMap);
      const startNode = pathMap.getStartNode();

      const plusNode = startNode.directions[Direction.LEFT];
      expect(plusNode).not.toBeNull();
      expect(plusNode?.char).toBe("+");

      const endNode = plusNode?.directions[Direction.UP];
      expect(endNode).not.toBeNull();
      expect(endNode?.char).toBe("x");
    });

    it("should correctly connect nodes for '@ -> A -> x' structure", () => {
      const validMap = `
        @Ax
      `;
      const pathMap = new PathMap(validMap);
      const startNode = pathMap.getStartNode();

      const nodeA = startNode.directions[Direction.RIGHT];
      expect(nodeA).not.toBeNull();
      expect(nodeA?.char).toBe("A");

      const endNode = nodeA?.directions[Direction.RIGHT];
      expect(endNode).not.toBeNull();
      expect(endNode?.char).toBe("x");
    });

    it("should correctly connect nodes for 'x -> A -> @' structure", () => {
      const validMap = `
        xA@
      `;
      const pathMap = new PathMap(validMap);
      const startNode = pathMap.getStartNode();

      const nodeA = startNode.directions[Direction.LEFT];
      expect(nodeA).not.toBeNull();
      expect(nodeA?.char).toBe("A");

      const endNode = nodeA?.directions[Direction.LEFT];
      expect(endNode).not.toBeNull();
      expect(endNode?.char).toBe("x");
    });
  });

  describe("Bridge and Intersection Connections", () => {
    it("should correctly connect nodes at an intersection", () => {
      const validMap = `
        @|x
      `;
      const pathMap = new PathMap(validMap);
      const startNode = pathMap.getStartNode();

      const endNode = startNode?.directions[Direction.RIGHT];
      expect(endNode).not.toBeNull();
      expect(endNode?.char).toBe("x");
    });

    it("should correctly connect nodes for '@|x' structure (vertical - alternative)", () => {
      const validMap = `
        @
        -
        x
      `;
      const pathMap = new PathMap(validMap);
      const startNode = pathMap.getStartNode();

      const endNode = startNode?.directions[Direction.DOWN];
      expect(endNode).not.toBeNull();
      expect(endNode?.char).toBe("x");
    });
  });
});
