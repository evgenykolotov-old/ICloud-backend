const fileService = require("../services/file.service");
const User = require("../models/User");
const File = require("../models/File");
const config = require("config");
const fs = require("fs");

class FileController {
	async createDir(request, response) {
		try {
			const { name, type, parent } = request.body;
			const file = new File({ name, type, parent, user: request.user.id });
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

	async getFiles(request, response) {
		try {
			const { sort } = request.query;
			let files;
			switch (sort) {
				case 'name':
					files = await File.find({ user: request.user.id, parent: request.query.parent }).sort({ name: 1 });
					break;
				case 'type':
					files = await File.find({ user: request.user.id, parent: request.query.parent }).sort({ type: 1 });
					break;
				case 'date':
					files = await File.find({ user: request.user.id, parent: request.query.parent }).sort({ date: 1 });
					break;
				default: 
					files = await File.find({ user: request.user.id, parent: request.query.parent });
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

	async uploadFile(request, response) {
		try {
			const file = request.files.file;
			const parent = await File.findOne({ user: request.user.id, _id: request.body.parent });
			const user = await User.findOne({ _id: request.user.id });
			if (user.usedSpace + file.size > user.diskSpace) {
				return resposne.status(400).json({
					status: "error",
					message: "Не хватает свободного места на диске!"
				});
			}
			user.usedSpace = user.usedSpace + file.size;
			let path;
			if (parent) {
				path = `${config.get("filePath")}/${user.id}/${parent.path}/${file.name}`;
			} else {
				path = `${config.get("filePath")}/${user.id}/${file.name}`;
			}
			if (fs.existsSync(path)) {
				return response.status(400).json({
					status: "success",
					message: "Файл с таким именем уже существует"
				});
			}
			file.mv(path);
			const type = file.name.split(".").pop();
			const dbFile = new File({
				name: file.name,
				size: file.size,
				path: parent && parent.path,
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
}

module.exports = new FileController();
