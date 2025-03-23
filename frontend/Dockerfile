FROM node:22.14-alpine
WORKDIR /frontend
COPY ./package*.json .
RUN npm install --save multer
RUN npm install
COPY ./src .
EXPOSE 3000
CMD ["npm", "start"]