import { PathLike as TPathLike } from 'node:fs';
import { readFile } from 'node:fs/promises';
/** `readStringFromFileAsync` parameters. */
export interface IReadStringFromFileAsyncParameters {
    /** Path of file to be read. */
    fromPath: TPathLike;
    /**
     * `node:fs/promises.readFile` options. `readFileOptions` must specify a string-compatible `encoding`, or else the
     * result will be a `Buffer`, and this function (`readStringFromFileAsync`) will fail.
     * @see https://stackoverflow.com/questions/6456864/why-does-node-jss-fs-readfile-return-a-buffer-instead-of-string
     */
    readFileOptions?: Parameters<typeof readFile>[1];
}
/**
 * Reads from a file at a given path to a string. `async`-compatible.
 *
 * @param parameters - Parameters.
 * @returns Promisified string. Settles when data is ready.
 */
export declare const readStringFromFileAsync: ({ fromPath, readFileOptions, }: IReadStringFromFileAsyncParameters) => Promise<string>;
