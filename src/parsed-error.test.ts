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
        "columnNumber": 11,
        "fileName": "file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/chunk-artifact.js",
        "lineNumber": 302,
        "source": "    at file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/chunk-artifact.js:302:11",
      },
      {
        "columnNumber": 26,
        "fileName": "file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/chunk-artifact.js",
        "lineNumber": 1903,
        "source": "    at file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/chunk-artifact.js:1903:26",
      },
      {
        "columnNumber": 20,
        "fileName": "file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/chunk-artifact.js",
        "lineNumber": 2326,
        "source": "    at file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/chunk-artifact.js:2326:20",
      },
      {
        "columnNumber": 10,
        "fileName": "file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/chunk-artifact.js",
        "functionName": "runWithCancel",
        "lineNumber": 2323,
        "source": "    at runWithCancel (file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/chunk-artifact.js:2323:10)",
      },
      {
        "columnNumber": 20,
        "fileName": "file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/chunk-artifact.js",
        "lineNumber": 2305,
        "source": "    at file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/chunk-artifact.js:2305:20",
      },
      {
        "columnNumber": 10,
        "fileName": "file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/chunk-artifact.js",
        "functionName": "runWithTimeout",
        "lineNumber": 2272,
        "source": "    at runWithTimeout (file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/chunk-artifact.js:2272:10)",
      },
      {
        "columnNumber": 64,
        "fileName": "file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/chunk-artifact.js",
        "lineNumber": 2955,
        "source": "    at file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/chunk-artifact.js:2955:64",
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
        at /Users/suchipi/Code/error-utils/src/parsed-error.test.ts:92:17
        at file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/chunk-artifact.js:302:11
        at file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/chunk-artifact.js:1903:26
        at file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/chunk-artifact.js:2326:20
        at runWithCancel (file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/chunk-artifact.js:2323:10)
        at file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/chunk-artifact.js:2305:20
        at runWithTimeout (file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/chunk-artifact.js:2272:10)
        at file:///Users/suchipi/Code/error-utils/node_modules/@vitest/runner/dist/chunk-artifact.js:2955:64"
  `);
});

test("toError (no constructor argument)", () => {
  const error = new Error("hi");
  const parsedError = new ParsedError(error);
  const newError = parsedError.toError();

  expect(newError).toBeInstanceOf(Error);

  expect(newError.name).toBe(error.name);
  expect(newError.message).toBe(error.message);
  expect(newError.stack).toBe(
    // It strips these out, but that's fine
    error.stack?.replaceAll(/\n\s+at new Promise \(<anonymous>\)/g, ""),
  );
});

test("toError (with constructor argument)", () => {
  const error = new Error("hi");
  const parsedError = new ParsedError(error);

  const newError = parsedError.toError(TypeError);

  expect(newError).toBeInstanceOf(TypeError);

  expect(newError.name).toBe(error.name);
  expect(newError.message).toBe(error.message);
  expect(newError.stack).toBe(
    // It strips these out, but that's fine
    error.stack?.replaceAll(/\n\s+at new Promise \(<anonymous>\)/g, ""),
  );
});
