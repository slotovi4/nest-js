import { ReviewModel } from './review.model';

import { Post, Controller, Body, Delete, Param, Get } from '@nestjs/common';

@Controller('review')
export class ReviewController {

	@Post('create')
	public async create(@Body() dto: Omit<ReviewModel, '_id'>) {

	}

	@Delete(':id')
	public async delete(@Param('id') id: string) {

	}

	@Get('byProduct/:productId')
	public async getByProduct(@Param('productId') productId: string) {

	}
}
