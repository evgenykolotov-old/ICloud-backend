import fs from 'fs';
import config from 'config';
import { ServerResponse } from '../types';
import { File } from '../models/File';

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

	private getPath(file: File): string {
		return `${config.get("filePath")}/${file.user.id}/${file.path}`;
	}
}

export default new FileService();
