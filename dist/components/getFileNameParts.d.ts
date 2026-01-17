/**
 * Returns parts for a given file name. Does not handle compound extensions correctly (example: .tar.gz). Doing so would
 * require a much more complex treatment than we need in this application.
 *
 * @param fileName - File name.
 * @returns Parts.
 */
export declare const getFileNameParts: (fileName: string) => {
    /** `baseName` from `baseName.extension`. */
    baseName: string;
    /** `extension` from `baseName.extension`. */
    extension: string | undefined;
};
