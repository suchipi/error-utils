import StackFrame from "stackframe";
import { ParsedError } from "./parsed-error";

export function getStackFrame(stackOffsetUpwards: number): StackFrame | null {
  const here = new Error("inside getStackFrame");
  const parsed = new ParsedError(here);
  const frames = parsed.stackFrames;

  // We add 1 here because the stack offset is from the perspective of the
  // person calling getStackFrame, but the Error was created within
  // getStackFrame.
  const targetedFrame = frames[stackOffsetUpwards + 1];
  return targetedFrame || null;
}
