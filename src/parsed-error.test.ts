import { test, expect } from "vitest";
import { ParsedError } from "./parsed-error";

test("constructor - Error argument", () => {
  const error = new Error("hi");
  const parsedError = new ParsedError(error);

  expect(parsedError.message).toBe(parsedError.message);
  expect(parsedError.name).toBe(parsedError.name);
  expect(parsedError.stackFrames).toMatchInlineSnapshot(`
    [
      {
        "columnNumber": 17,
        "fileName": "/Users/suchipi/Code/error-utils/src/parsed-error.test.ts",
        "lineNumber": 5,
        "source": "    at /Users/suchipi/Code/error-utils/src/parsed-error.test.ts:5:17",
      },
      {
        "columnNumber": 14,
        "fileName": "file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/index.js",
        "lineNumber": 135,
        "source": "    at file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/index.js:135:14",
      },
      {
        "columnNumber": 26,
        "fileName": "file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/index.js",
        "lineNumber": 60,
        "source": "    at file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/index.js:60:26",
      },
      {
        "columnNumber": 17,
        "fileName": "file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/index.js",
        "functionName": "runTest",
        "lineNumber": 767,
        "source": "    at runTest (file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/index.js:767:17)",
      },
      {
        "columnNumber": 15,
        "fileName": "file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/index.js",
        "functionName": "runSuite",
        "lineNumber": 895,
        "source": "    at runSuite (file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/index.js:895:15)",
      },
      {
        "columnNumber": 5,
        "fileName": "file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/index.js",
        "functionName": "runFiles",
        "lineNumber": 944,
        "source": "    at runFiles (file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/index.js:944:5)",
      },
      {
        "columnNumber": 3,
        "fileName": "file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/index.js",
        "functionName": "startTests",
        "lineNumber": 953,
        "source": "    at startTests (file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/index.js:953:3)",
      },
      {
        "columnNumber": 7,
        "fileName": "file:///Users/suchipi/Code/error-utils/node_modules/vitest/dist/chunks/runtime-runBaseTests.SKlFOhuq.js",
        "lineNumber": 114,
        "source": "    at file:///Users/suchipi/Code/error-utils/node_modules/vitest/dist/chunks/runtime-runBaseTests.SKlFOhuq.js:114:7",
      },
      {
        "columnNumber": 5,
        "fileName": "file:///Users/suchipi/Code/error-utils/node_modules/vitest/dist/chunks/runtime-runBaseTests.SKlFOhuq.js",
        "functionName": "withEnv",
        "lineNumber": 82,
        "source": "    at withEnv (file:///Users/suchipi/Code/error-utils/node_modules/vitest/dist/chunks/runtime-runBaseTests.SKlFOhuq.js:82:5)",
      },
      {
        "columnNumber": 3,
        "fileName": "file:///Users/suchipi/Code/error-utils/node_modules/vitest/dist/chunks/runtime-runBaseTests.SKlFOhuq.js",
        "functionName": "run",
        "lineNumber": 103,
        "source": "    at run (file:///Users/suchipi/Code/error-utils/node_modules/vitest/dist/chunks/runtime-runBaseTests.SKlFOhuq.js:103:3)",
      },
    ]
  `);
});

test("constructor - ParsedError argument", () => {
  const error = new Error("hi");
  const parsedError = new ParsedError(error);
  const parsedError2 = new ParsedError(parsedError);

  expect(parsedError2.message).toBe(parsedError.message);
  expect(parsedError2.name).toBe(parsedError.name);
  expect(parsedError2.stackFrames).toBe(parsedError.stackFrames);
});

test("clone", () => {
  const error = new Error("hi");
  const parsedError = new ParsedError(error);
  const parsedError2 = ParsedError.clone(parsedError);

  expect(parsedError2.message).toBe(parsedError.message);
  expect(parsedError2.name).toBe(parsedError.name);

  expect(parsedError2.stackFrames).toEqual(parsedError.stackFrames);
  expect(parsedError2.stackFrames).not.toBe(parsedError.stackFrames);

  expect(parsedError2.stackFrames[0]).toEqual(parsedError.stackFrames[0]);
  expect(parsedError2.stackFrames[0]).not.toBe(parsedError.stackFrames[0]);
});

test("stack", () => {
  const error = new Error("hi");
  const parsedError = new ParsedError(error);

  expect(parsedError.stack).toMatchInlineSnapshot(`
    "Error: hi
        at /Users/suchipi/Code/error-utils/src/parsed-error.test.ts:108:17
        at file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/index.js:135:14
        at file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/index.js:60:26
        at runTest (file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/index.js:767:17)
        at runSuite (file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/index.js:895:15)
        at runFiles (file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/index.js:944:5)
        at startTests (file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/index.js:953:3)
        at file:///Users/suchipi/Code/error-utils/node_modules/vitest/dist/chunks/runtime-runBaseTests.SKlFOhuq.js:114:7
        at withEnv (file:///Users/suchipi/Code/error-utils/node_modules/vitest/dist/chunks/runtime-runBaseTests.SKlFOhuq.js:82:5)
        at run (file:///Users/suchipi/Code/error-utils/node_modules/vitest/dist/chunks/runtime-runBaseTests.SKlFOhuq.js:103:3)"
  `);
});

test("toError (no constructor argument)", () => {
  const error = new Error("hi");
  const parsedError = new ParsedError(error);
  const newError = parsedError.toError();

  expect(newError).toBeInstanceOf(Error);

  expect(newError.name).toBe(error.name);
  expect(newError.message).toBe(error.message);
  expect(newError.stack).toBe(error.stack);
});

test("toError (with constructor argument)", () => {
  const error = new Error("hi");
  const parsedError = new ParsedError(error);

  const newError = parsedError.toError(TypeError);

  expect(newError).toBeInstanceOf(TypeError);

  expect(newError.name).toBe(error.name);
  expect(newError.message).toBe(error.message);
  expect(newError.stack).toBe(error.stack);
});
