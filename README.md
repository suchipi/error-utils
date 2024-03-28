# `@suchipi/error-utils`

Node.js utils for parsing error stacks, applying source maps to error stacks, etc

- `ParsedError` class
  - can be constructed from an Error instance
  - stack lines are parsed into a data structure with filename/line/column info
  - can be manipulated and then converted back into a normal Error
  - has a `stack` property getter which makes a V8-style stack string from the parsed stack frames
- `applySourceMapsToParsedError` function
  - updates the line/column numbers on the stack frames of a ParsedError by using source maps
  - returns a new ParsedError
- `isError` function
  - type predicate function
  - returns true for objects with shape `{ name: string, message: string }` when `name` ends with "Error"
