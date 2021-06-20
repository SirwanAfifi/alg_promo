# API

- Install the dependencies `yarn`
- Add `.env` file in the root of API project:

```js
POSTGRES_HOST=
POSTGRES_PORT=5432
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=promo_db
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=
PGADMIN_CONFIG_SERVER_MODE=False
PORT=5000
PRIVATE_KEY=
TYPEORM_SEEDING_FACTORIES=src/factories/**/*{.ts,.js}
TYPEORM_SEEDING_SEEDS=src/seeds/**/*{.ts,.js}
```

- `yarn init:db`
- The last step might take some time, Once you seed the following message you should exit the process using `Ctrl + C`:

```js
Done with Seeding
```

- Start the API: `yarn start:dev`

# Web

- `yarn`
- `yarn start`

# Tests

- `yarn test`
