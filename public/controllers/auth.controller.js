"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("config"));
var express_validator_1 = require("express-validator");
var User_1 = __importDefault(require("../models/User"));
var File_1 = __importDefault(require("../models/File"));
var file_service_1 = __importDefault(require("../services/file.service"));
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.registration = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, _a, email, password, candidate, hashPassword, user, saved, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        errors = express_validator_1.validationResult(request);
                        if (!errors.isEmpty()) {
                            return [2 /*return*/, response.status(400).json({
                                    status: "error",
                                    message: "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441: " + errors.array() + "!"
                                })];
                        }
                        _a = request.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, User_1.default.findOne({ email: email })];
                    case 1:
                        candidate = _b.sent();
                        if (candidate) {
                            return [2 /*return*/, response.status(400).json({
                                    status: "error",
                                    message: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0441 email " + email + " \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442!"
                                })];
                        }
                        return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
                    case 2:
                        hashPassword = _b.sent();
                        user = new User_1.default({ email: email, password: hashPassword });
                        return [4 /*yield*/, user.save()];
                    case 3:
                        saved = _b.sent();
                        if (!saved) {
                            throw new Error("Ошибка регистрации, попробуйте позже!");
                        }
                        return [4 /*yield*/, file_service_1.default.createDir(new File_1.default({ user: user.id, name: user.id }))];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, response.status(201).json({
                                status: "success",
                                message: "Пользователь успешно зарегистрирован!"
                            })];
                    case 5:
                        error_1 = _b.sent();
                        console.log("An error occurred on the server: " + error_1);
                        return [2 /*return*/, response.status(500).json({
                                status: "error",
                                message: "\u0412\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0435: " + error_1
                            })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.login = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, compare, token, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = request.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, User_1.default.findOne({ email: email })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, response.status(404).json({
                                    status: "error",
                                    message: "Пользователь не найден!"
                                })];
                        }
                        compare = bcryptjs_1.default.compareSync(password, user.password);
                        if (!compare) {
                            return [2 /*return*/, response.status(400).json({
                                    status: "error",
                                    message: "Не правильный emeil или пароль!"
                                })];
                        }
                        token = jsonwebtoken_1.default.sign({ id: user.id }, config_1.default.get("secretKey"), { expiresIn: "1h" });
                        return [2 /*return*/, response.status(200).json({
                                status: "success",
                                token: token,
                                payload: {
                                    id: user.id,
                                    email: user.email,
                                    diskSpace: user.diskSpace,
                                    usedSpace: user.usedSpace,
                                    avatar: user.avatar
                                }
                            })];
                    case 2:
                        error_2 = _b.sent();
                        console.log("An error occurred on the server: " + error_2);
                        return [2 /*return*/, response.status(500).json({
                                status: "error",
                                message: "\u0412\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0435: " + error_2
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.authorization = function (request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var user, token, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, User_1.default.findOne({ _id: (_a = request.user) === null || _a === void 0 ? void 0 : _a.id })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            throw new Error('Ошибка базы данных, пользователь не найден!');
                        }
                        token = jsonwebtoken_1.default.sign({ id: user.id }, config_1.default.get("secretKey"), { expiresIn: "1h" });
                        return [2 /*return*/, response.status(200).json({
                                status: "success",
                                token: token,
                                payload: {
                                    id: user.id,
                                    email: user.email,
                                    diskSpace: user.diskSpace,
                                    usedSpace: user.usedSpace,
                                    avatar: user.avatar
                                }
                            })];
                    case 2:
                        error_3 = _b.sent();
                        console.log("An error occurred on the server: " + error_3);
                        return [2 /*return*/, response.status(500).json({
                                status: "error",
                                message: "\u0412\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0435: " + error_3
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AuthController;
}());
exports.default = AuthController;
