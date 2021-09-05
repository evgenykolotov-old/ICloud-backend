"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
var router = express_1.Router();
var validateFields = [
    express_validator_1.body("email", "Некорректный email!").isEmail(),
    express_validator_1.body("password", "Пароль должен быть не менее 6 символов...").isLength({ min: 6 })
];
router.post("/registration", validateFields, auth_controller_1.default.registration);
router.post("/login", auth_controller_1.default.authorization);
exports.default = router;
