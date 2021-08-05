import { TopPageController } from './top-page.controller';

import { TopPageModel } from './top-page.model';

import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
	controllers: [TopPageController],
	imports: [TypegooseModule.forFeature([{
		typegooseClass: TopPageModel,
		schemaOptions: {
			collection: 'TopPage',
			timestamps: true,
		}
	}])]
})
export class TopPageModule { }
