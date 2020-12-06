# Drei backend boilerplate
>This is a guide on how I scaffolded this backend template using my preferred (opinionated) backend stack. This is so I can easily start future projects using these technologies without going through the same tedious configuration. #FocusOnCodeNotConfig

## Tech Stack used:
  - Node.js (This guide assumes that you already have node installed on your machine)
  - Express
  - Typescript
  - PostgreSQL
  - TypeORM
  - TypeGraphQL

Table of Contents:
- [Drei backend boilerplate](#drei-backend-boilerplate)
  - [Tech Stack used:](#tech-stack-used)
  - [Steps:](#steps)
    - [Initialize project](#initialize-project)
    - [Create a .gitignore file](#create-a-gitignore-file)
    - [Install node, typescript and general dev dependencies:](#install-node-typescript-and-general-dev-dependencies)
    - [Install QOL (Quality of life) dependencies:](#install-qol-quality-of-life-dependencies)
    - [Create an index file](#create-an-index-file)
    - [install preconfigured tsconfig.json (from benawad)](#install-preconfigured-tsconfigjson-from-benawad)
    - [Add the necessary scripts on package.json](#add-the-necessary-scripts-on-packagejson)
    - [install typeorm and reflect-metadata](#install-typeorm-and-reflect-metadata)
    - [import reflect-metadata to entry point](#import-reflect-metadata-to-entry-point)
    - [install postgreSQL db driver](#install-postgresql-db-driver)
    - [Create an `ormconfig.json`](#create-an-ormconfigjson)
  - [Add server dependencies:](#add-server-dependencies)
  - [Make sure to also install uuid-oosp to your database so you have uuid functionality in your database](#make-sure-to-also-install-uuid-oosp-to-your-database-so-you-have-uuid-functionality-in-your-database)
    - [Install argon2 for password encryption](#install-argon2-for-password-encryption)
    - [Install redis dependencies for session/auth database](#install-redis-dependencies-for-sessionauth-database)


## Steps:
### Initialize project
```
yarn init
```

### Create a .gitignore file
```
<!-- server/.gitignore -->
dist
node_modules
.env
```

### Install node, typescript and general dev dependencies:
```
yarn add -D @types/node @types/express @types/express-session typescript nodemon path
```

### Install QOL (Quality of life) dependencies:
```
yarn add dotenv-safe
```

### Create an index file
```
server/
mkdir src && cd src && touch index.ts
```

### install preconfigured tsconfig.json (from [benawad](https://github.com/benawad/tsconfig.json))
```
npx tsconfig.json
```

### Add the necessary scripts on package.json
```
"main": "index.js",
"scripts": {
  "watch": "tsc -w",
  "dev": "nodemon -r dotenv-safe/config dist/index.js",
  "start": "node dist/index.js"
}
```

### install typeorm and reflect-metadata
```
yarn add typeorm reflect-metadata
```

### import reflect-metadata to entry point
```
<!-- src/index.ts -->
import "reflect-metadata";
```

### install postgreSQL db driver
```
yarn add pg
```

### Create an `ormconfig.json`
```
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": <username>,
  "password": <password>,
  "database": <dbname>,
  "synchronize": true,
  "logging": false,
  "entities": [<entities-folder>],
  "migrations": [
     <migrations-folder>
  ]
}
```

## Add server dependencies:
```
yarn add express cors apollo-server-express graphql type-graphql class-validator
```
```
yarn add -D @types/cors
```

## Make sure to also install uuid-oosp to your database so you have uuid functionality in your database
```
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### Install argon2 for password encryption
```
yarn add argon2
```

### Install redis dependencies for session/auth database
```
yarn add redis connect-redis express-session
```
Also add types:
```
yarn add -D @types/redis @types/express-session @types/connect-redis
```