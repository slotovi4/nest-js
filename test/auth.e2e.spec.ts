import { AppModule } from '../src/app.module';

import {
	ALREADY_REGISTERED_ERROR_MESSAGE,
	USER_NOT_FOUND_ERROR_MESSAGE,
	WRONG_PASSWORD_ERROR_MESSAGE
} from '../src/auth/auth.constants';

import { Test } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';

import { disconnect } from 'mongoose';

import * as request from 'supertest';

import type { INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import type { AuthDto } from '../src/auth/dto/auth.dto';

const existLoginDto: AuthDto = {
	login: 'admin',
	password: '123'
};

const wrongLoginDto: AuthDto = {
	login: 'admin',
	password: '1234'
};

const notExistentLoginDto: AuthDto = {
	login: 'notCreatedAdmin',
	password: '123'
};

describe('AuthController (e2e)', () => {
	let app: INestApplication;

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

	it('/auth/login (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(existLoginDto)
			.expect(HttpStatus.OK)
			.then(({ body }) => {
				expect(body.access_token).toBeDefined();
			});
	});

	it('/auth/login (POST) - fail', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(wrongLoginDto)
			.expect(HttpStatus.UNAUTHORIZED, {
				statusCode: HttpStatus.UNAUTHORIZED,
				message: WRONG_PASSWORD_ERROR_MESSAGE,
			});
	});

	it('/auth/login (POST) - fail/undefined', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(notExistentLoginDto)
			.expect(HttpStatus.UNAUTHORIZED, {
				statusCode: HttpStatus.UNAUTHORIZED,
				message: USER_NOT_FOUND_ERROR_MESSAGE,
			});
	});

	it('/auth/register (POST) - fail', () => {
		return request(app.getHttpServer())
			.post('/auth/register')
			.send(existLoginDto)
			.expect(HttpStatus.BAD_REQUEST, {
				statusCode: HttpStatus.BAD_REQUEST,
				message: ALREADY_REGISTERED_ERROR_MESSAGE,
			});
	});
});
