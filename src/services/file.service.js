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
				}
				
			} catch (error) {
				return reject({ 
					status: "error", 
					message: "Ошибка при создании директории!"
				});
			}
		});
	}
}

module.exports = new FileService();
