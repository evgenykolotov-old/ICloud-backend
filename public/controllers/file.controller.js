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
var fs_1 = __importDefault(require("fs"));
var config_1 = __importDefault(require("config"));
var User_1 = __importDefault(require("../models/User"));
var File_1 = __importDefault(require("../models/File"));
var file_service_1 = __importDefault(require("../services/file.service"));
var FileController = /** @class */ (function () {
    function FileController() {
    }
    FileController.createDir = function (request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, name_1, type, parent_1, file, parentFile, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 8, , 9]);
                        _b = request.body, name_1 = _b.name, type = _b.type, parent_1 = _b.parent;
                        file = new File_1.default({ name: name_1, type: type, parent: parent_1, user: (_a = request.user) === null || _a === void 0 ? void 0 : _a.id });
                        return [4 /*yield*/, File_1.default.findOne({ _id: parent_1 })];
                    case 1:
                        parentFile = _c.sent();
                        if (!!parentFile) return [3 /*break*/, 3];
                        file.path = name_1;
                        return [4 /*yield*/, file_service_1.default.createDir(file)];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        file.path = parentFile.path + "/" + file.name;
                        return [4 /*yield*/, file_service_1.default.createDir(file)];
                    case 4:
                        _c.sent();
                        parentFile.children.push(file._id);
                        return [4 /*yield*/, parentFile.save()];
                    case 5:
                        _c.sent();
                        _c.label = 6;
                    case 6: return [4 /*yield*/, file.save()];
                    case 7:
                        _c.sent();
                        return [2 /*return*/, response.status(201).json({
                                status: "success",
                                message: "Дирректория была успешно создана",
                                file: file
                            })];
                    case 8:
                        error_1 = _c.sent();
                        console.log("An error occurred on the server: " + error_1);
                        return [2 /*return*/, response.status(500).json({
                                status: "error",
                                message: "\u0412\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0435: " + error_1
                            })];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    FileController.getFiles = function (request, response) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var parent_2, sort, files, _e, error_2;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 10, , 11]);
                        parent_2 = request.query.parent;
                        sort = request.query.sort;
                        files = void 0;
                        _e = sort;
                        switch (_e) {
                            case 'name': return [3 /*break*/, 1];
                            case 'type': return [3 /*break*/, 3];
                            case 'date': return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, File_1.default.find({ user: (_a = request.user) === null || _a === void 0 ? void 0 : _a.id, parent: parent_2 }).sort({ name: 1 })];
                    case 2:
                        files = _f.sent();
                        return [3 /*break*/, 9];
                    case 3: return [4 /*yield*/, File_1.default.find({ user: (_b = request.user) === null || _b === void 0 ? void 0 : _b.id, parent: parent_2 }).sort({ type: 1 })];
                    case 4:
                        files = _f.sent();
                        return [3 /*break*/, 9];
                    case 5: return [4 /*yield*/, File_1.default.find({ user: (_c = request.user) === null || _c === void 0 ? void 0 : _c.id, parent: parent_2 }).sort({ date: 1 })];
                    case 6:
                        files = _f.sent();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, File_1.default.find({ user: (_d = request.user) === null || _d === void 0 ? void 0 : _d.id, parent: parent_2 })];
                    case 8:
                        files = _f.sent();
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/, response.status(200).json({ status: "success", files: files })];
                    case 10:
                        error_2 = _f.sent();
                        console.log("An error occurred on the server: " + error_2);
                        return [2 /*return*/, response.status(500).json({
                                status: "error",
                                message: "\u0412\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0435: " + error_2
                            })];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    FileController.uploadFile = function (request, response) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var file, parent_3, user, path, type, filePath, dbFile, error_3;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, , 6]);
                        file = (_a = request.files) === null || _a === void 0 ? void 0 : _a.file;
                        return [4 /*yield*/, File_1.default.findOne({ user: (_b = request.user) === null || _b === void 0 ? void 0 : _b.id, _id: request.body.parent })];
                    case 1:
                        parent_3 = _d.sent();
                        return [4 /*yield*/, User_1.default.findOne({ _id: (_c = request.user) === null || _c === void 0 ? void 0 : _c.id })];
                    case 2:
                        user = _d.sent();
                        if ((user === null || user === void 0 ? void 0 : user.usedSpace) + (file === null || file === void 0 ? void 0 : file.size) > (user === null || user === void 0 ? void 0 : user.diskSpace)) {
                            return [2 /*return*/, response.status(400).json({
                                    status: "error",
                                    message: "Не хватает свободного места на диске!"
                                })];
                        }
                        user.usedSpace = user.usedSpace + (file === null || file === void 0 ? void 0 : file.size);
                        path = void 0;
                        if (parent_3) {
                            path = config_1.default.get("filePath") + "/" + user.id + "/" + parent_3.path + "/" + (file === null || file === void 0 ? void 0 : file.name);
                        }
                        else {
                            path = config_1.default.get("filePath") + "/" + user.id + "/" + (file === null || file === void 0 ? void 0 : file.name);
                        }
                        if (fs_1.default.existsSync(path)) {
                            return [2 /*return*/, response.status(400).json({
                                    status: "success",
                                    message: "Файл с таким именем уже существует"
                                })];
                        }
                        fs_1.default.renameSync(file.name, path);
                        type = file === null || file === void 0 ? void 0 : file.name.split(".").pop();
                        filePath = file === null || file === void 0 ? void 0 : file.path;
                        if (parent_3) {
                            filePath = (file === null || file === void 0 ? void 0 : file.parent) + "/" + file.name;
                        }
                        dbFile = new File_1.default({
                            name: file.name,
                            size: file.size,
                            path: filePath,
                            parent: parent_3 && parent_3._id,
                            user: user._id,
                            type: type
                        });
                        return [4 /*yield*/, dbFile.save()];
                    case 3:
                        _d.sent();
                        return [4 /*yield*/, user.save()];
                    case 4:
                        _d.sent();
                        return [2 /*return*/, response.status(201).json({
                                status: "success",
                                message: "Загрузка файла прошла успешно",
                                file: dbFile,
                            })];
                    case 5:
                        error_3 = _d.sent();
                        console.log("An error occurred on the server: " + error_3);
                        return [2 /*return*/, response.status(500).json({
                                status: "error",
                                message: "\u0412\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0435: " + error_3
                            })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    FileController.deleteFile = function (request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var fileId, file, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        fileId = request.query.id;
                        return [4 /*yield*/, File_1.default.findOne({ _id: fileId, user: (_a = request.user) === null || _a === void 0 ? void 0 : _a.id })];
                    case 1:
                        file = _b.sent();
                        if (!file) {
                            return [2 /*return*/, response.status(404).json({
                                    status: "error",
                                    message: "Файл с таким именем не найден!"
                                })];
                        }
                        file_service_1.default.deleteFile(file);
                        return [4 /*yield*/, file.remove()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, response.status(200).json({
                                status: "success",
                                message: "Файл был успешно удалён! "
                            })];
                    case 3:
                        error_4 = _b.sent();
                        console.log("An error occurred on the server: " + error_4);
                        return [2 /*return*/, response.status(500).json({
                                status: "error",
                                message: "\u0412\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0435: " + error_4
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FileController.downloadFile = function (request, response) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var fileId, file, path, error_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        fileId = request.query.id;
                        return [4 /*yield*/, File_1.default.findOne({ _id: fileId, user: (_a = request.user) === null || _a === void 0 ? void 0 : _a.id })];
                    case 1:
                        file = _c.sent();
                        path = config_1.default.get("filePath") + "/" + ((_b = request.user) === null || _b === void 0 ? void 0 : _b.id) + "/" + (file === null || file === void 0 ? void 0 : file.path) + "/" + (file === null || file === void 0 ? void 0 : file.name);
                        if (fs_1.default.existsSync(path)) {
                            return [2 /*return*/, response.download(path)];
                        }
                        return [2 /*return*/, response.status(404).json({
                                status: "error",
                                message: "Ошибка загрузки файла. Попробуйте позже!"
                            })];
                    case 2:
                        error_5 = _c.sent();
                        console.log("An error occurred on the server: " + error_5);
                        return [2 /*return*/, response.status(500).json({
                                status: "error",
                                message: "\u0412\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0435: " + error_5
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return FileController;
}());
exports.default = FileController;
