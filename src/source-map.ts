/**
 * @deprecated SourceMap type compatible with the one exported from this library
 * in version 0.2.1.
 *
 * This deviates from the spec in order to be compatible with the Mozilla
 * source-map library. However, these same deviations are incompatible with
 * Babel's definition of a source map. It is recommended you use
 * {@link SourceMap.SpecCompliant},
 * {@link SourceMap.MozillaSourceMapLibraryCompatible},
 * {@link SourceMap.BabelCompatible}, or {@link SourceMap.Loose} instead,
 * depending on your use-case.
 */
export type SourceMap = SourceMap.MozillaSourceMapLibraryCompatible;

export namespace SourceMap {
  /**
   * V3 Source map as defined at https://tc39.es/ecma426/2024/#source-map-format
   */
  export type SpecCompliant = {
    /**
     * The version field which shall always be the number 3 as an integer. The
     * source map may be rejected if the field has any other value.
     */
    version: number;

    /**
     * An optional name of the generated code that this source map is associated
     * with. It’s not specified if this can be a URL, relative path name, or just
     * a base name. Source map generators may choose the appropriate
     * interpretation for their contexts of use.
     */
    file?: string;

    /**
     * An optional source root string, used for relocating source files on a
     * server or removing repeated values in the sources entry. This value is
     * prepended to the individual entries in the sources field.
     */
    sourceRoot?: string;

    /**
     * A list of original sources used by the mappings entry. Each entry is either
     * a string that is a (potentially relative) URL or null if the source name is
     * not known.
     */
    sources: Array<string | null>;

    /**
     * An optional list of source content (i.e., the [Original Source](https://tc39.es/ecma426/2024/#original-source))
     * strings, used when the source cannot be hosted. The contents are listed in
     * the same order as the sources. Entries may be null if some original
     * sources should be retrieved by name.
     */
    sourcesContent?: Array<string>;

    /**
     * An optional list of symbol names which may be used by the mappings entry.
     */
    names?: Array<string>;

    /**
     * A string of base64 VLQs which contain the actual mappings. See [Mappings Structure](https://tc39.es/ecma426/2024/#mappings-structure).
     */
    mappings: string;

    /**
     * An optional list of indices of files that should be considered third party
     * code, such as framework code or bundler-generated code. This allows
     * developer tools to avoid code that developers likely don’t want to see or
     * step through, without requiring developers to configure this beforehand. It
     * refers to the sources array and lists the indices of all the known
     * third-party sources in the source map. Some browsers may also use the
     * deprecated x_google_ignoreList field if ignoreList is not present.
     */
    ignoreList?: Array<number>;

    /**
     * @deprecated see ignoreList.
     */
    x_google_ignoreList?: Array<number>;
  };

  /** Applies the Mozilla "source-map" library's deviations from the spec onto
   * an object type. */
  export type ApplyMozillaLibraryDeviations<
    SourceMapType extends { version: any; sources: any; names?: any },
  > = Omit<SourceMapType, "version" | "sources" | "names"> & {
    /**
     * The spec declares that this should always be the value 3 as an integer, but
     * the types for Mozilla's "source-map" library incorrectly type this field as
     * a string.
     */
    version: string;

    /**
     * A list of original sources used by the mappings entry. Each entry is
     * either a string that is a (potentially relative) URL or null if the
     * source name is not known.
     *
     * The spec declares that `null` entries are allowed in this Array, but the
     * RawSourceMap type from Mozilla's "source-map" library types disallows
     * this.
     */
    sources: Array<string>;

    /**
     * A list of symbol names which may be used by the mappings entry.
     *
     * The spec declares that this property is optional, but the RawSourceMap
     * type from Mozilla's "source-map" library considers it required.
     */
    names: Array<string>;
  };

  /**
   * SourceMap type compatible with Mozilla's "source-map" library (version
   * 0.6.1).
   */
  export type MozillaSourceMapLibraryCompatible =
    ApplyMozillaLibraryDeviations<SpecCompliant>;

  /** Applies Babel's deviations from the spec onto an object type. */
  export type ApplyBabelDeviations<
    SourceMapType extends { file?: any; sources: any; names?: any },
  > = Omit<SourceMapType, "sources"> & {
    /**
     * An optional name of the generated code that this source map is associated
     * with. It’s not specified if this can be a URL, relative path name, or
     * just a base name. Source map generators may choose the appropriate
     * interpretation for their contexts of use.
     *
     * The spec declares that this property is optional, but Babel's types
     * consider it required.
     */
    file: string;

    /**
     * A list of original sources used by the mappings entry. Each entry is either
     * a string that is a (potentially relative) URL or null if the source name is
     * not known.
     *
     * The spec declares that `null` entries are allowed in this Array, but
     * Babel's types disallow this.
     */
    sources: Array<string>;

    /**
     * A list of symbol names which may be used by the mappings entry.
     *
     * The spec declares that this property is optional, but Babel's types
     * consider it required.
     */
    names: Array<string>;
  };

  /**
   * SourceMap type compatible with Babel.
   */
  export type BabelCompatible = ApplyBabelDeviations<SpecCompliant>;

  export type Loose =
    SpecCompliant | BabelCompatible | MozillaSourceMapLibraryCompatible;
}
