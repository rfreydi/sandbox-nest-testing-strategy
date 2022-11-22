import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ApiRestModule } from '../src/api-rest.module';
import { BuyersController } from '../src/buyers/buyers.controller';
import { Repository } from 'typeorm';
import { Buyer, SqlModule, User } from '@nts/infrastructure';

describe('BuyersController (e2e)', () => {
  let app: INestApplication;
  let buyerRepository: Repository<Buyer>; // TODO: use TestingBuilder
  let userRepository: Repository<User>; // TODO: use TestingBuilder

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiRestModule, SqlModule],
    }).compile();

    /* TODO: use TestingBuilder */
    buyerRepository = moduleFixture.get('BuyerRepository');
    userRepository = moduleFixture.get('UserRepository');
    app = moduleFixture.createNestApplication();
    await app.init();

    // Arrange
    /* TODO: use TestingBuilder */
    const user = userRepository.create();
    user.email = 'first.last@test.com';
    user.firstName = 'first';
    user.lastName = 'last';
    user.hash = 'hash';
    const buyer = buyerRepository.create();
    buyer.user = user;
    buyer.budgetMax = 150_000;
    buyer.budgetMin = 10_000;
    await buyerRepository.save(buyer);
  });

  it('/buyers (GET)', async () => {
    // Act
    const res = await request(app.getHttpServer()).get('/buyers');

    // Assert
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([
      {
        id: expect.any(String),
        budgetMax: 150_000,
        budgetMin: 10_000,
        email: 'first.last@test.com',
        firstName: 'first',
        lastName: 'last',
        createdAt: expect.any(String),
      },
    ]);
  });

  it('/buyers/:email (GET)', async () => {
    // Arrange
    const email = 'first.last@test.com';

    // Act
    const res = await request(app.getHttpServer()).get(`/buyers/${email}`);

    // Assert
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      budgetMax: 150_000,
      budgetMin: 10_000,
      email: 'first.last@test.com',
      firstName: 'first',
      lastName: 'last',
      createdAt: expect.any(String),
    });
  });

  it('/buyers (POST)', async () => {
    // Arrange
    const buyer: Parameters<BuyersController['create']>[0] = {
      budgetMax: 0,
      budgetMin: 0,
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    };

    // Act
    const res = await request(app.getHttpServer()).post('/buyers').send(buyer);

    // Assert
    expect(res.status).toEqual(201);
    expect(res.body).toEqual({
      createdAt: expect.any(String),
      email: '',
      firstName: '',
      lastName: '',
      budgetMin: 0,
      budgetMax: 0,
      id: expect.any(String),
    });
  });

  it('/buyers/:email/meet (POST)', async () => {
    // Arrange
    const email = 'first.last@test.com';
    const iso = new Date('2022-11-21').toISOString();

    // Act
    const res = await request(app.getHttpServer())
      .post(`/buyers/${email}/meet`)
      .send({
        iso,
      });

    // Assert
    expect(res.status).toEqual(201);
    expect(res.body).toEqual({
      createdAt: expect.any(String),
      email,
      id: expect.any(Number),
      meeterId: expect.any(String),
    });
  });
});
