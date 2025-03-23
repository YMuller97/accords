FROM node:22.14-alpine
WORKDIR /backend
COPY ./package*.json .
# RUN npm install cors --save
RUN npm install --save multer
RUN npm install
CMD ["node", "app.js"]
