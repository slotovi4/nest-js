import { CATEGORY_URL } from './sitemap.constants';

import { TopPageService } from '../topPage/topPage.service';

import { Controller, Get, Header } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Builder } from 'xml2js';
import { subDays, format } from 'date-fns';

@Controller('sitemap')
export class SitemapController {
	domain: string;

	public constructor(
		private readonly topPageService: TopPageService,
		private readonly configService: ConfigService
	) {
		this.domain = this.configService.get('DOMAIN') ?? '';
	}

	@Get('xml')
	@Header('content-type', 'text/xml')
	public async sitemap() {
		const formatString = 'yyyy-MM-dd\'T\'HH:mm:00.000xxx';
		let response = [{
			loc: this.domain,
			lastmod: format(subDays(new Date(), 1), formatString),
			changefreq: 'daily',
			priority: '1.0'
		},
		{
			loc: `${this.domain}/courses`,
			lastmod: format(subDays(new Date(), 1), formatString),
			changefreq: 'daily',
			priority: '1.0'
		}
		];

		const pages = await this.topPageService.findAll();
		response = response.concat(pages.map(page => ({
			loc: `${this.domain}/${CATEGORY_URL[page.firstCategory]}/${page.alias}`,
			lastmod: format(new Date(page.updatedAt ?? new Date()), formatString),
			changefreq: 'weekly',
			priority: '0.7'
		})));

		const builder = new Builder({
			xmldec: {
				version: '1.0',
				encoding: 'UTF-8'
			}
		});

		return builder.buildObject({
			urlset: {
				$: {
					xmls: 'https://www.sitemaps.org/schemas/sitemap/0.9'
				},
				url: response
			}
		});
	}
}
