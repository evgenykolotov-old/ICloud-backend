const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async (request, response, next) => {
	if (request.method === "OPTIONS") {
		return next();
	}
	try {
		const token = request.headers.authorization.split(' ')[1];
		if (!token) {
			return response.status(401).json({
				status: "error",
				message: "Пользователь не авторизован!"
			});
		}
		const decoded = jwt.verify(token, config.get("secretKey"));
		request.user = decoded;
		next();
	} catch (error) {
		return response.status(401).json({
			status: "error",
			message: "Ошибка при авторизации!"
		});
	}
}
