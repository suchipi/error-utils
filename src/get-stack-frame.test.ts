import { test, expect } from "vitest";
import { getStackFrame } from "./get-stack-frame";

test("getStackFrame", () => {
  function a(offset: number) {
    return b(offset);
  }

  function b(offset: number) {
    return c(offset);
  }

  function c(offset: number) {
    return getStackFrame(offset);
  }

  expect(a(0)).toMatchInlineSnapshot(`
    {
      "columnNumber": 12,
      "fileName": "/Users/suchipi/Code/error-utils/src/get-stack-frame.test.ts",
      "functionName": "c",
      "lineNumber": 14,
      "source": "    at c (/Users/suchipi/Code/error-utils/src/get-stack-frame.test.ts:14:12)",
    }
  `);
  expect(a(1)).toMatchInlineSnapshot(`
    {
      "columnNumber": 12,
      "fileName": "/Users/suchipi/Code/error-utils/src/get-stack-frame.test.ts",
      "functionName": "b",
      "lineNumber": 10,
      "source": "    at b (/Users/suchipi/Code/error-utils/src/get-stack-frame.test.ts:10:12)",
    }
  `);
  expect(a(2)).toMatchInlineSnapshot(`
    {
      "columnNumber": 12,
      "fileName": "/Users/suchipi/Code/error-utils/src/get-stack-frame.test.ts",
      "functionName": "a",
      "lineNumber": 6,
      "source": "    at a (/Users/suchipi/Code/error-utils/src/get-stack-frame.test.ts:6:12)",
    }
  `);

  expect(a(-1)).toMatchInlineSnapshot(`
    {
      "columnNumber": 16,
      "fileName": "/Users/suchipi/Code/error-utils/src/get-stack-frame.ts",
      "functionName": "Module.getStackFrame",
      "lineNumber": 5,
      "source": "    at Module.getStackFrame (/Users/suchipi/Code/error-utils/src/get-stack-frame.ts:5:16)",
    }
  `);
});
