import { AuthDto } from './dto/auth.dto';

import { AuthService } from './auth.service';

import { ALREADY_REGISTERED_ERROR_MESSAGE } from './auth.constants';

import { Controller, HttpCode, Post, Body, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
	public constructor(private readonly authService: AuthService) {

	}

	@UsePipes(new ValidationPipe())
	@Post('register')
	public async register(@Body() dto: AuthDto) {
		const oldUser = await this.authService.findUser(dto.login);

		if (oldUser) {
			throw new BadRequestException(ALREADY_REGISTERED_ERROR_MESSAGE);
		}

		return this.authService.createUser(dto);
	}

	@HttpCode(200)
	@Post('register')
	public async login(@Body() dto: AuthDto) {

	}
}
