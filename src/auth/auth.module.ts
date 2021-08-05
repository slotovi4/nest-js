import { AuthController } from './auth.controller';

import { AuthModel } from './auth.model';

import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
	controllers: [AuthController],
	imports: [TypegooseModule.forFeature([{
		typegooseClass: AuthModel,
		schemaOptions: {
			collection: 'Auth',
			timestamps: true,
		}
	}])]
})
export class AuthModule { }
