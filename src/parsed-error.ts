import ErrorStackParser from "error-stack-parser";
import StackFrame from "stackframe";

export class ParsedError {
  name: string;
  message: string;
  stackFrames: Array<StackFrame>;

  constructor(init: {
    name: string;
    message: string;
    stackFrames?: Array<StackFrame> | undefined;
    stack?: string | undefined;
  }) {
    this.name = init.name;
    this.message = init.message;

    if (Array.isArray(init.stackFrames)) {
      this.stackFrames = init.stackFrames;
    } else if (typeof init.stack === "string") {
      this.stackFrames = ErrorStackParser.parse(init as any);
    } else {
      this.stackFrames = [];
    }
  }

  static clone(other: ParsedError) {
    return new ParsedError({
      name: other.name,
      message: other.message,
      stackFrames: other.stackFrames.map((frame) => new StackFrame(frame)),
    });
  }

  /**
   * A V8-style `error.stack` string derived from the Array `this.stackFrames`.
   */
  get stack() {
    const { name, message, stackFrames } = this;

    const newFrameLines: Array<string> = [];

    for (const frame of stackFrames) {
      let output = "    at ";

      if (frame.isConstructor) {
        output += "new ";
      }

      let fileNameShouldBeWrappedInParens = false;
      if (frame.functionName) {
        output += frame.functionName;
        output += " ";

        fileNameShouldBeWrappedInParens = true;
      }

      if (frame.fileName) {
        if (fileNameShouldBeWrappedInParens) {
          output += "(";
        }

        output += frame.fileName;

        if (frame.lineNumber) {
          output += ":";
          output += frame.lineNumber;

          if (frame.columnNumber) {
            output += ":";
            output += frame.columnNumber;
          }
        }

        if (fileNameShouldBeWrappedInParens) {
          output += ")";
        }
      }

      newFrameLines.push(output);
    }

    return `${name}: ${message}\n${newFrameLines.join("\n")}`;
  }

  /**
   * Create an Error (with V8-style `stack` string) from the provided
   * `ParsedError`.
   */
  toError<ErrorType = Error>(
    // @ts-ignore could be instantiated with different subtype
    ErrorConstructor: { new (message: string): ErrorType } = Error,
  ): ErrorType {
    const err = new ErrorConstructor(this.message);
    Object.defineProperties(err, {
      name: {
        value: this.name,
        writable: true,
        enumerable: false,
        configurable: true,
      },
      message: {
        value: this.message,
        writable: true,
        enumerable: false,
        configurable: true,
      },
      stack: {
        value: this.stack,
        writable: true,
        enumerable: false,
        configurable: true,
      },
    });
    return err;
  }
}
