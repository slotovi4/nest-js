/* eslint-disable class-methods-use-this */
import { FileElementResponse } from './dto/file-element.response';
import { MFile } from './mfile.class';
import { rootPath } from './files.constants';

import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';

@Injectable()
export class FilesService {
	public async saveFiles(files: MFile[]): Promise<FileElementResponse[]> {
		const dateFolder = format(new Date(), 'yyyy-MM-dd');
		const uploadFolder = `${rootPath}/${dateFolder}`;

		await ensureDir(uploadFolder);

		const fileResponse: FileElementResponse[] = [];

		for (const file of files) {
			await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);

			fileResponse.push({
				url: `${dateFolder}/${file.originalname}`,
				name: file.originalname
			});
		}

		return fileResponse;
	}

	public convertToWebP(fileBuffer: Buffer) {
		return sharp(fileBuffer).webp().toBuffer();
	}
}
