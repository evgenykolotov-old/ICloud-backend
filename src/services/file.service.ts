const fs = require("fs");
const File = require("../models/File");
const config = require("config");

class FileService {
	createDir(file) {
		const filePath = `${config.get("filePath")}/${file.user}/${file.path}`;
		return new Promise((resolve, reject) => {
			try {
				if (!fs.existsSync(filePath)) {
					fs.mkdirSync(filePath);
					return resolve({
						status: "error",
						message: "Директория успешно создана"
					});
				} else {
					return reject({
						status: "error",
						message: "Такой файл уже существует"
					})
				}
				
			} catch (error) {
				return reject({ 
					status: "error", 
					message: "Ошибка при создании директории!"
				});
			}
		});
	}

	deleteFile(file) {
		const path = this.getFile(file);
		if (file.type === 'dir') {
			fs.rmdirSync(path);
		} else {
			fs.unlinkSync(path);
		}
	}

	getPath(file) {
		return `${config.get("filePath")}/${file.user.id}/${file.path}`;
	}
}

module.exports = new FileService();
