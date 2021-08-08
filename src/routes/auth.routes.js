const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

const validateFields = [
	body("email", "Некорректный email!").isEmail(),
	body("password", "Пароль должен быть не менее 6 символов...").isLength({ min: 6 })
];

router.post("/registration", validateFields, async (request, response) => {
	try {
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(400).json({ 
				status: "error",
				message: `Некорректный запрос: ${errors.array()}!`
			});
		}
		const { email, password } = request.body;
		const candidate = await User.findOne({ email });
		if (candidate) {
			return response.status(400).json({
				status: "error",
				message: `Пользователь с email ${email} уже существует!`	
			});
		}
		const hashPassword = await bcrypt.hash(password, 15);
		const user = new User({ email, password: hashPassword });
		const saved = await user.save();
		if (!saved) {
			throw new Error("Ошибка регистрации, попробуйте позже!");
		}
		return response.status(201).json({
			status: "success",
			message: "Пользователь успешно зарегистрирован!"
		});
	} catch (error) {
		console.log(`An error occurred on the server: ${error}`);
		return response.status(500).json({ 
			status: "error", 
			message: `Возникла ошибка на сервере: ${error}` 
		});
	}
});

module.exports = router;
