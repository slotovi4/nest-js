import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './product.model';
import { CreateProductDto } from './dto/createProduct.dto';
import { PRODUCT_NOT_FOUND_ERROR_MESSAGE } from './product.constants';

import { ProductService } from './product.service';

import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { IdValidationPipe } from 'src/pises';


@Controller('product')
export class ProductController {
	public constructor(private readonly productService: ProductService) {

	}

	@Post('create')
	public async create(@Body() dto: CreateProductDto) {
		return this.productService.create(dto);
	}

	@Get(':id')
	public async get(@Param('id', IdValidationPipe) id: string) {
		const product = await this.productService.findById(id);

		if (!product) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR_MESSAGE);
		}

		return product;
	}

	@Delete(':id')
	public async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedProduct = await this.productService.deleteById(id);

		if (!deletedProduct) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR_MESSAGE);
		}
	}

	@Patch(':id')
	public async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: ProductModel) {
		const updatedProduct = await this.productService.updateById(id, dto);

		if (!updatedProduct) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR_MESSAGE);
		}

		return updatedProduct;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	public async find(@Body() dto: FindProductDto) {
		return this.productService.findWithReviews(dto);
	}
}
