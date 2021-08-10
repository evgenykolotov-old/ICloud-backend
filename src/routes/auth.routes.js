const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const File = require("../models/File");
const fileService = require("../services/file.service");
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
		const hashPassword = await bcrypt.hash(password, 10);
		const user = new User({ email, password: hashPassword });
		const saved = await user.save();
		if (!saved) {
			throw new Error("Ошибка регистрации, попробуйте позже!");
		}
		await fileService.createDir(new File({ user: user.id, name: user.id }));
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

router.post("/login", async (request, response) => {
	try {
		const { email, password } = request.body;
		const user = await User.findOne({ email });
		if (!user) {
			return response.status(404).json({
				status: "error",
				message: "Пользователь не найден!"
			});
		}
		const compare = bcrypt.compareSync(password, user.password);
		if (!compare) {
			return response.status(400).json({
				status: "error",
				message: "Не правильный emeil или пароль!"
			});
		}
		const token = jwt.sign({ id: user.id }, config.get("secretKey"), { expiresIn: "1h" });
		return response.status(200).json({
			status: "success",
			token,
			user: {
				id: user.id,
				email: user.email,
				diskSpace: user.diskSpace,
				usedSpace: user.usedSpace,
				avatar: user.avatar
			}
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
