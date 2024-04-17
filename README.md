# Persian Paradise

This a Farsi language learning application aimed at English speakers.

## Get Started

Clone the repository and run `yarn install`

## Run the application

To run the application in development mode, run:

`yarn start`

## Running with Docker

Persian Paradise can also be run inside a Docker container, providing a consistent development environment across different machines. Follow these steps:

1. **Install Docker Desktop**: If you haven't already, install Docker Desktop from [the official Docker website](https://www.docker.com/products/docker-desktop).

2. **Build the Docker Image**: Run `yarn docker-build` to build the Docker image for Persian Paradise.

3. **Run the Docker Container**: Launch the Docker container using `yarn docker-run`. This command will start the application inside a Docker container with hot reloading enabled, allowing you to develop seamlessly.

### Troubleshooting

If you encounter any issues while running Persian Paradise with Docker, here are a few troubleshooting tips:

- `Docker Daemon Not Running`: Ensure that the Docker daemon is running on your machine. You can start Docker Desktop or use the appropriate command for your operating system.

- `Port 3000 Already in Use`: If port 3000 is already in use, you may need to stop the conflicting process. Use the following command to stop containers running on port 3000:

`docker stop $(docker ps -q --filter "ancestor=my-react-app" --filter "publish=3000")`

## Libraries & Tools

This app uses:

- React
- TypeScript
- React Query
- Ant Design
- CSS Modules
- React Router

as well as some additional animation libraries which can be found in `package.json`

## Workflow & CI/CD

`husky` pre-commit hooks run `prettier` and `eslint`, as well as tests.

Scripts are also available to prettify code and lint code. See `package.json`.

Github Actions runs tests after pushing code to `main` branch.

## Tests

### Unit Tests

run `yarn test` to run tests.

For coverage reports, run `yarn test:coverage`. Coverage thresholds are set at 60% and can be found in `package.json`.

### E2E Tests

To run e2e tests in a real browser, run `npx cypress open` and use the cypress ui.

## API

Course modules are got from the [Persian Paradise API](https://github.com/mike1234-pixel/persian-paradise-api).

## Shared Types

Shared types are stored in [persian-paradise-shared-types npm package](https://www.npmjs.com/package/persian-paradise-shared-types).
