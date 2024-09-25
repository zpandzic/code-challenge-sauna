import { PathFinder } from "./core/PathFinder";
import { readFile } from "./utils/file-reader";

const map = readFile("src/assets/maps/valid/basic_example.txt");

const pathFinder = new PathFinder(map);
pathFinder.traverse();

console.log("Collected letters:", pathFinder.getCollectedLetters());
console.log("Path:", pathFinder.getPath());
