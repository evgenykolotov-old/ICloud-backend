import fs from 'fs';
import config from 'config';
import { Request, Response } from 'express';
import { ControllerResponse } from '../types';
import User, { User as UserType } from '../models/User';
import File, { File as FileType } from '../models/File';
import fileService from '../services/file.service';

class FileController {
	public static async createDir(request: Request, response: Response): Promise<ControllerResponse> {
		try {
			const { name, type, parent } = request.body;
			const file = new File({ name, type, parent, user: request.user?.id });
			const parentFile = await File.findOne({ _id: parent });
			if (!parentFile) {
				file.path = name;
				await fileService.createDir(file);
			} else {
				file.path = `${parentFile.path}/${file.name}`;
				await fileService.createDir(file);
				parentFile.children.push(file._id);
				await parentFile.save();
			}
			await file.save();
			return response.status(201).json({ 
				status: "success", 
				message: "Дирректория была успешно создана",
				file 
			});
		} catch (error) {
			console.log(`An error occurred on the server: ${error}`);
			return response.status(500).json({
				status: "error",
				message: `Возникла ошибка на сервере: ${error}`
			})
		}
	}

	public static async getFiles(request: Request, response: Response): Promise<ControllerResponse> {
		try {
			const parent: string = request.query.parent as string;
			const { sort } = request.query;
			let files: FileType[];
			switch (sort) {
				case 'name':
					files = await File.find({ user: request.user?.id, parent }).sort({ name: 1 });
					break;
				case 'type':
					files = await File.find({ user: request.user?.id, parent }).sort({ type: 1 });
					break;
				case 'date':
					files = await File.find({ user: request.user?.id, parent }).sort({ date: 1 });
					break;
				default: 
					files = await File.find({ user: request.user?.id, parent });
					break;
			}
			return response.status(200).json({ status: "success", files });
		} catch (error) {
			console.log(`An error occurred on the server: ${error}`);
			return response.status(500).json({
				status: "error",
				message: `Возникла ошибка на сервере: ${error}`
			})
		}
	}

	public static async uploadFile(request: Request, response: Response): Promise<ControllerResponse> {
		try {
			const file = request.files?.file as Partial<FileType>;
			const parent = await File.findOne({ user: request.user?.id, _id: request.body.parent });
			const user: UserType = await User.findOne({ _id: request.user?.id }) as UserType;
			if (user?.usedSpace + file?.size! > user?.diskSpace) {
				return response.status(400).json({
					status: "error",
					message: "Не хватает свободного места на диске!"
				});
			}
			user.usedSpace = user.usedSpace + file?.size!;
			let path;
			if (parent) {
				path = `${config.get("filePath")}/${user.id}/${parent.path}/${file?.name}`;
			} else {
				path = `${config.get("filePath")}/${user.id}/${file?.name}`;
			}
			if (fs.existsSync(path)) {
				return response.status(400).json({
					status: "success",
					message: "Файл с таким именем уже существует"
				});
			}
			fs.renameSync(file.name!, path);
			const type = file?.name!.split(".").pop();
			let filePath = file?.path;
			if (parent) {
				filePath = `${file?.parent}/${file.name}`;
			}
			const dbFile = new File({
				name: file.name,
				size: file.size,
				path: filePath,
				parent: parent && parent._id,
				user: user._id,
				type
			});
			await dbFile.save();
			await user.save();
			return response.status(201).json({
				status: "success",
				message: "Загрузка файла прошла успешно",
				file: dbFile,
			});
		} catch (error) {
			console.log(`An error occurred on the server: ${error}`);
			return response.status(500).json({
				status: "error",
				message: `Возникла ошибка на сервере: ${error}`
			})	
		}
	}

	public static async deleteFile(request: Request, response: Response): Promise<ControllerResponse> {
		try {
			const fileId: string = request.query.id as string;
			const file = await File.findOne({ _id: fileId, user: request.user?.id });
			if (!file) {
				return response.status(404).json({
					status: "error",
					message: "Файл с таким именем не найден!"
				});
			}
			fileService.deleteFile(file);
			await file.remove();
			return response.status(200).json({
				status: "success",
				message: "Файл был успешно удалён! "
			});
		} catch (error) {
			console.log(`An error occurred on the server: ${error}`);
			return response.status(500).json({
				status: "error",
				message: `Возникла ошибка на сервере: ${error}`
			})
		}
	}

	public static async downloadFile(request: Request, response: Response): Promise<ControllerResponse | void> {
		try {
			const fileId: string = request.query.id as string;
			const file = await File.findOne({ _id: fileId, user: request.user?.id });
			const path = `${config.get("filePath")}/${request.user?.id}/${file?.path}/${file?.name}`;
			if (fs.existsSync(path)) {
				return response.download(path);
			} 
			return response.status(404).json({
				status: "error",
				message: "Ошибка загрузки файла. Попробуйте позже!"
			});
		} catch (error) {
			console.log(`An error occurred on the server: ${error}`);
			return response.status(500).json({
				status: "error",
				message: `Возникла ошибка на сервере: ${error}`
			})
		}
	}
}

export default FileController;
