# Base image
FROM node:18-alpine

WORKDIR /app

# Package files copy karo
COPY package*.json ./

# Dependencies install karo
RUN npm install

# Sara code copy karo
COPY . .

# Frontend port 3000 par chalega
EXPOSE 3000

# React app start karo
CMD ["npm", "start"]