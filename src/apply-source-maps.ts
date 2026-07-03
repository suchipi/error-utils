import { SourceMapConsumer } from "source-map";
import { ParsedError } from "./parsed-error";
import StackFrame from "stackframe";
import type { SourceMap } from "./source-map";

function getSourceMapForFilename(
  sourceMaps: { [filename: string]: SourceMap.Loose },
  filename: string,
): SourceMap.Loose | null {
  return (
    sourceMaps[filename] ??
    sourceMaps["file://" + filename] ??
    sourceMaps[filename.replace(/^file:\/\//, "")] ??
    null
  );
}

/** Returns a new ParsedError. */
export function applySourceMapsToParsedError(
  sourceMaps: { [filename: string]: SourceMap.Loose },
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
  sourceMaps: { [filename: string]: SourceMap.Loose },
  stackFrame: StackFrame,
): StackFrame {
  const newFrame = new StackFrame(stackFrame);

  if (newFrame.fileName && newFrame.lineNumber) {
    const map = getSourceMapForFilename(sourceMaps, newFrame.fileName);
    if (map != null) {
      const consumer = new SourceMapConsumer(
        map as SourceMap.MozillaSourceMapLibraryCompatible,
      );

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
