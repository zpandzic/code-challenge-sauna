import Direction from "../constants/direction.enum";
import { PathNode } from "../core/PathNode";

describe("PathNode - Initialization Tests", () => {
  it("should correctly initialize with given character and position", () => {
    const node = new PathNode("@", 0, 0);

    expect(node.char).toBe("@");
    expect(node.postion).toEqual({ row: 0, column: 0 });
    expect(node.directions).toEqual({});
    expect(node.visited).toBe(false);
    expect(node.skipped).toBeNull();
  });
});

describe("PathNode - Connection Tests", () => {
  it("should correctly allow connection in a valid direction", () => {
    const nodeA = new PathNode("-", 0, 0);
    const nodeB = new PathNode("-", 0, 1);

    expect(nodeA.canConnectTo(nodeB.char, Direction.RIGHT)).toBe(true);
  });

  it("should not allow connection in an invalid direction", () => {
    const nodeA = new PathNode("-", 0, 0);
    const nodeB = new PathNode("|", 0, 1);

    expect(nodeA.canConnectTo(nodeB.char, Direction.RIGHT)).toBe(false);
  });

  it("should connect nodes if move is allowed", () => {
    const node1 = new PathNode("@", 0, 0);
    const node2 = new PathNode("-", 0, 1);

    expect(node1.canConnectTo("-", Direction.RIGHT)).toBe(true);
    expect(node2.canConnectTo("@", Direction.LEFT)).toBe(true);
  });

  it("should not connect nodes if move is not allowed", () => {
    const node1 = new PathNode("@", 0, 0);
    const node2 = new PathNode("|", 0, 1);

    expect(node1.canConnectTo("|", Direction.RIGHT)).toBe(false);
    expect(node2.canConnectTo("@", Direction.LEFT)).toBe(false);
  });
});

describe("PathNode - Direction Connection Tests", () => {
  it("should verify if a direction is connected", () => {
    const node = new PathNode("@", 0, 0);
    const rightNode = new PathNode("-", 0, 1);

    node.directions[Direction.RIGHT] = rightNode;

    expect(node.isDirectionConnected(Direction.RIGHT)).toBe(true);
    expect(node.isDirectionConnected(Direction.LEFT)).toBe(false);
  });

  it("should correctly count the connected nodes", () => {
    const node = new PathNode("@", 0, 0);
    const rightNode = new PathNode("-", 0, 1);
    const downNode = new PathNode("|", 1, 0);

    node.directions[Direction.RIGHT] = rightNode;
    node.directions[Direction.DOWN] = downNode;

    expect(node.connectedNodesCount).toBe(2);
  });
});
