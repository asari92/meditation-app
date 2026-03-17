# Dockerfile для Expo React Native development
FROM node:20-alpine

WORKDIR /app

# Установка зависимостей для Expo
RUN apk add --no-cache git

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходники
COPY . .

# Открываем порты для Expo
EXPOSE 19000 19001 19002 8081

# Запускаем Expo в dev-режиме
CMD ["npm", "start"]
