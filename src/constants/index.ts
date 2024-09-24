export const CHARS = {
  START: "@",
  END: "x",
  EMPTY: " ",
  VERTICAL: "|",
  HORIZONTAL: "-",
  INTERSECTION: "+",
} as const;

export const allowedChars = Object.values(CHARS);

export const ALLOWED_LETTERS_REGEX = /[A-Z]/;
