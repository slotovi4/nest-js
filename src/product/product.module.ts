import { ProductController } from './product.controller';

import { Module } from '@nestjs/common';

@Module({
	controllers: [ProductController]
})
export class ProductModule { }
