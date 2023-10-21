import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ApiRestModule } from '../src/api-rest.module';
import { BuyersController } from '../src/buyers/buyers.controller';
import { Repository } from 'typeorm';
import { Buyer, Meet, SqlModule, User } from '@nts/infrastructure';
import { TrackService } from '@nts/external';
import { getRepositoryToken } from '@nestjs/typeorm';
import { internalToken } from '../../../infrastructure/internal/internal.token';

describe('BuyersController', () => {
  let app: INestApplication;
  let buyerRepository: Repository<Buyer>; // TODO: use TestingBuilder
  let meetRepository: Repository<Meet>; // TODO: use TestingBuilder
  let userRepository: Repository<User>; // TODO: use TestingBuilder
  let trackService: TrackService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiRestModule, SqlModule],
    }).compile();

    /* TODO: use TestingBuilder */
    buyerRepository = moduleFixture.get(getRepositoryToken(Buyer));
    meetRepository = moduleFixture.get(getRepositoryToken(Meet, internalToken));
    userRepository = moduleFixture.get(getRepositoryToken(User));
    trackService = moduleFixture.get(TrackService);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GIVEN the buyer with email "first.last@test.com"', () => {
    beforeEach(async () => {
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

    afterEach(async () => {
      await meetRepository.clear();
      await buyerRepository.clear();
      await userRepository.clear();
      jest.restoreAllMocks();
    });

    it(`
    WHEN asking all buyers
    THEN must see a list composed of one buyer
    `, async () => {
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

    it(`
    WHEN asking buyer "first.last@test.com"
    THEN must see the buyer
    AND track it
    `, async () => {
      // Arrange
      const email = 'first.last@test.com';
      const track = jest.spyOn(trackService, 'track');

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
      expect(track).toHaveBeenCalledWith({
        email: 'first.last@test.com',
        type: 'findOne',
      });
    });

    it(`
    WHEN creating the buyer "first.last@test.com"
    THEN must get an error
    AND NOT track it
    `, async () => {
      // Arrange
      const buyer: Parameters<BuyersController['create']>[0] = {
        email: 'first.last@test.com',
        firstName: 'first',
        lastName: 'last',
        budgetMax: 150_000,
        budgetMin: 0,
        password: 'pwd',
      };
      const track = jest.spyOn(trackService, 'track');

      // Act
      const res = await request(app.getHttpServer())
        .post('/buyers')
        .send(buyer);

      // Assert
      expect(res.status).toEqual(500);
      expect(res.body).toEqual({
        message: 'Internal server error',
        statusCode: 500,
      });
      expect(track).not.toHaveBeenCalled();
    });

    it(`
    WHEN creating the buyer "second.last@test.com"
    THEN must see the buyer created
    AND track it
    `, async () => {
      // Arrange
      const buyer: Parameters<BuyersController['create']>[0] = {
        email: 'second.last@test.com',
        firstName: 'second',
        lastName: 'last',
        budgetMax: 150_000,
        budgetMin: 0,
        password: 'pwd',
      };
      const track = jest.spyOn(trackService, 'track');

      // Act
      const res = await request(app.getHttpServer())
        .post('/buyers')
        .send(buyer);

      // Assert
      expect(res.status).toEqual(201);
      expect(res.body).toEqual({
        createdAt: expect.any(String),
        email: 'second.last@test.com',
        firstName: 'second',
        lastName: 'last',
        budgetMin: 0,
        budgetMax: 150_000,
        id: expect.any(String),
      });
      expect(track).toHaveBeenCalledWith({
        email: 'second.last@test.com',
        type: 'create',
      });
    });

    it(`
    WHEN taking a meeting for the buyer "first.last@test.com"
    THEN must have meeting booked
    `, async () => {
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

    it(`
    GIVEN a meet already booked
    WHEN taking a meeting for the buyer
    AND before the one already booked
    THEN must see an error
    `, async () => {
      // Arrange
      const email = 'first.last@test.com';
      const earlyIso = new Date('2022-11-21').toISOString();
      const lateIso = new Date('2022-11-22').toISOString();
      await request(app.getHttpServer()).post(`/buyers/${email}/meet`).send({
        iso: lateIso,
      });

      // Act
      const res = await request(app.getHttpServer())
        .post(`/buyers/${email}/meet`)
        .send({
          iso: earlyIso,
        });

      expect(res.status).toEqual(500);
      expect(res.body).toEqual({
        message: 'Internal server error',
        statusCode: 500,
      });
    });
  });
});
