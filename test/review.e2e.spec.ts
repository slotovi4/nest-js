import { AppModule } from './../src/app.module';

import { REVIEW_NOT_FOUND_MESSAGE } from '../src/review/review.constants';

import { Test } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';

import { Types, disconnect } from 'mongoose';

import * as request from 'supertest';

import type { CreateReviewDto } from 'src/review/dto/createreview.dto';

import type { INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';

const createUniqueId = () => new Types.ObjectId().toHexString();

const productId = createUniqueId();

const testDto: CreateReviewDto = {
	name: 'Тест',
	title: 'Заголовок',
	description: 'Описание',
	rating: 5,
	productId
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterAll(() => {
		disconnect();
	});

	it('/review/create (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send(testDto)
			.expect(HttpStatus.CREATED)
			.then(({ body }) => {
				createdId = body._id;

				expect(createdId).toBeDefined();
			});
	});

	it('/review/create (POST) - fail', () => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send({
				...testDto,
				rating: 0
			})
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('review/byProduct/:productId (GET) - success', async () => {
		return request(app.getHttpServer())
			.get(`/review/byProduct/${productId}`)
			.expect(HttpStatus.OK)
			.then(({ body }) => {
				expect(body.length).toBe(1);
			});
	});

	it('review/byProduct/:productId (GET) - fail', async () => {
		return request(app.getHttpServer())
			.get(`/review/byProduct/${createUniqueId()}`)
			.expect(HttpStatus.OK)
			.then(({ body }) => {
				expect(body.length).toBe(0);
			});
	});

	it('/review/:id (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete(`/review/${createdId}`)
			.expect(HttpStatus.OK);
	});

	it('/review/:id (DELETE) - fail', () => {
		return request(app.getHttpServer())
			.delete(`/review/${createUniqueId()}`)
			.expect(HttpStatus.NOT_FOUND, {
				statusCode: HttpStatus.NOT_FOUND,
				message: REVIEW_NOT_FOUND_MESSAGE
			});
	});
});
