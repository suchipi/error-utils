import { assertIsAssignableTo } from "typescript-assert-utils";
import * as MozillaSourceMap from "source-map";
import * as BabelCore from "@babel/core";
import * as SwcCore from "@swc/core";
import * as ErrorUtils from "./index";

type BabelInputSourceMap = Exclude<
  BabelCore.InputOptions["inputSourceMap"],
  undefined
>;

declare var errorUtilsSourceMap: ErrorUtils.SourceMap;
declare var errorUtilsSourceMapMozilla: ErrorUtils.SourceMap.MozillaSourceMapLibraryCompatible;
declare var errorUtilsSourceMapBabel: ErrorUtils.SourceMap.BabelCompatible;

assertIsAssignableTo<MozillaSourceMap.RawSourceMap>(errorUtilsSourceMap);
assertIsAssignableTo<MozillaSourceMap.RawSourceMap>(errorUtilsSourceMapMozilla);
assertIsAssignableTo<BabelInputSourceMap>(errorUtilsSourceMapBabel);

// Note: SWC input source map is a JSON string, not an object! This isn't a
// particularly useful type test, but is included here nonetheless for
// documentation purposes.

// @ts-expect-error
assertIsAssignableTo<SwcCore.Options["inputSourceMap"]>(errorUtilsSourceMap);
assertIsAssignableTo<SwcCore.Options["inputSourceMap"]>(
  JSON.stringify(errorUtilsSourceMap),
);
