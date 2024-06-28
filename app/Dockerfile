# Use the official Node.js image as a base
FROM node:16

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port (usually 3000 for React)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
