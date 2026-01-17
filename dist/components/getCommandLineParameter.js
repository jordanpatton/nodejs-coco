/**
 * Parses the command line for a given parameter and returns its value.
 *
 * @param key - Key for a command line parameter.
 * @returns Whether or not the `key` is present and the value associated with that `key`.
 */
export var getCommandLineParameter = function (key) {
    // Item 0 is the path to the node executable.
    // Item 1 is the path to the entry-point script.
    // Any further items are optional parameters.
    var argvSlice = process.argv.slice(2);
    var keyIndex = argvSlice.indexOf(key);
    return {
        keyIsPresent: keyIndex !== -1,
        value: (keyIndex !== -1 && keyIndex + 1 < argvSlice.length) ? argvSlice[keyIndex + 1] : undefined,
    };
};
