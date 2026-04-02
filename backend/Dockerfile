# Base image — Node.js ka ready-made dabba lo
FROM node:18-alpine

# Container ke andar kaam karne ki jagah banao
WORKDIR /app

# Pehle package files copy karo (caching ke liye)
COPY package*.json ./

# Dependencies install karo
RUN npm install

# Baaki sara code copy karo
COPY . .

# Backend port 5000 par chalega
EXPOSE 5000

# App start karne ka command
CMD ["node", "server.js"]