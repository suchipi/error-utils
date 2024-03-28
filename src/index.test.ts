import { test, expect } from "vitest";
import * as mod from "../dist/index";

test("exports", () => {
  expect(mod).toMatchInlineSnapshot(`
    {
      "ParsedError": [Function],
      "applySourceMapsToParsedError": [Function],
      "isError": [Function],
    }
  `);
});
