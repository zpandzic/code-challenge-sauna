import { readFileSync, existsSync } from "fs";
import * as path from "path";

export const readFile = (filePath: string): string => {
  const absolutePath = path.resolve(filePath);

  if (!existsSync(absolutePath)) {
    throw new Error(`File not found: ${absolutePath}`);
  }

  const fileContent = readFileSync(absolutePath, "utf-8");
  return fileContent;
};
