import { CHARS } from "../constants";
import Direction, { ALL_DIRECTIONS } from "../constants/direction.enum";
import { PathError, ValidationError } from "../constants/errors.enum";
import {
  DIRECTION_OFFSETS,
  getOppositeDirection,
} from "../utils/direction-utils";
import { isValidCharacter } from "../utils/string-utils";
import { PathNode } from "./PathNode";

export class PathMap {
  private rawMap: string[];
  private nodes: (PathNode | null)[][] = [];
  private startNode: PathNode | null = null;

  constructor(mapInput: string) {
    this.rawMap = mapInput.split("\n");
    this.validateMap();
    this.initializeNodes();
    this.validateNodes();
  }

  public getStartNode(): PathNode {
    return this.startNode!;
  }

  private initializeNodes(): void {
    this.rawMap.forEach((row, x) => {
      const nodeRow: (PathNode | null)[] = row.split("").map((char, y) => {
        this.validateCharacter(char);
        const node = this.createNode(char, x, y);
        if (char === CHARS.START) {
          this.startNode = node;
        }

        return node;
      });

      this.nodes.push(nodeRow);
    });

    this.connectNodes();
  }

  private createNode(char: string, x: number, y: number): PathNode | null {
    return char === CHARS.EMPTY ? null : new PathNode(char, x, y);
  }

  private connectNodes(): void {
    this.nodes.forEach((row) => {
      row.filter((x) => x !== null).forEach(this.processNodeConnections, this);
    });
  }

  private processNodeConnections(node: PathNode): void {
    ALL_DIRECTIONS.forEach((dir) => {
      const candidate = this.getNodeInDirection(node, dir);
      if (candidate && !this.connectInDirection(node, dir, candidate)) {
        this.tryConnectNextCandidate(node, dir, candidate);
      }
    });
  }

  private tryConnectNextCandidate(
    node: PathNode,
    dir: Direction,
    candidate: PathNode
  ): void {
    const nextCandidate = this.getNodeInDirection(node, dir, 1);
    if (nextCandidate && this.connectInDirection(node, dir, nextCandidate)) {
      node.skipped = candidate;
    }
  }

  private getNodeInDirection(
    node: PathNode,
    direction: Direction,
    nodeOffset = 0
  ): PathNode | null {
    const [dx, dy] = DIRECTION_OFFSETS[direction];
    const newX = node.postion.row + dx * (nodeOffset + 1);
    const newY = node.postion.column + dy * (nodeOffset + 1);

    return this.nodes?.[newX]?.[newY] || null;
  }

  private connectInDirection(
    node: PathNode,
    direction: Direction,
    candidate: PathNode
  ): boolean {
    if (node.directions[direction]) {
      return false;
    }

    if (node.canConnectTo(candidate.char, direction)) {
      node.directions[direction] = candidate;
      candidate.directions[getOppositeDirection(direction)] = node;
      return true;
    }

    return false;
  }

  private countOccurrences(char: string): number {
    return this.rawMap.reduce(
      (acc, row) => acc + row.split(char).length - 1,
      0
    );
  }

  private validateMap(): void {
    const startCharCounts = this.countOccurrences(CHARS.START);
    const endCharCount = this.countOccurrences(CHARS.END);

    if (startCharCounts === 0) {
      throw new Error(ValidationError.MISSING_START_CHARACTER);
    }

    if (startCharCounts > 1) {
      throw new Error(ValidationError.MULTIPLE_START_CHARACTERS);
    }

    if (endCharCount === 0) {
      throw new Error(ValidationError.MISSING_END_CHARACTER);
    }
  }

  private validateNodes(): void {
    if (!this.startNode) {
      throw new Error(ValidationError.MISSING_START_CHARACTER);
    }

    if (this.startNode.connectedNodesCount === 2) {
      throw new Error(PathError.MULTIPLE_STARTING_PATHS);
    }
  }

  private validateCharacter(char: string): void {
    if (!isValidCharacter(char))
      throw new Error(`${ValidationError.INVALID_CHARACTER}: '${char}'`);
  }
}
