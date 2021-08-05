import { ReviewModel } from './review.model';

import { CreateReviewDto } from './dto/createreview.dto';

import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class ReviewService {
	public constructor(@InjectModel(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>) {

	}

	public async create(dto: CreateReviewDto) {
		return this.reviewModel.create(dto);
	}

	public async delete(id: string) {
		return this.reviewModel.findByIdAndDelete(id).exec();
	}

	public async findByProductId(productId: string) {
		return this.reviewModel.find({ productId }).exec();
	}

	public async deleteByProductId(productId: string) {
		return this.reviewModel.deleteMany({ productId }).exec();
	}
}
