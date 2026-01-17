var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { generateRandomInteger } from './generateRandomInteger.js';
/**
 * Promise-based sleep that suspends logic flow for `milliseconds`.
 *
 * @example
 * ```javascript
 * doSomethingBefore();
 * await sleepHelperAsync(1000); // or `sleepHelperAsync(1000).then(doSomethingAfter);`
 * doSomethingAfter();
 * ```
 *
 * @param milliseconds - How long to sleep (in milliseconds).
 * @returns Promisified void. Settles when sleep ends.
 */
var sleepHelperAsync = function (milliseconds) {
    return new Promise(function (resolve) { return setTimeout(resolve, milliseconds); });
};
/**
 * Async sleep that suspends logic flow with optional jitter and messaging.
 *
 * @param fixedMilliseconds - How long to sleep (fixed; in milliseconds).
 * @param jitterMilliseconds - How long to sleep (jitter; in milliseconds).
 * @param message - Function or string for printing a message to stdout during sleep.
 * @returns Promisified void. Settles when sleep ends.
 */
export var sleepAsync = function (fixedMilliseconds_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([fixedMilliseconds_1], args_1, true), void 0, function (fixedMilliseconds, jitterMilliseconds, message) {
        var totalMilliseconds;
        if (jitterMilliseconds === void 0) { jitterMilliseconds = 0; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    totalMilliseconds = fixedMilliseconds + generateRandomInteger(0, jitterMilliseconds);
                    if (typeof message !== 'undefined') {
                        process.stdout.write(typeof message === 'function' ? message(totalMilliseconds) : message);
                    }
                    return [4 /*yield*/, sleepHelperAsync(totalMilliseconds)];
                case 1:
                    _a.sent();
                    if (typeof message !== 'undefined') {
                        process.stdout.clearLine(0);
                    }
                    if (typeof message !== 'undefined') {
                        process.stdout.cursorTo(0);
                    }
                    return [2 /*return*/];
            }
        });
    });
};
