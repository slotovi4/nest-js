import { FindTopPageDto } from './dto/findTopPage.dto';
import { TopPageService } from './topPage.service';
import { CreateTopPageDto } from './dto';
import { PAGE_NOT_FOUND_ERROR_MESSAGE } from './topPage.constants';

import { IdValidationPipe } from '../pises';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

import {
	Controller,
	Post,
	Body,
	Delete,
	Patch,
	HttpCode,
	Param,
	Get,
	HttpException,
	HttpStatus,
	UsePipes,
	ValidationPipe,
	UseGuards
} from '@nestjs/common';

@Controller('topPage')
export class TopPageController {
	public constructor(private readonly topPageService: TopPageService) {
	}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	public async create(@Body() dto: CreateTopPageDto) {
		return this.topPageService.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	public async get(@Param('id', IdValidationPipe) id: string) {
		const page = await this.topPageService.findById(id);

		if (!page) {
			throw new HttpException(PAGE_NOT_FOUND_ERROR_MESSAGE, HttpStatus.NOT_FOUND);
		}

		return page;
	}

	@Get('byAlias/:alias')
	public async getByAlias(@Param('alias') alias: string) {
		const page = await this.topPageService.findByAlias(alias);

		if (!page) {
			throw new HttpException(PAGE_NOT_FOUND_ERROR_MESSAGE, HttpStatus.NOT_FOUND);
		}

		return page;
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	public async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedPage = await this.topPageService.deleteById(id);

		if (!deletedPage) {
			throw new HttpException(PAGE_NOT_FOUND_ERROR_MESSAGE, HttpStatus.NOT_FOUND);
		}
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	public async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
		const updatedPage = await this.topPageService.updateById(id, dto);

		if (!updatedPage) {
			throw new HttpException(PAGE_NOT_FOUND_ERROR_MESSAGE, HttpStatus.NOT_FOUND);
		}

		return updatedPage;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	public async find(@Body() dto: FindTopPageDto) {
		return this.topPageService.findByCategory(dto.firstCategory);
	}
}
