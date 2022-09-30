FROM node:14-alpine
WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY dist ./dist
ENV MONGO_URL="mongodb://mongo:27017/clean-node-api"
EXPOSE 3000
CMD npm start
