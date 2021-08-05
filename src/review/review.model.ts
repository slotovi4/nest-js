import { prop } from '@typegoose/typegoose';

import { Types } from 'mongoose';

import type { Base } from '@typegoose/typegoose/lib/defaultClasses';

export class ReviewModel implements Base {

	@prop()
	name: string;

	@prop()
	title: string;

	@prop()
	description: string;

	@prop()
	rating: number;

	@prop()
	productId: Types.ObjectId;

	_id: Base['_id'];
	id: string;
}
