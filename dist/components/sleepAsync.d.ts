/**
 * Async sleep that suspends logic flow with optional jitter and messaging.
 *
 * @param fixedMilliseconds - How long to sleep (fixed; in milliseconds).
 * @param jitterMilliseconds - How long to sleep (jitter; in milliseconds).
 * @param message - Function or string for printing a message to stdout during sleep.
 * @returns Promisified void. Settles when sleep ends.
 */
export declare const sleepAsync: (fixedMilliseconds: number, jitterMilliseconds?: number, message?: ((totalMilliseconds: number) => string) | string) => Promise<void>;
