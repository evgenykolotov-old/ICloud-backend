import { Router } from 'express';
import { body } from 'express-validator';
import AuthController from '../controllers/auth.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

const validateFields = [
	body("email", "Некорректный email!").isEmail(),
	body("password", "Пароль должен быть не менее 6 символов...").isLength({ min: 6 })
];

router.post("/registration", validateFields, AuthController.registration);
router.post("/login", AuthController.login);
router.post('/auth', authMiddleware, AuthController.authorization);

export default router;
