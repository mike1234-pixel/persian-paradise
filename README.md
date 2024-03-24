# Persian Paradise

This a Farsi language learning application aimed at English speakers.

## Get Started

Clone the repository and run `yarn install`

## Run the application

To run the application in development mode, run:

`yarn start`

## Libraries & Tools

This app uses:

- React
- TypeScript
- React Query
- Ant Design
- CSS Modules
- React Router

as well as some additional animation libraries which can be found in the `package.json`

## Workflow & CI/CD

`husky` pre-commit hooks run `prettier` and `eslint`, as well as tests.

Scripts are also available to prettify code and lint code. See `package.json`.

Github Actions runs tests after pushing code to `main` branch.

## API

Course modules are got from the [Persian Paradise API](https://github.com/mike1234-pixel/persian-paradise-api).

## Shared Types

Shared types are stored in [persian-paradise-shared-types npm package](https://www.npmjs.com/package/persian-paradise-shared-types).
