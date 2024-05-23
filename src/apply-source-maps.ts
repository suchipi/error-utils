import { SourceMapConsumer } from "source-map";
import { ParsedError } from "./parsed-error";
import StackFrame from "stackframe";

export type SourceMap = {
  /**
   * Which version of the source map spec this map is following.
   */
  version: string;

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

function getSourceMapForFilename(
  sourceMaps: { [filename: string]: SourceMap },
  filename: string,
): SourceMap | null {
  return (
    sourceMaps[filename] ??
    sourceMaps["file://" + filename] ??
    sourceMaps[filename.replace(/^file:\/\//, "")] ??
    null
  );
}

/** Returns a new ParsedError. */
export function applySourceMapsToParsedError(
  sourceMaps: { [filename: string]: SourceMap },
  parsedError: ParsedError,
): ParsedError {
  const output = ParsedError.clone(parsedError);

  for (const frame of output.stackFrames) {
    const mappedFrame = applySourceMapsToStackFrame(sourceMaps, frame);

    frame.lineNumber = mappedFrame.lineNumber;
    frame.columnNumber = mappedFrame.columnNumber;
  }

  return output;
}

/** Returns a new StackFrame. */
export function applySourceMapsToStackFrame(
  sourceMaps: { [filename: string]: SourceMap },
  stackFrame: StackFrame,
): StackFrame {
  const newFrame = new StackFrame(stackFrame);

  if (newFrame.fileName && newFrame.lineNumber) {
    const map = getSourceMapForFilename(sourceMaps, newFrame.fileName);
    if (map != null) {
      const consumer = new SourceMapConsumer(map as any);

      const pos = consumer.originalPositionFor({
        line: newFrame.lineNumber || 1,
        column: newFrame.columnNumber || 0,
      });

      newFrame.lineNumber = pos.line;
      newFrame.columnNumber = pos.column + 1;
    }
  }

  return newFrame;
}
