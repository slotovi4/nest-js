import { ProductModel } from './product.model';
import { PRODUCT_NOT_FOUND_ERROR_MESSAGE } from './product.constants';
import { ProductService } from './product.service';
import { FindProductDto, CreateProductDto } from './dto';

import { IdValidationPipe } from '../pises';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe,
	HttpStatus,
	UseGuards
} from '@nestjs/common';

@Controller('product')
export class ProductController {
	public constructor(private readonly productService: ProductService) {

	}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	public async create(@Body() dto: CreateProductDto) {
		return this.productService.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	public async get(@Param('id', IdValidationPipe) id: string) {
		const product = await this.productService.findById(id);

		if (!product) {
			throw new HttpException(PRODUCT_NOT_FOUND_ERROR_MESSAGE, HttpStatus.NOT_FOUND);
		}

		return product;
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	public async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedProduct = await this.productService.deleteById(id);

		if (!deletedProduct) {
			throw new HttpException(PRODUCT_NOT_FOUND_ERROR_MESSAGE, HttpStatus.NOT_FOUND);
		}
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	public async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: ProductModel) {
		const updatedProduct = await this.productService.updateById(id, dto);

		if (!updatedProduct) {
			throw new HttpException(PRODUCT_NOT_FOUND_ERROR_MESSAGE, HttpStatus.NOT_FOUND);
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
