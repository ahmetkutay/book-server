# Use a specific version of Node as the base image.
FROM node:20.10.0-alpine

# Set the working directory for the application.
WORKDIR /usr/src/app

# Copy the entire project into the container.
COPY . .

# Install dependencies.
RUN npm install

# Build the application.
RUN npm run build

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD npm run serve
