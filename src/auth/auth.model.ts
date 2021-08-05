import { prop } from '@typegoose/typegoose';

import type { Base } from '@typegoose/typegoose/lib/defaultClasses';

export class AuthModel implements Base {
	@prop({ unique: true })
	email: string;

	@prop()
	passwordHash: string;

	_id: Base['_id'];
	id: string;
}
