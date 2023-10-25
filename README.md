# SmartlyDomain - Domain Generation using OpenAI

SmartlyDomain is a NestJS application that leverages OpenAI to generate domain names from an input description. Whether you're looking to brainstorm domain ideas for a new website, project, or business, SmartlyDomain has you covered.

## Features

- Generate domain names from an input description.
- Utilizes the power of OpenAI's natural language processing capabilities.
- Checks for generated domains domain availability

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following dependencies installed:

- Node.js: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

## Installation

```bash
$ git clone https://github.com/erfanhekmati/smartlydomain.git
cd smartlydomain
```

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

> **Note:** Please ensure that you add environment variables to the `.env` file before running the app.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Updating app onfiguration

You can update the app `configuration` file located at:<br/>
├── src<br/>
&nbsp;&nbsp;&nbsp;&nbsp;├── config<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── configuration.ts

## Updating swagger initialization

You can update the `swagger` initialization file located at:<br/>
├── src<br/>
&nbsp;&nbsp;&nbsp;&nbsp;├── swagger<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── index.ts

## License

Nest is [MIT licensed](LICENSE).
