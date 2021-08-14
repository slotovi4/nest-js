import { CreateReviewDto } from './dto/createreview.dto';

import { ReviewService } from './review.service';

import { REVIEW_NOT_FOUND_MESSAGE } from './review.constants';

import {
	Post,
	Controller,
	Body,
	Delete,
	Param,
	Get,
	HttpException,
	HttpStatus,
	UsePipes,
	ValidationPipe,
	UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('review')
export class ReviewController {
	public constructor(private readonly reviewService: ReviewService) {

	}

	@UsePipes(new ValidationPipe())
	@Post('create')
	public async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	public async delete(@Param('id') id: string) {
		const deletedDoc = await this.reviewService.delete(id);

		if (!deletedDoc) {
			throw new HttpException(REVIEW_NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
		}
	}

	@Get('byProduct/:productId')
	public async getByProduct(@Param('productId') productId: string) {
		return this.reviewService.findByProductId(productId);
	}
}
