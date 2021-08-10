const fileService = require("../services/file.service");
const User = require("../models/User");
const File = require("../models/File");

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
			return response.status(201).json({ status: "success", file });
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
