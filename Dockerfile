# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Expose app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
