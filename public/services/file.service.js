"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var config_1 = __importDefault(require("config"));
var FileService = /** @class */ (function () {
    function FileService() {
    }
    FileService.prototype.createDir = function (file) {
        var filePath = config_1.default.get("filePath") + "/" + file.user + "/" + file.path;
        return new Promise(function (resolve, reject) {
            try {
                if (!fs_1.default.existsSync(filePath)) {
                    fs_1.default.mkdirSync(filePath);
                    return resolve({
                        status: "error",
                        message: "Директория успешно создана"
                    });
                }
                else {
                    return reject({
                        status: "error",
                        message: "Такой файл уже существует"
                    });
                }
            }
            catch (error) {
                return reject({
                    status: "error",
                    message: "Ошибка при создании директории!"
                });
            }
        });
    };
    FileService.prototype.deleteFile = function (file) {
        var path = this.getPath(file);
        if (file.type === 'dir') {
            fs_1.default.rmdirSync(path);
        }
        else {
            fs_1.default.unlinkSync(path);
        }
    };
    FileService.prototype.getPath = function (file) {
        return config_1.default.get("filePath") + "/" + file.user.id + "/" + file.path;
    };
    return FileService;
}());
exports.default = new FileService();
