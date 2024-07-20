# blockchain/Dockerfile

# Use Node.js LTS base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose port
EXPOSE 5173

# Start the server
CMD ["node", "start"]
