import jwt from 'jsonwebtoken';
import config from 'config';
import { Request, Response, NextFunction as Next } from 'express';
import { MiddlewareResponse } from '../types/index';
import { User } from '../models/User';

const authMiddleware =  async (request: Request, response: Response, next: Next): Promise<MiddlewareResponse> => {
	if (request.method === "OPTIONS") {
		return next();
	}
	try {
		const token = request.headers.authorization?.split(' ')[1];
		if (!token) {
			return response.status(401).json({
				status: "error",
				message: "Пользователь не авторизован!"
			});
		}
		const decoded = jwt.verify(token, config.get("secretKey"));
		request.user = decoded as Partial<User>;
		return next();
	} catch (error) {
		return response.status(401).json({
			status: "error",
			message: "Ошибка при авторизации!"
		});
	}
}

export default authMiddleware;
