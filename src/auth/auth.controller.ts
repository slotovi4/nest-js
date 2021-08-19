import { AuthDto } from './dto';

import { AuthService } from './auth.service';

import { ALREADY_REGISTERED_ERROR_MESSAGE } from './auth.constants';

import { Controller, HttpCode, Post, Body, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';

@Controller('auth')
export class AuthController {
	public constructor(private readonly authService: AuthService) {

	}

	@UsePipes(new ValidationPipe())
	@Post('register')
	public async register(@Body() dto: AuthDto) {
		const oldUser = await this.authService.findUser(dto.login);

		if (oldUser) {
			throw new HttpException(ALREADY_REGISTERED_ERROR_MESSAGE, HttpStatus.BAD_REQUEST);
		}

		return this.authService.createUser(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	public async login(@Body() { login, password }: AuthDto) {
		const { email } = await this.authService.validateUser(login, password);

		return this.authService.login(email);
	}
}
