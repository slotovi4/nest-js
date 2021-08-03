export enum ETopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export class TopPageModel {
	_id: string;
	_firstCategory: ETopLevelCategory;
	_secondCategory: string;
	_title: string;
	_category: string;
	_hh?: {
		count: number;
		juniorSalary: number;
		middleSalary: number;
		seniorSalary: number;
	};
	_advantages: {
		title: string;
		description: string;
	}[];
	_seoText: string;
	_tagsTitle: string;
	_tags: string[];
}
