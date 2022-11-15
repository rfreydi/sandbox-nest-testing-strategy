import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BuyersModule } from '../src/buyers/buyers.module';
import { ConfigModule } from '@nestjs/config';
import { BuyersController } from '../src/buyers/buyers.controller';

describe('BuyersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BuyersModule, ConfigModule.forRoot()],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/buyers (GET)', () => {
    return request(app.getHttpServer())
      .get('/buyers')
      .expect(200)
      .expect('This action returns all buyers');
  });

  it('/buyers (POST)', (done) => {
    const buyer: Parameters<BuyersController['create']>[0] = {
      budgetMax: 0,
      budgetMin: 0,
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    };
    request(app.getHttpServer())
      .post('/buyers')
      .send(buyer)
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).toEqual({
          createdAt: expect.any(String),
          email: '',
          firstName: '',
          lastName: '',
          budgetMin: 0,
          budgetMax: 0,
          id: expect.any(String),
        });
        return done();
      });
  });
});
