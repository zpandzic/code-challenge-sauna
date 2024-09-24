import { CHARS } from "../constants";
import Direction, { ALL_DIRECTIONS } from "../constants/direction.enum";
import {
  getOppositeDirection,
  getValidDirectionsForChar,
  isMoveAllowed,
} from "../utils/direction-utils";

describe("Direction utility functions", () => {
  describe("Direction utility functions", () => {
    describe("getOppositeDirection", () => {
      it("should return the correct opposite directions for all cases", () => {
        const testCases = [
          { direction: Direction.UP, expected: Direction.DOWN },
          { direction: Direction.DOWN, expected: Direction.UP },
          { direction: Direction.LEFT, expected: Direction.RIGHT },
          { direction: Direction.RIGHT, expected: Direction.LEFT },
        ];

        testCases.forEach(({ direction, expected }) => {
          expect(getOppositeDirection(direction)).toBe(expected);
        });
      });
    });

    describe("getValidDirectionsForChar", () => {
      it("should return the correct valid directions based on the character", () => {
        const testCases = [
          {
            char: CHARS.HORIZONTAL,
            expected: [Direction.LEFT, Direction.RIGHT],
          },
          { char: CHARS.VERTICAL, expected: [Direction.UP, Direction.DOWN] },
          {
            char: "A",
            expected: ALL_DIRECTIONS,
          },
          {
            char: CHARS.INTERSECTION,
            expected: ALL_DIRECTIONS,
          },
          {
            char: CHARS.START,
            expected: ALL_DIRECTIONS,
          },
        ];

        testCases.forEach(({ char, expected }) => {
          expect(getValidDirectionsForChar(char).sort()).toEqual(
            expected.sort()
          );
        });
      });
    });
  });

  describe("canMoveTo with various characters", () => {
    it("should handle movement between standard map characters", () => {
      const testCases = [
        {
          char: CHARS.HORIZONTAL,
          nextChar: CHARS.VERTICAL,
          direction: Direction.LEFT,
          expected: false,
        },
        {
          char: CHARS.HORIZONTAL,
          nextChar: CHARS.HORIZONTAL,
          direction: Direction.RIGHT,
          expected: true,
        },
        {
          char: CHARS.VERTICAL,
          nextChar: CHARS.VERTICAL,
          direction: Direction.UP,
          expected: true,
        },
        {
          char: CHARS.VERTICAL,
          nextChar: CHARS.HORIZONTAL,
          direction: Direction.DOWN,
          expected: false,
        },
        {
          char: CHARS.START,
          nextChar: CHARS.HORIZONTAL,
          direction: Direction.RIGHT,
          expected: true,
        },
        {
          char: CHARS.END,
          nextChar: CHARS.HORIZONTAL,
          direction: Direction.LEFT,
          expected: true,
        },
        {
          char: CHARS.INTERSECTION,
          nextChar: CHARS.VERTICAL,
          direction: Direction.UP,
          expected: true,
        },
      ];

      testCases.forEach(({ char, nextChar, direction, expected }) => {
        expect(isMoveAllowed(char, nextChar, direction)).toBe(expected);
      });
    });

    it("should allow movement between letters and valid map characters", () => {
      const testCases = [
        {
          char: "A",
          nextChar: CHARS.VERTICAL,
          direction: Direction.UP,
          expected: true,
        },
        {
          char: "B",
          nextChar: CHARS.HORIZONTAL,
          direction: Direction.LEFT,
          expected: true,
        },
        {
          char: "C",
          nextChar: CHARS.VERTICAL,
          direction: Direction.DOWN,
          expected: true,
        },
        {
          char: "D",
          nextChar: CHARS.HORIZONTAL,
          direction: Direction.RIGHT,
          expected: true,
        },
      ];

      testCases.forEach(({ char, nextChar, direction, expected }) => {
        expect(isMoveAllowed(char, nextChar, direction)).toBe(expected);
      });
    });

    it("should disallow movement for invalid directions", () => {
      const testCases = [
        {
          char: CHARS.HORIZONTAL,
          nextChar: CHARS.START,
          direction: Direction.UP,
          expected: false,
        },
        {
          char: CHARS.VERTICAL,
          nextChar: CHARS.END,
          direction: Direction.LEFT,
          expected: false,
        },
      ];

      testCases.forEach(({ char, nextChar, direction, expected }) => {
        expect(isMoveAllowed(char, nextChar, direction)).toBe(expected);
      });
    });
  });
});
