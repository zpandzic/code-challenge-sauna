export enum ValidationError {
  MISSING_START_CHARACTER = "Error: Missing start character",
  MISSING_END_CHARACTER = "Error: Missing end character",
  MULTIPLE_START_CHARACTERS = "Error: Multiple start characters",
  INVALID_CHARACTER = "Error: Invalid character",
}

export enum PathError {
  FORK_IN_PATH = "Error: Fork in path",
  BROKEN_PATH = "Error: Broken path",
  MULTIPLE_STARTING_PATHS = "Error: Multiple starting paths",
  FAKE_TURN = "Error: Fake turn",
}
