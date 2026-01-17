import { promisifyByException } from './promisifyByException.js';
import { sleepAsync } from './sleepAsync.js';
/**
 * Recursively invokes user-defined `task` until one of the following occurs: `task` succeeds, this function times out,
 * or this function runs out of tries.
 *
 * @param callerResolve - `resolve` function from caller `Promise`.
 * @param callerReject - `reject` function from caller `Promise`.
 * @param promisifiedTask - Promisified version of user-defined behavior to be tried.
 * @param sleepMillisecondsFunction - How long to sleep (in milliseconds) if the current `task` invocation fails.
 * @param startTimeMilliseconds - Time (in milliseconds since Unix epoch) when recursion started.
 * @param recursionIndex - Zero-indexed recursion counter.
 * @param options - Options.
 * @returns Void.
 */
var tryUntilAsyncHelper = function (callerResolve, callerReject, promisifiedTask, sleepMillisecondsFunction, startTimeMilliseconds, recursionIndex, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.isVerbose, isVerbose = _c === void 0 ? false : _c, remainingNumberOfTries = _b.remainingNumberOfTries, timeToLiveMilliseconds = _b.timeToLiveMilliseconds;
    // Prepare loggers.
    var consoleError = isVerbose ? console.error : function () { };
    var consoleGroup = isVerbose ? console.group : function () { };
    var consoleGroupEnd = isVerbose ? console.groupEnd : function () { };
    // Invoke `promisifiedTask` and handle outcome.
    promisifiedTask().then(callerResolve, // `task` succeeded. Stop recursing and resolve caller Promise with `task` result as value.
    function (reason) {
        consoleError("Try #".concat(recursionIndex + 1, " failed."));
        consoleGroup();
        consoleError(reason);
        consoleGroupEnd();
        // If we have run out of time OR will run out of time during the next sleep...
        var sleepMillisecondsNumber = sleepMillisecondsFunction(recursionIndex);
        if (typeof timeToLiveMilliseconds === 'number') {
            var remainingMs = timeToLiveMilliseconds - (Date.now() - startTimeMilliseconds);
            if (remainingMs <= 0 || remainingMs < sleepMillisecondsNumber) {
                callerReject('Timed out.'); // ...then reject the caller Promise...
                return; // ...and stop here (do not recurse).
            }
        }
        // If we have run out of tries...
        if (typeof remainingNumberOfTries === 'number' && remainingNumberOfTries <= 1) {
            callerReject('Ran out of tries.'); // ...then reject the caller Promise...
            return; // ...and stop here (do not recurse).
        }
        // Otherwise...
        sleepAsync(sleepMillisecondsNumber).then(// ...sleep...
        function () {
            tryUntilAsyncHelper(// ...and recurse.
            callerResolve, callerReject, promisifiedTask, sleepMillisecondsFunction, startTimeMilliseconds, recursionIndex + 1, {
                isVerbose: isVerbose,
                remainingNumberOfTries: typeof remainingNumberOfTries === 'number' ? remainingNumberOfTries - 1 : undefined,
                timeToLiveMilliseconds: timeToLiveMilliseconds,
            });
        }, function () {
            callerReject('Sleep failed.'); // This should never happen, but if it does then reject the caller Promise and do not recurse.
        });
    });
};
/**
 * Repeatedly invokes user-defined `task` until one of the following occurs: `task` succeeds, this function times out,
 * or this function runs out of tries. `task` can be either synchronous or asynchronous, but must "fail" or "succeed"
 * according to the following logic:
 * - If `task` is synchronous, then it should "fail" by throwing an unhandled exception, and it should "succeed" by
 *   completing without throwing an unhandled exception.
 * - If `task` is asynchronous via manually returning a `Promise`, then it should "fail" by returning a rejected
 *   `Promise`, and it should "succeed" by returning a resolved `Promise`.
 * - If `task` is asynchronous via the `async` keyword, then it should "fail" by throwing an unhandled exception
 *   (creating a rejected `Promise`), and it should "succeed" by completing without throwing an unhandled exception
 *   (creating a resolved `Promise`).
 *
 * If `task` cannot "fail", then this function will still work, but it will be completely pointless because `task` will
 * always "succeed" on the first try.
 *
 * @param task - User-defined behavior to be tried.
 * @param options - Options.
 * @returns Promisified `task` result. Resolves when `task` succeeds. Rejects when this function times out or runs out
 *          of tries.
 */
export var tryUntilAsync = function (task, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.isVerbose, isVerbose = _c === void 0 ? false : _c, maximumNumberOfTries = _b.maximumNumberOfTries, _d = _b.sleepMilliseconds, sleepMilliseconds = _d === void 0 ? function (ri) { return 1000 * Math.pow(2, ri); } : _d, timeToLiveMilliseconds = _b.timeToLiveMilliseconds;
    return new Promise(function (resolve, reject) {
        tryUntilAsyncHelper(resolve, reject, promisifyByException(task), typeof sleepMilliseconds === 'function' ? sleepMilliseconds : function () { return sleepMilliseconds; }, Date.now(), 0, {
            isVerbose: isVerbose,
            remainingNumberOfTries: maximumNumberOfTries,
            timeToLiveMilliseconds: timeToLiveMilliseconds,
        });
    });
};
