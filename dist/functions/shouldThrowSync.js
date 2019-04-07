"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NotThrownError_1 = require("../classes/NotThrownError");
function shouldThrowSync(type, thrower, callback) {
    try {
        thrower();
    }
    catch (err) {
        // tslint:disable-next-line:ban-types
        if (type !== undefined && !(err instanceof type)) {
            throw new NotThrownError_1.NotThrownError(type, err);
        }
        if (callback === undefined) {
            return;
        }
        else {
            return callback(err);
        }
    }
    throw new NotThrownError_1.NotThrownError(type, undefined);
}
exports.shouldThrowSync = shouldThrowSync;
//# sourceMappingURL=shouldThrowSync.js.map