# Use Node.js base image
FROM node:lts-alpine

WORKDIR /app

# Set default credentials (can be overridden at build time)
ENV VITE_APP_USERNAME=admin
ENV VITE_APP_PASSWORD=mypass

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Start Vite dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]