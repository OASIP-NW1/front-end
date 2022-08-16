FROM node:18-alpine3.14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install 
RUN npm install --save bootstrap
RUN npm install --save @popperjs/core
COPY . .
RUN npm run build

FROM nginx:stable-alpine as client-dev
COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
