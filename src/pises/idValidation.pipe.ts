/* eslint-disable class-methods-use-this */
import { ID_VALIDATION_ERROR_MESSAGE } from './idValidation.constants';

import { BadRequestException, Injectable } from '@nestjs/common';

import { Types } from 'mongoose';

import type { PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class IdValidationPipe implements PipeTransform {
	public transform(value: string, metadata: ArgumentMetadata) {
		if (metadata.type !== 'param') {
			return value;
		}

		if (!Types.ObjectId.isValid(value)) {
			throw new BadRequestException(ID_VALIDATION_ERROR_MESSAGE);
		}

		return value;
	}
}
