import { ETopLevelCategory, TopPageModel } from './topPage.model';

import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';

import type { ModelType } from '@typegoose/typegoose/lib/types';
import type { CreateTopPageDto } from './dto';

@Injectable()
export class TopPageService {
	public constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) {

	}

	public async create(dto: CreateTopPageDto) {
		return this.topPageModel.create(dto);
	}

	public async findById(id: string) {
		return this.topPageModel.findById(id).exec();
	}

	public async findByAlias(alias: string) {
		return this.topPageModel.findOne({ alias }).exec();
	}

	public async findByCategory(firstCategory: ETopLevelCategory) {
		return this.topPageModel.find({ firstCategory }, {
			alias: 1,
			secondCategory: 1,
			title: 1
		}).exec();
	}

	public async deleteById(id: string) {
		return this.topPageModel.findByIdAndDelete(id).exec();
	}

	public async updateById(id: string, dto: CreateTopPageDto) {
		return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}
}
