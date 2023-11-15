# FROM node:latest
# Use the official MeiliSearch image
FROM getmeili/meilisearch:latest

# WORKDIR /app

# COPY package.json ./

# RUN npm install

# COPY . .

# ENV PORT=8080

EXPOSE 7700

# CMD [ "npm", "start" ]
CMD [ "meilisearch" ]
