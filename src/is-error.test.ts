import { test, expect } from "vitest";
import { isError } from "./is-error";
import { ParsedError } from "./parsed-error";

test("isError", () => {
  expect(isError(null)).toBe(false);
  expect(isError("dsjfkds")).toBe(false);

  expect(isError(new Error("hi"))).toBe(true);

  expect(
    isError({
      name: "SomethingError",
      message: "dsjfksdjkfldsf",
      stack: "dkfldsjfldsjlk",
    }),
  ).toBe(true);

  expect(
    isError({
      name: "Something",
      message: "dsjfksdjkfldsf",
      stack: "dkfldsjfldsjlk",
    }),
  ).toBe(false);

  // kind of an interesting quirk
  expect(isError(new ParsedError(new Error("hello")))).toBe(true);
});
