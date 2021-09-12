import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { rootPath } from './files.constants';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath,
			serveRoot: '/static'
		})
	],
	controllers: [FilesController],
	providers: [FilesService],
})
export class FilesModule { }
