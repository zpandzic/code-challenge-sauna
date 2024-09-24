import { PathFinder } from "../core/PathFinder";
import { invalidMaps, validMaps } from "./../assets/saunsa.maps";

describe("Valid Maps", () => {
  validMaps.forEach((testCase) => {
    test(testCase.description, () => {
      const { map, expectedLetters, expectedPath } = testCase;

      const pathFinder = new PathFinder(map);
      pathFinder.traverse();

      expect(pathFinder.getCollectedLetters()).toBe(expectedLetters);
      expect(pathFinder.getPath()).toBe(expectedPath);
    });
  });
});

describe("Invalid Maps", () => {
  invalidMaps.forEach((testCase) => {
    test(testCase.description, () => {
      const { map, expectedError } = testCase;

      expect(() => {
        const pathFinder = new PathFinder(map);
        pathFinder.traverse();
      }).toThrow(expectedError);
    });
  });
});
