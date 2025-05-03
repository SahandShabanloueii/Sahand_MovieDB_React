# Build stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm i -g serve

# Copy all files
COPY . .

# Build the app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start serve
CMD ["serve", "-s", "dist"] 