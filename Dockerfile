FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install pm2 -g
COPY . .
EXPOSE 3000
#CMD ["npm","run","dev" ]
CMD [ "pm2","start","App.js"]