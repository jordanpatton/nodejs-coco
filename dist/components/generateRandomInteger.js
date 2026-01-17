/**
 * Generates a random integer between `minimum` and `maximum`.
 *
 * @see https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
export var generateRandomInteger = function (minimum, maximum) {
    if (minimum === void 0) { minimum = 0; }
    if (maximum === void 0) { maximum = 1; }
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};
