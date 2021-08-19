import { AuthDto } from './dto';

import { UserModel } from './user.model';

import { USER_NOT_FOUND_ERROR_MESSAGE, WRONG_PASSWORD_ERROR_MESSAGE } from './auth.constants';

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { genSalt, hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	public constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
		private readonly jwtService: JwtService
	) {

	}

	public async createUser(dto: AuthDto) {
		const salt = await genSalt(10);
		const newUser = new this.userModel({
			email: dto.login,
			passwordHash: await hash(dto.password, salt)
		});

		return newUser.save();
	}

	public async findUser(email: string) {
		return this.userModel.findOne({ email }).exec();
	}

	public async validateUser(email: string, password: string): Promise<Pick<UserModel, 'email'>> {
		const user = await this.findUser(email);

		if (!user) {
			throw new HttpException(USER_NOT_FOUND_ERROR_MESSAGE, HttpStatus.UNAUTHORIZED);
		}

		const isCorrectPassword = await compare(password, user.passwordHash);

		if (!isCorrectPassword) {
			throw new HttpException(WRONG_PASSWORD_ERROR_MESSAGE, HttpStatus.UNAUTHORIZED);
		}

		return {
			email: user.email
		};
	}

	public async login(email: string) {
		const payload = { email };

		return {
			access_token: await this.jwtService.signAsync(payload)
		};
	}
}
