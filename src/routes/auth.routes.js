const { Router } = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/auth.controller");
const router = Router();

const validateFields = [
	body("email", "Некорректный email!").isEmail(),
	body("password", "Пароль должен быть не менее 6 символов...").isLength({ min: 6 })
];

router.post("/registration", validateFields, authController.registration);
router.post("/login", authController.authorization);

module.exports = router;
