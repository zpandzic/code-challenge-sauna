import { PathFinder } from "./core/PathFinder";

const map = `
    @-A--B-x
`;

const pathFinder = new PathFinder(map);
pathFinder.traverse();

console.log("Collected letters:", pathFinder.getCollectedLetters());
console.log("Path:", pathFinder.getPath());
