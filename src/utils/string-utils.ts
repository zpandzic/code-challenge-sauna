import { ALLOWED_LETTERS_REGEX, allowedChars } from "../constants";

export function isValidCharacter(char: string): boolean {
  return isAllowedCharacter(char) || isAllowedLetter(char);
}

function isAllowedCharacter(char: string): boolean {
  return allowedChars.includes(char as any);
}

export function isAllowedLetter(char: string): boolean {
  return ALLOWED_LETTERS_REGEX.test(char);
}
