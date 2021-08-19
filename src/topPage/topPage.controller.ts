import { FindTopPageDto } from './dto/findTopPage.dto';
import { TopPageModel } from './topPage.model';

import { Controller, Post, Body, Delete, Patch, HttpCode, Param, Get } from '@nestjs/common';

@Controller('top-page')
export class TopPageController {

	@Post('create')
	public async create(@Body() dto: Omit<TopPageModel, '_id'>) {

	}

	@Get(':id')
	public async get(@Param('id') id: string) {

	}

	@Delete(':id')
	public async delete(@Param('id') id: string) {

	}

	@Patch(':id')
	public async patch(@Param('id') id: string, @Body() dto: TopPageModel) {

	}

	@HttpCode(200)
	@Post()
	public async find(@Body() dto: FindTopPageDto) {

	}
}