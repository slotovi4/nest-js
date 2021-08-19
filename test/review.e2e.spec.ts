import { AppModule } from '../src/app.module';
import { REVIEW_NOT_FOUND_MESSAGE } from '../src/review/review.constants';

import { ID_VALIDATION_ERROR_MESSAGE } from '../src/pises';

import { Test } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { Types, disconnect } from 'mongoose';
import * as request from 'supertest';

import type { CreateReviewDto } from '../src/review/dto/createreview.dto';
import type { INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import type { AuthDto } from '../src/auth/dto/auth.dto';

const createUniqueId = () => new Types.ObjectId().toHexString();

const productId = createUniqueId();
const incorrectId = `${createUniqueId()}incorrectId`;

const loginDto: AuthDto = {
	login: 'admin',
	password: '123'
};

const testDto: CreateReviewDto = {
	name: 'Тест',
	title: 'Заголовок',
	description: 'Описание',
	rating: 5,
	productId
};

describe('ReviewController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;
	let authToken: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		const { body } = await request(app.getHttpServer()).post('/auth/login').send(loginDto);

		authToken = body.access_token;
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

	it('review/byProduct/:productId (GET) - incorrect id', async () => {
		return request(app.getHttpServer())
			.get(`/review/byProduct/${incorrectId}`)
			.expect(HttpStatus.BAD_REQUEST, {
				statusCode: HttpStatus.BAD_REQUEST,
				message: ID_VALIDATION_ERROR_MESSAGE
			});
	});

	it('/review/:id (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete(`/review/${createdId}`)
			.set('Authorization', `Bearer ${authToken}`)
			.expect(HttpStatus.OK);
	});

	it('/review/:id (DELETE) - fail', () => {
		return request(app.getHttpServer())
			.delete(`/review/${createUniqueId()}`)
			.set('Authorization', `Bearer ${authToken}`)
			.expect(HttpStatus.NOT_FOUND, {
				statusCode: HttpStatus.NOT_FOUND,
				message: REVIEW_NOT_FOUND_MESSAGE
			});
	});

	it('/review/:id (DELETE) - fail incorrect id', () => {
		return request(app.getHttpServer())
			.delete(`/review/${incorrectId}`)
			.set('Authorization', `Bearer ${authToken}`)
			.expect(HttpStatus.BAD_REQUEST, {
				statusCode: HttpStatus.BAD_REQUEST,
				message: ID_VALIDATION_ERROR_MESSAGE
			});
	});
});
