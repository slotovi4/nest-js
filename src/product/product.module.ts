import { ProductController } from './product.controller';

import { ProductModel } from './product.model';

import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
	controllers: [ProductController],
	imports: [TypegooseModule.forFeature([{
		typegooseClass: ProductModel,
		schemaOptions: {
			collection: 'Product',
			timestamps: true,
		}
	}])]
})
export class ProductModule { }
