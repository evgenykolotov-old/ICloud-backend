"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
var file_controller_1 = __importDefault(require("../controllers/file.controller"));
var router = express_1.Router();
router.get("", auth_middleware_1.default, file_controller_1.default.getFiles);
router.get("/download", auth_middleware_1.default, file_controller_1.default.downloadFile);
router.post("", auth_middleware_1.default, file_controller_1.default.createDir);
router.post("/upload", auth_middleware_1.default, file_controller_1.default.uploadFile);
router.delete("", auth_middleware_1.default, file_controller_1.default.deleteFile);
exports.default = router;
