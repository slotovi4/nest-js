/* eslint-disable class-methods-use-this */
import { ID_VALIDATION_ERROR_MESSAGE } from './idValidation.constants';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Types } from 'mongoose';

import type { PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class IdValidationPipe implements PipeTransform {
	public transform(value: string, metadata: ArgumentMetadata) {
		if (metadata.type !== 'param') {
			return value;
		}

		if (!Types.ObjectId.isValid(value)) {
			throw new HttpException(ID_VALIDATION_ERROR_MESSAGE, HttpStatus.BAD_REQUEST);
		}

		return value;
	}
}
