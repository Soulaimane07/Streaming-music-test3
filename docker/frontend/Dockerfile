# Use the official Node.js 20 image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY ./frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY ./frontend/. ./

# Expose the port that the app runs on
EXPOSE 3000

# Start the app in development mode
CMD ["npm", "start"]