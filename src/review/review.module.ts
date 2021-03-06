import { ReviewController } from './review.controller';

import { ReviewModel } from './review.model';

import { ReviewService } from './review.service';

import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
	controllers: [ReviewController],
	imports: [TypegooseModule.forFeature([{
		typegooseClass: ReviewModel,
		schemaOptions: {
			collection: 'Review',
			timestamps: true,
		}
	}])],
	providers: [ReviewService]
})
export class ReviewModule { }
