import { SitemapController } from './sitemap.controller';

import { TopPageModule } from '../topPage/topPage.module';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
	controllers: [SitemapController],
	imports: [TopPageModule, ConfigModule]
})
export class SitemapModule { }
