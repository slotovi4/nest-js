import { prop } from '@typegoose/typegoose';

import type { Base } from '@typegoose/typegoose/lib/defaultClasses';

export class HHData {

	@prop()
	count: number;

	@prop()
	juniorSalary: number;

	@prop()
	middleSalary: number;

	@prop()
	seniorSalary: number;
}

export class TopPageAdvantage {

	@prop()
	title: string;

	@prop()
	description: string;
}

export enum ETopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export class TopPageModel implements Base {

	@prop({ enum: ETopLevelCategory })
	firstCategory: ETopLevelCategory;

	@prop()
	secondCategory: string;

	@prop({ unique: true })
	alias: string;

	@prop()
	title: string;

	@prop()
	category: string;


	@prop({ type: () => HHData })
	hh?: HHData;

	@prop({ type: () => [TopPageAdvantage] })
	advantages: TopPageAdvantage[];

	@prop()
	seoText: string;

	@prop()
	tagsTitle: string;

	@prop({ type: () => [String] })
	tags: string[];

	_id: Base['_id'];
	id: string;
}
