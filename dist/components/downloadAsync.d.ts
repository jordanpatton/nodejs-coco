import { getFileNameFromContentDispositionHeader } from './getFileNameFromContentDispositionHeader.js';
import { IWriteStreamToFileAsyncParameters } from './writeStreamToFileAsync.js';
/** `downloadAsync` parameters. */
export interface IDownloadAsyncParameters {
    /** `node:fs.createWriteStream` options. May include `flags`. */
    createWriteStreamOptions?: IWriteStreamToFileAsyncParameters['createWriteStreamOptions'];
    /** `options` passed to `fetch(url, options)` for downloading a resource. */
    fetchOptions?: Parameters<typeof fetch>[1];
    /** URL of a resource to be downloaded. */
    fromUrl: Parameters<typeof fetch>[0];
    /** Whether or not to create the destination directory (aka `toDirectory`) if it does not already exist. */
    shouldMakeDirectory?: IWriteStreamToFileAsyncParameters['shouldMakeDirectory'];
    /** Destination directory for downloaded resource. */
    toDirectory?: IWriteStreamToFileAsyncParameters['toDirectory'];
    /** File name (base name + extension) for downloaded resource. Defaults to `Content-Disposition` file name in response headers. */
    toFileName?: ((contentDispositionFileName: ReturnType<typeof getFileNameFromContentDispositionHeader>) => IWriteStreamToFileAsyncParameters['toFileName']) | IWriteStreamToFileAsyncParameters['toFileName'];
}
/** Default directory for downloaded files. */
export declare const DEFAULT_DOWNLOAD_DIRECTORY = ".";
/** Default file name (base name + extension) for a downloaded file. */
export declare const DEFAULT_DOWNLOAD_FILE_NAME = "untitled";
/**
 * Downloads `fetchUrl` and writes it to `toDirectory` + `toFileName`. `async`-compatible.
 *
 * @param parameters - Parameters.
 * @returns Promisified void. Settles when download finishes.
 */
export declare const downloadAsync: ({ createWriteStreamOptions, fetchOptions, fromUrl, shouldMakeDirectory, toDirectory, toFileName, }: IDownloadAsyncParameters) => Promise<void>;
