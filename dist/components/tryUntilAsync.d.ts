/** `tryUntilAsync` options. */
interface ITryUntilAsyncOptions {
    /** Whether or not to be verbose. */
    isVerbose?: boolean;
    /** How many times to try before giving up. Can be used simultaneously with `timeToLiveMilliseconds`. */
    maximumNumberOfTries?: number;
    /**
     * How long to sleep (in milliseconds) between tries. By default, sleep time starts at 1000 milliseconds and grows
     * exponentially according to the following formula: `1000 * Math.pow(2, recursionIndex)`.
     */
    sleepMilliseconds?: ((recursionIndex: number) => number) | number;
    /**
     * How long to continue trying (in milliseconds) before timing out. Can be used simultaneously with
     * `maximumNumberOfTries`.
     */
    timeToLiveMilliseconds?: number;
}
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
export declare const tryUntilAsync: <TTaskResult>(task: () => TTaskResult | Promise<TTaskResult>, { isVerbose, maximumNumberOfTries, sleepMilliseconds, timeToLiveMilliseconds, }?: ITryUntilAsyncOptions) => Promise<TTaskResult>;
export {};
