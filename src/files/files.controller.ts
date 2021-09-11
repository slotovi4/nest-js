import { FileElementResponse } from './dto/file-element.response';

import { JwtAuthGuard } from '../auth/guards/jwt.guard';

import { Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {

	@Post('upload')
	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('files'))
	public async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponse[]> {

	}
}
