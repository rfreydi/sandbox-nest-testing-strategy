import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ApiGqlModule } from '../src/api-gql.module';
import { Repository } from 'typeorm';
import { Buyer, Estate, SqlModule, User } from '@nts/infrastructure';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BuyerResolver', () => {
  let app: INestApplication;
  let buyerRepository: Repository<Buyer>; // TODO: use TestingBuilder
  let estateRepository: Repository<Estate>; // TODO: use TestingBuilder
  let userRepository: Repository<User>; // TODO: use TestingBuilder

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiGqlModule, SqlModule],
    }).compile();

    /* TODO: use TestingBuilder */
    buyerRepository = moduleFixture.get(getRepositoryToken(Buyer));
    estateRepository = moduleFixture.get(getRepositoryToken(Estate));
    userRepository = moduleFixture.get(getRepositoryToken(User));
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe(`
  GIVEN a buyer with email "first.last@test.com"
  AND a buyer with email "first.estate@test.com" linked to an estate
  `, () => {
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

      // TODO: split into 2 describes
      const userEstate = userRepository.create();
      userEstate.email = 'first.estate@test.com';
      userEstate.firstName = 'first';
      userEstate.lastName = 'estate';
      userEstate.hash = 'hash';
      const buyerEstate = buyerRepository.create();
      buyerEstate.user = userEstate;
      buyerEstate.budgetMax = 150_000;
      buyerEstate.budgetMin = 10_000;
      const estate = estateRepository.create();
      estate.buyer = buyerEstate;
      estate.status = 'coveted';
      estate.netSeller = 120_000;
      estate.rent = 650;
      await estateRepository.save(estate);
    });

    afterEach(async () => {
      await estateRepository.clear();
      await buyerRepository.clear();
      await userRepository.clear();
      jest.clearAllMocks();
    });

    it(`
    WHEN asking for me as "first.last@test.com"
    THEN must see my information with an empty list of linked estate
    `, async () => {
      // Arrange
      const query = `query me($email: String!) {
      me(email: $email) {
        id
        budgetMax
        budgetMin
        email
        firstName
        lastName
        estates {
          id
        }
      }
    }`;
      const variables = {
        email: 'first.last@test.com',
      };

      // Act
      const res = await request(app.getHttpServer()).post('/graphql').send({
        query,
        variables,
      });

      // Assert
      expect(res.status).toEqual(200);
      expect(res.body).toEqual({
        data: {
          me: {
            id: expect.any(String),
            budgetMax: 150_000,
            budgetMin: 10_000,
            email: 'first.last@test.com',
            firstName: 'first',
            lastName: 'last',
            estates: [],
          },
        },
      });
    });

    it(`
    WHEN asking for me as "first.estate@test.com"
    THEN must see a list composed of one linked estate
    `, async () => {
      // Arrange
      const query = `query meEstates($email: String!) {
      me(email: $email) {
        estates {
          id
          netSeller
          rent
          status
        }
      }
    }`;
      const variables = {
        email: 'first.estate@test.com',
      };

      // Act
      const res = await request(app.getHttpServer()).post('/graphql').send({
        query,
        variables,
      });

      // Assert
      expect(res.status).toEqual(200);
      expect(res.body).toEqual({
        data: {
          me: {
            estates: [
              {
                id: expect.any(String),
                netSeller: 120_000,
                rent: 650,
                status: 'coveted',
              },
            ],
          },
        },
      });
    });

    it(`
    WHEN updating my information as "first.last@test.com"
    THEN must see updated data
    `, async () => {
      // Arrange
      const query = `mutation updateBuyer($email: String!, $updateBuyerData: UpdateBuyerInput!) {
      updateBuyer(email: $email, updateBuyerData: $updateBuyerData) {
        id
        budgetMax
        budgetMin
        email
        firstName
        lastName
        estates {
          id
        }
      }
    }`;
      const variables = {
        email: 'first.last@test.com',
        updateBuyerData: {
          budgetMax: 250_000,
          budgetMin: 0,
          firstName: 'second',
          lastName: 'lastOne',
        },
      };

      // Act
      const res = await request(app.getHttpServer()).post('/graphql').send({
        query,
        variables,
      });

      // Assert
      expect(res.status).toEqual(200);
      expect(res.body).toEqual({
        data: {
          updateBuyer: {
            id: expect.any(String),
            budgetMax: 250_000,
            budgetMin: 0,
            email: 'first.last@test.com',
            firstName: 'second',
            lastName: 'lastOne',
            estates: [],
          },
        },
      });
    });
  });
});
