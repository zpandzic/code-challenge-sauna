import Direction from "../constants/direction.enum";
import { isMoveAllowed } from "../utils/direction-utils";

export class PathNode {
  public directions: Partial<{ [key in Direction]: PathNode }> = {};
  public skipped: PathNode | null = null;
  public visited: boolean = false;
  public char: string;
  public postion: {
    row: number;
    column: number;
  };

  constructor(char: string, row: number, column: number) {
    this.char = char;
    this.postion = { row, column };
  }

  public isDirectionConnected(direction: Direction): boolean {
    return !!this.directions[direction];
  }

  public canConnectTo(candidatesChar: string, direction: Direction) {
    return isMoveAllowed(this.char, candidatesChar, direction);
  }

  public get connectedNodesCount() {
    return Object.values(this.directions).filter((node) => node).length;
  }
}
