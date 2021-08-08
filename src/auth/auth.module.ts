import { AuthController } from './auth.controller';

import { UserModel } from './user.model';

import { AuthService } from './auth.service';

import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
	controllers: [AuthController],
	imports: [TypegooseModule.forFeature([{
		typegooseClass: UserModel,
		schemaOptions: {
			collection: 'User',
			timestamps: true,
		}
	}])],
	providers: [AuthService]
})
export class AuthModule { }
