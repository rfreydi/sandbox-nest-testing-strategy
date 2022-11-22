# Sandbox - NestJS Testing Strategy

## Description

This repository is created to provide an environment that show up common testing technique at Masteos without being alternate frequently.

## Installation

```bash
$ npm ci
```

Create `.env.development.local` and/or `.env.development` and/or `.env.production` file(s):

```
TYPE=
HOST=
PORT=
USERNAME=
PASSWORD=
DATABASE=
CLUSTER=
```

Applications will take - _for each variable_ - the first one found in files following the order specified above. Cluster is optional if you run locally.

## Running the app

```bash
# development
$ npm run start api-gql
$ npm run start api-rest

# watch mode
$ npm run start:dev api-gql
$ npm run start:dev api-rest

# production mode
$ npm run start:prod api-gql
$ npm run start:prod api-rest
```

## Test

Create `.env.test` file:

```
TYPE=better-sqlite3
DATABASE=:memory:
```

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e:rest
$ npm run test:e2e:gql

# test coverage
$ npm run test:cov
```

## Wording

### End to End

Naming: *don't apply here.*

An end to end is a test run by the frontend to these APIs.


### Integration

Naming: `*.integration.ts`

Test that verify resolver/controller calls and response.

`Integration` tests must not mock implementation as they'll have proper environment variables or `Fakes`.
A `Fake` is a code that mimic driver/sdk that you rely on programmatically.
It enables NestJS to inject the `Fake` instead of the real driver during testing and therefore automatically mock external dependencies (side effects) only.

_You can still verify that a side effect as been properly performed if it's part of the defined business behavior, but don't just verify that a method as been called, you'll perform implementation testing and not behavior testing._

### Unit

Naming: `*.spec.ts`

Test that mock every side effect of the function and focus only on the logic of the function itself

_Ex: a function that have 3 "get" calls and do an addition, then the 3 "get" must be mocked and only the addition will be covered._

## Priorities

Focus on full `integration` tests.

If you write `unit` tests, they should not overlap with integration testing. 
It doesn't give any benefit to create a unit test on a part that is already covered by integration one.

For example, as resolver/controller should be fully covered by integration, there should not need to create dedicated `*.spec.ts` file.
_(If you have a doubt, rely on `test:cov` to know when you need to)_

Therefore, they're optional but still relevant for:
- edge-case like throw, "impossible" case that should not happen, ...
- heavy calculation performed
- almost all utils that have mostly no dependencies

## How-to

Here are files that you can look if you want to have some example for particular use-case.

### Integration

- `*.resolver.ts`: [buyers.integration.ts (gql)](/apps/api-gql/test/buyers.integration.ts)
- `*.controller.ts`: [buyers.integration.ts (rest)](/apps/api-rest/test/buyers.integration.ts)

### Unit

- `*.service.ts` that have `0` dependency: [computed.service.spec.ts](/libs/computed/src/computed.service.spec.ts)
- `*.service.ts` that have `1..*` dependencies: [track.service.spec.ts](/libs/external/src/track/track.service.spec.ts)
- `*.service.ts` that rely on `@InjectRepository` or `@InjectModel`: [meet.service.spec.ts](/libs/internal/src/meet/meet.service.spec.ts)
- `*.(service|adapter).ts` that rely on an external `sdk` or `driver`: [track.service.spec.ts](/libs/external/src/track/track.service.spec.ts) + [external.module.ts](/libs/external/src/external.module.ts) + [tracker.fake.ts](/libs/external/src/dist/tracker.fake.ts)
- `*.adapter.ts` that do mapping: [sql-user.adapter.spec.ts](/infrastructure/sql/sql-user/sql-user.adapter.spec.ts)

## FAQ

### I need to implement tests on a particular use-case, but there is no example implemented here ?

If you have a new use-case that we did not manage yet, refer to the testing strategy stakeholders to handle it,
and a simplified example will be created here to broadcast the knowledge for everyone.
_(Ask your Team Manager who are current testing strategy stakeholders)_

### I would like to change one of our convention, how can I do it ?

Nothing is immutable, rules and techniques enforced should be challenged and evolved regarding new tooling and new arrivals.
If you want to propose a new way to handle some testing cases, you can create a `Request For Change` that must contains these information:
- Defining the context in which you are. _ex: I'm creating a multi-tenant microservice, that aim to ..._
- Show how you tried to test your use-case while following our guidelines. _ex: I tried to use createTestingModule with..._
- Explain explicitly what your pain point (or blockage) were.
- If you ever thought on a concrete solution, show it and explain which area should be changed to implement it.
- Present it to testing strategy stakeholders and potentially others developers/managers.

## Specifications

### Api - GQL

- I can find myself _(deps: [`core -> infra`])_
- I can update myself _(deps: [`core -> infra`])_
- I can retrieve my current estates with financial data _(deps: [`core -> infra`, `computed`])_

Some examples:
```graphql
query me {
  me(email: "romain.freydiger@masteos.com") {
    id
    email
    firstName
    lastName
    estates {
      id
      netSeller
      rent
      status
      financialModel {
        grossReturn
      }
    }
  }
}

mutation updateBuyer {
    updateBuyer(
        email: "romain.freydiger@masteos.com"
        updateBuyerData: { budgetMin: 15 ,firstName: "test" }
    ) {
        firstName
        budgetMin
    }
}
```

### Api - REST

- I can create a new buyer and track it _(deps: [`core -> infra`, `external`])_
- I can find a specific buyer and track it _(deps: [`core -> infra`, `external`])_
- I can take a meet _(deps: [`internal`])_

Some examples:
```http request
###
POST http://localhost:3000/buyers
Content-Type: application/json

{
  "email": "romain.freydiger@masteos.com",
  "password": "test",
  "firstName": "romain",
  "lastName": "freydiger",
  "budgetMin": 0,
  "budgetMax": 180000
}

###
GET http://localhost:3000/buyers/romain.freydiger@masteos.com
Accept: application/json

### create a meet partly in 3rd party and partly in our database
POST http://localhost:3000/buyers/romain.freydiger@masteos.com/meet
Content-Type: application/json

{
  "iso": "2022-10-30T20:49:55.379Z"
}

### should throw an error if previous post is done
POST http://localhost:3000/buyers/romain.freydiger@masteos.com/meet
Content-Type: application/json

{
  "iso": "2022-10-29T20:49:55.379Z"
}
```

### Lib - Computed (do only calculation)

- I can calculate financial data for a specific estate

### Lib - External (interact with a data source that we don't own)

- I can track some data, but not more than 5 times

### Lib - Internal (interact with data source that we don't own **and** one that we own)

- I can take some meet, but not if one is already planned for later (on the same buyer)
