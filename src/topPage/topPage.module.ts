import { TopPageController } from './topPage.controller';
import { TopPageModel } from './topPage.model';
import { TopPageService } from './topPage.service';

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
	}])],
	providers: [TopPageService]
})
export class TopPageModule { }
