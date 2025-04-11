# Use Node.js Alpine base image
FROM node:alpine

# Create and set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json /app/

# Install dependencies
RUN npm install

# Copy the entire codebase to the working directory
COPY . /app/

# Build the application (for production-ready builds)
RUN npm run build

# Expose the port your container app will run on
EXPOSE 3000    

# Define the command to start your application
CMD ["npm", "start"]