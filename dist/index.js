"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var builtin_class_decorator_1 = require("@typescript-plus/builtin-class-decorator");
var NotThrown = (function (_super) {
    __extends(NotThrown, _super);
    function NotThrown(expected, actual) {
        var _this = _super.call(this) || this;
        _this.expected = expected;
        _this.actual = actual;
        return _this;
    }
    Object.defineProperty(NotThrown.prototype, "actualToString", {
        get: function () {
            if (this.actual !== undefined && this.actual instanceof Object) {
                return this.actual.constructor.name;
            }
            return "" + this.actual;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NotThrown.prototype, "expectationMessage", {
        get: function () {
            return "Expected " + this.actualToString + " to be " + (this.expected ? this.expected.name : undefined) + ".";
        },
        enumerable: true,
        configurable: true
    });
    NotThrown = __decorate([
        builtin_class_decorator_1.BuiltinClass()
    ], NotThrown);
    return NotThrown;
}(Error));
exports.NotThrown = NotThrown;
function shouldThrow(type, thrower, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var throwerResult;
        return __generator(this, function (_a) {
            try {
                throwerResult = thrower();
            }
            catch (err) {
                try {
                    throwNotThrown(type, err);
                }
                catch (notThrownOrElse) {
                    return [2, Promise.reject(notThrownOrElse)];
                }
                if (callback === undefined) {
                    return [2, Promise.resolve()];
                }
                return [2, Promise.resolve(callback(err))];
            }
            if (throwerResult === undefined || !(typeof throwerResult.then === 'function')) {
                throw new NotThrown(type, undefined);
            }
            if (callback === undefined) {
                callback = function (error) { return undefined; };
            }
            return [2, new Promise(function (resolve, reject) {
                    throwerResult
                        .then(function () {
                        reject(new NotThrown(type, undefined));
                    })
                        .catch(function (reason) {
                        try {
                            throwNotThrown(type, reason);
                        }
                        catch (notThrownOrElse) {
                            reject(notThrownOrElse);
                        }
                        if (callback === undefined) {
                            resolve();
                        }
                        else {
                            resolve(callback(reason));
                        }
                    });
                })];
        });
    });
}
exports.shouldThrow = shouldThrow;
function shouldThrowSync(type, thrower, callback) {
    try {
        thrower();
    }
    catch (err) {
        throwNotThrown(type, err);
        if (callback !== undefined) {
            return callback(err);
        }
        return;
    }
    throw new NotThrown(type, undefined);
}
exports.shouldThrowSync = shouldThrowSync;
function throwNotThrown(type, error) {
    if (type === undefined) {
        if (error instanceof Error) {
            return;
        }
    }
    else {
        if (error instanceof type) {
            return;
        }
    }
    if (error === undefined) {
        throw new NotThrown(type, undefined);
    }
    else {
        throw new NotThrown(type, error);
    }
}
//# sourceMappingURL=index.js.map