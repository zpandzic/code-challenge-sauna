import { CHARS } from "../constants";
import Direction from "../constants/direction.enum";
import { isAllowedLetter } from "../utils/string-utils";
import { DirectionFinder } from "./DirectionFinder";
import { PathMap } from "./PathMap";
import { PathNode } from "./PathNode";

export class PathFinder {
  private asciMap: PathMap;
  private collectedLetters: string[] = [];
  private path: string[] = [];
  private previousDirection: Direction | null = null;

  constructor(mapInput: string) {
    this.asciMap = new PathMap(mapInput);
  }

  public traverse(): void {
    this.previousDirection = null;
    this.collectedLetters = [];
    this.path = [];

    this.searchPath(this.asciMap.getStartNode());
  }

  public getCollectedLetters(): string {
    return this.collectedLetters.join("");
  }

  public getPath(): string {
    return this.path.join("");
  }

  private searchPath(node: PathNode): void {
    this.recordNodeInPath(node);

    if (node.char === CHARS.END) return;

    const nextDirection = DirectionFinder.getValidDirection(
      node,
      this.previousDirection
    );

    this.previousDirection = nextDirection;
    this.searchPath(node.directions[nextDirection]!);
  }

  private recordNodeInPath(node: PathNode): void {
    this.path.push(node.char);

    if (node.skipped) {
      this.path.push(node.skipped.char);
    }

    if (isAllowedLetter(node.char) && !node.visited) {
      this.collectedLetters.push(node.char);
    }

    node.visited = true;
  }
}
