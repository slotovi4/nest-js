import { AuthController } from './auth.controller';

import { UserModel } from './user.model';

import { AuthService } from './auth.service';

import { JwtStrategy } from './strategies/jwt.strategy';

import { getJWTConfig } from '../../src/configs/jwt.config';

import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
	controllers: [AuthController],
	imports: [
		TypegooseModule.forFeature([{
			typegooseClass: UserModel,
			schemaOptions: {
				collection: 'User',
				timestamps: true,
			}
		}]),
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig
		}),
		PassportModule
	],
	providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
