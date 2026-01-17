/**
 * Parses the command line for a given parameter and returns its value.
 *
 * @param key - Key for a command line parameter.
 * @returns Whether or not the `key` is present and the value associated with that `key`.
 */
export declare const getCommandLineParameter: (key: string) => {
    keyIsPresent: boolean;
    value: string | undefined;
};
