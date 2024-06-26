import { test, expect } from "vitest";

test("exports", () => {
  const mod = require("../dist/index");
  expect(mod).toMatchInlineSnapshot(`
    {
      "ParsedError": [Function],
      "applySourceMapsToParsedError": [Function],
      "applySourceMapsToStackFrame": [Function],
      "getStackFrame": [Function],
      "isError": [Function],
    }
  `);
});
