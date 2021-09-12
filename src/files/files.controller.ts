import { FileElementResponse } from './dto/file-element.response';
import { FilesService } from './files.service';
import { MFile } from './mfile.class';

import { JwtAuthGuard } from '../auth/guards/jwt.guard';

import { Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
	public constructor(private readonly filesService: FilesService) {

	}

	@Post('upload')
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('files'))
	public async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponse[]> {
		const saveArray: MFile[] = [new MFile(file)];

		if (file.mimetype.includes('image')) {
			const webpBuffer = await this.filesService.convertToWebP(file.buffer);

			saveArray.push(new MFile({
				originalname: `${file.originalname.split('.')[0]}.webp`,
				buffer: webpBuffer
			}));
		}

		return this.filesService.saveFiles(saveArray);
	}
}
