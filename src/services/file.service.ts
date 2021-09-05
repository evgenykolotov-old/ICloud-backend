import fs from 'fs';
import config from 'config';
import { ServerResponse } from '../types/index';
import { File } from '../models/File';
import { User } from '../models/User';

class FileService {
	public createDir(file: File): Promise<ServerResponse> {
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

	public deleteFile(file: File): void {
		const path = this.getPath(file);
		if (file.type === 'dir') {
			fs.rmdirSync(path);
		} else {
			fs.unlinkSync(path);
		}
	}

	public getPath(file: File): string {
		return `${config.get("filePath")}/${file.user}/${file.path}`;
	}
}

export default new FileService();
