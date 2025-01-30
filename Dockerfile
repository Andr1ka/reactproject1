FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
EXPOSE 50779
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "run", "dev"]