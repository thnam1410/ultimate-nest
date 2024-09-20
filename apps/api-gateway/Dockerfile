FROM node:alpine As base
RUN npm i -g pnpm

#=====DEVELOPMENT=====
FROM base AS development

# arguments
ARG APP 
ARG NODE_ENV=development 
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json pnpm-lock.yaml ./
COPY proto proto

RUN pnpm install

COPY . .

RUN pnpm run build ${APP} 

#=====PRODUCTION=====
FROM base as production

ARG APP 
ARG NODE_ENV=production 
ENV NODE_ENV=${NODE_ENV} 

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./ 
COPY proto proto


RUN pnpm install --prod
COPY --from=development /usr/src/app/dist ./dist 

# Add an env to save ARG
ENV APP_MAIN_FILE=dist/apps/${APP}/main 
CMD node ${APP_MAIN_FILE}