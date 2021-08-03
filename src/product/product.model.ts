export class ProductModel {
	_id: string;
	_image: string;
	_title: string;
	_price: number;
	_oldPrice: number;
	_credit: number;
	_calculatedRating: number;
	_description: string;
	_advantages: string;
	_disAdvantages: string;
	_categories: string[];
	_tags: string;
	_characteristics: {
		[key: string]: string;
	};
}
