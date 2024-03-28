import { SourceMapConsumer } from "source-map";
import { ParsedError } from "./parsed-error";

export type SourceMap = {
  /**
   * Which version of the source map spec this map is following.
   */
  version: number;

  /**
   * An array of URLs to the original source files.
   */
  sources: Array<string>;

  /**
   * An array of identifiers which can be referenced by individual mappings.
   */
  names: Array<string>;

  /**
   * Optional. The URL root from which all sources are relative.
   */
  sourceRoot?: string;

  /**
   * Optional. An array of contents of the original source files.
   */
  sourcesContent?: Array<string>;

  /**
   * A string of base64 VLQs which contain the actual mappings.
   */
  mappings: string;

  /**
   * Optional. The generated filename this source map is associated with.
   */
  file?: string;
};

/** Returns a new ParsedError. */
export function applySourceMapsToParsedError(
  sourceMaps: { [filename: string]: SourceMap },
  parsedError: ParsedError,
): ParsedError {
  const output = ParsedError.clone(parsedError);

  for (const frame of output.stackFrames) {
    if (frame.fileName) {
      if (frame.lineNumber) {
        if (sourceMaps[frame.fileName] != null) {
          const map = sourceMaps[frame.fileName];

          const consumer = new SourceMapConsumer(map as any);

          const pos = consumer.originalPositionFor({
            line: frame.lineNumber || 1,
            column: frame.columnNumber || 0,
          });

          frame.lineNumber = pos.line;
          frame.columnNumber = pos.column + 1;
        }
      }
    }
  }

  return output;
}
