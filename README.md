# Sandbox - NestJS Testing Strategy

## Description

This repository is created to provide an environment that show up common testing technique at Masteos without being alternate frequently.

## Installation

```bash
$ npm ci
```

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

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

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

We can mock only external dependency (side effect) and nothing else

### Unit

Naming: `*.spec.ts`

Test that mock every side effect of the function and focus only on the logic of the function itself

Ex: a function that have 3 "get" calls and do an addition, then the 3 "get" must be mocked and only the addition will be covered.

## Priorities

Focus on full integration

unit are optional:
- Relevant for edge-case like throw, "impossible" case that should not happen, ...
- if heavy calculation performed
- Almost all utils that have mostly no dependencies

## Specifications

### Api - GQL

- I can find myself
- I can update myself
- I can retrieve my current estates with financial data

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

- I can create a new buyer
- I can find a specific buyer
- I can take a meet

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
  "date": "2022-10-30T20:49:55.379Z"
}

### should throw an error if previous post is done
POST http://localhost:3000/buyers/romain.freydiger@masteos.com/meet
Content-Type: application/json

{
  "date": "2022-10-29T20:49:55.379Z"
}
```

### Lib - Computed (do only calculation)

- I can calculate financial data for a specific estate

### Lib - External (interact with a data source that we don't own)

- I can track some data, but not more than 5 times

### Lib - Internal (interact with a data source that we own)

- I can take some meet, but not if one is already planned for later (on the same buyer)
