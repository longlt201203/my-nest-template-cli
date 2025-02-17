export default `
import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import * as unzipper from "unzipper";

@Injectable()
export class FrontService {
	async deploy(file: Express.Multer.File) {
		const uploadsFolderPath = "uploads";
		const filePath = path.join(uploadsFolderPath, file.filename);
		const publicFolderPath = "public";
		try {
			if (fs.existsSync(publicFolderPath)) {
				const files = fs.readdirSync(publicFolderPath);
				for (const file of files) {
					const tmpPath = path.join(publicFolderPath, file);
					const stats = fs.statSync(tmpPath);
					if (stats.isDirectory()) {
						fs.rmSync(tmpPath, { recursive: true });
					} else {
						fs.unlinkSync(tmpPath);
					}
				}
			}
			const dir = await unzipper.Open.file(filePath);
			await dir.extract({ path: publicFolderPath });
		} catch (err) {
			console.log(err);
		}

		fs.rmSync(uploadsFolderPath, { recursive: true });
	}
}
`;
