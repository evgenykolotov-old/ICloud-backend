import { Router } from "express";
import { body } from "express-validator";
import AuthController from "../controllers/auth.controller";
const router = Router();

const validateFields = [
	body("email", "Некорректный email!").isEmail(),
	body("password", "Пароль должен быть не менее 6 символов...").isLength({ min: 6 })
];

router.post("/registration", validateFields, AuthController.registration);
router.post("/login", AuthController.authorization);

export default router;
