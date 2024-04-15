# Start from a node base image
FROM node:21-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install the dependencies using Yarn
RUN yarn install

# Copy the source files
COPY . .

# Expose the source code directory as a volume
VOLUME /usr/src/app/src

# Build the app
RUN yarn build

# Start the development server with hot reloading
CMD ["yarn", "start", "--host", "0.0.0.0", "--watch"]