import { CreateReviewDto } from './dto/createreview.dto';

import { ReviewService } from './review.service';

import { REVIEW_NOT_FOUND_MESSAGE } from './review.constants';

import { UserEmail } from '../decorators/userEmail.decorator';

import { JwtAuthGuard } from '../auth/guards/jwt.guard';

import { IdValidationPipe } from '../pises';

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
	public async delete(@Param('id', IdValidationPipe) id: string, @UserEmail() email: string) {
		const deletedDoc = await this.reviewService.delete(id);

		console.log(email);

		if (!deletedDoc) {
			throw new HttpException(REVIEW_NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
		}
	}

	@Get('byProduct/:productId')
	public async getByProduct(@Param('productId', IdValidationPipe) productId: string) {
		return this.reviewService.findByProductId(productId);
	}
}
