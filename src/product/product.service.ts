import { ProductModel } from './product.model';

import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';

import type { CreateProductDto } from './dto/createProduct.dto';
import type { ModelType } from '@typegoose/typegoose/lib/types';
import type { FindProductDto } from './dto/find-product.dto';
import type { ReviewModel } from '../../src/review/review.model';

@Injectable()
export class ProductService {
	public constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) {

	}

	public async create(dto: CreateProductDto) {
		return this.productModel.create(dto);
	}

	public async findById(id: string) {
		return this.productModel.findById(id).exec();
	}

	public async deleteById(id: string) {
		return this.productModel.findByIdAndDelete(id).exec();
	}

	public async updateById(id: string, dto: CreateProductDto) {
		return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	public findWithReviews({ limit, category }: FindProductDto) {
		const newReviewField = 'reviews';
		const newReviewCountField = 'reviewCount';
		const newReviewAvgField = 'reviewAvg';

		return this.productModel.aggregate([
			{
				$match: {
					categories: category
				}
			},
			{
				$sort: {
					_id: 1
				}
			},
			{
				$limit: limit
			},
			{
				$lookup: {
					from: 'Review',
					localField: '_id',
					foreignField: 'productId',
					as: newReviewField
				}
			},
			{
				$addFields: {
					[newReviewCountField]: { $size: `$${newReviewField}` },
					[newReviewAvgField]: { $avg: `$${newReviewField}.rating` }
				}
			}
		]).exec() as (ProductModel & {
			[newReviewField]: ReviewModel[];
			[newReviewCountField]: number;
			[newReviewAvgField]: number;
		})[];
	}
}
