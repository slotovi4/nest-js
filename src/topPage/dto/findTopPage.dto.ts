import { ETopLevelCategory } from '../topPage.model';

import { IsEnum } from 'class-validator';

export class FindTopPageDto {

	@IsEnum(ETopLevelCategory)
	firstCategory: ETopLevelCategory;
}
