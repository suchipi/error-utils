import { assert, IsAssignable } from "typescript-assert-utils";
import * as MozillaSourceMap from "source-map";
import * as ErrorUtils from "./index";

assert<IsAssignable<ErrorUtils.SourceMap, MozillaSourceMap.RawSourceMap>>;
