/**
 * Returns a wrapped version of the input function that will return a `Promise`. (Does not invoke the input function.)
 * When you eventually invoke the wrapped function, it will behave as follows:
 * - If the input function is synchronous and it does not throw an unhandled exception, then the `Promise` will resolve.
 * - If the input function is synchronous and it throws an unhandled exception, then the `Promise` will reject.
 * - If the input function is asynchronous (by way of `async` keyword or by manually returning a `Promise`), then
 *   `promisifyByException` changes nothing and simply returns the natural result of the input function.
 *
 * @param fn - Input function to be wrapped.
 * @returns Promisified version of the input function.
 *
 * @see https://stackoverflow.com/questions/38598280/is-it-possible-to-wrap-a-function-and-retain-its-types
 */
export var promisifyByException = function (fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            var result = fn.apply(void 0, args);
            return result instanceof Promise ? result : Promise.resolve(result);
        }
        catch (error) {
            return Promise.reject(error);
        }
    };
};
