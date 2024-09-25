import { PathError, ValidationError } from "../constants/errors.enum";

export const validMaps = [
  {
    description: "A basic example",
    map: `
@---A---+
        |
x-B-+   C
    |   |
    +---+
`,
    expectedLetters: "ACB",
    expectedPath: "@---A---+|C|+---+|+-B-x",
  },
  {
    description: "Go straight through intersections",
    map: `
@
| +-C--+
A |    |
+---B--+
  |      x
  |      |
  +---D--+
`,
    expectedLetters: "ABCD",
    expectedPath: "@|A+---B--+|+--C-+|-||+---D--+|x",
  },
  {
    description: "Letters may be found on turns",
    map: `
  @---A---+
          |
  x-B-+   |
      |   |
      +---C
`,
    expectedLetters: "ACB",
    expectedPath: "@---A---+|||C---+|+-B-x",
  },
  {
    description: "Do not collect a letter from the same location twice",
    map: `
    +-O-N-+
    |     |
    |   +-I-+
@-G-O-+ | | |
    | | +-+ E
    +-+     S
            |
            x
`,
    expectedLetters: "GOONIES",
    expectedPath: "@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x",
  },
  {
    description: "Keep direction, even in a compact space",
    map: `
 +-L-+
 |  +A-+
@B+ ++ H
 ++    x
`,
    expectedLetters: "BLAH",
    expectedPath: "@B+++B|+-L-+A+++A-+Hx",
  },
  {
    description: "Ignore stuff after end of path",
    map: `
@-A--+
     |
     +-B--x-C--D
`,
    expectedLetters: "AB",
    expectedPath: "@-A--+|+-B--x",
  },
];

export const invalidMaps = [
  {
    description: "Missing start character",
    map: `
   -A---+
        |
x-B-+   C
    |   |
    +---+
`,
    expectedError: ValidationError.MISSING_START_CHARACTER,
  },
  {
    description: "Missing end character",
    map: ` 
 @--A---+
        |
  B-+   C
    |   |
    +---+`,
    expectedError: ValidationError.MISSING_END_CHARACTER,
  },
  {
    description: "Multiple starts: example 1",
    map: `
   @--A-@-+
          |
  x-B-+   C
      |   |
      +---+
`,
    expectedError: ValidationError.MULTIPLE_START_CHARACTERS,
  },
  {
    description: "Multiple starts: example 2",
    map: `
   @--A---+
          |
          C
          x
      @-B-+
`,
    expectedError: ValidationError.MULTIPLE_START_CHARACTERS,
  },
  {
    description: "Multiple starts: example 3",
    map: `
   @--A--x

  x-B-+
      |
      @
`,
    expectedError: ValidationError.MULTIPLE_START_CHARACTERS,
  },
  {
    description: "Fork in path",
    map: `
     x-B
       |
@--A---+
       |
  x+   C
   |   |
   +---+
`,
    expectedError: PathError.FORK_IN_PATH,
  },
  {
    description: "Broken path",
    map: `
       @--A-+
            |

            B-x
    `,

    expectedError: PathError.BROKEN_PATH,
  },
  {
    description: "Multiple starting paths",
    map: `
  x-B-@-A-x
`,
    expectedError: PathError.MULTIPLE_STARTING_PATHS,
  },
  {
    description: "Fake turn",
    map: `
  @-A-+-B-x
`,
    expectedError: PathError.FAKE_TURN,
  },
];
