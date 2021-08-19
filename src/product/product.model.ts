import { prop } from '@typegoose/typegoose';

import type { Base } from '@typegoose/typegoose/lib/defaultClasses';
import type { IProductCharacteristic } from './dto';

class ProductCharacteristic implements IProductCharacteristic {

	@prop()
	name: string;

	@prop()
	value: string;
}

export class ProductModel implements Base {

	@prop()
	image: string;

	@prop()
	title: string;

	@prop()
	price: number;

	@prop()
	oldPrice?: number;

	@prop()
	credit: number;

	@prop()
	description: string;

	@prop()
	advantages: string;

	@prop()
	disAdvantages: string;

	@prop({ type: () => [String] })
	categories: string[];

	@prop({ type: () => [String] })
	tags: string[];

	@prop({ type: () => [ProductCharacteristic], _id: false })
	characteristics: ProductCharacteristic[];

	_id: Base['_id'];
	id: string;
}
