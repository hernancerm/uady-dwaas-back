# uady-dwaas-back

Backend of the final project of a UADY course.

## Initial setup

### Step 1: Install dependencies and build the project

```text
npm i && npm run build
```

### Step 2: Configure the database

1. Start a local MySQL server.
2. Create a new database to be used for the project.
3. Copy/paste [`.env.example`](.env.example) at the root of the project, naming the new file `.env` and filling the required data.
4. Run the migrations: `npx typeorm migration:run`. As of now, this only sets up the user roles and the admin user.

### Step 3: Run the project

```text
npm run start
```

## FAQ

### What is the API schema?

It is not documented, no OpenAPI or otherwise currently exists, but there is a [Postman collection and environment](./postman/).

### How do I synchronize my DB schema with the TypeORM entities?

This will create the tables if they don't exist yet, or update them to match the schema defined by the TypeORM entities:

```text
npm run build && npx typeorm schema:sync
```

### How do I run the TypeORM migrations?

The following command runs all pending migrations. Also refer to [TypeORM's documentation on migrations](https://typeorm.io/migrations#running-and-reverting-migrations).

```text
npm run build && npx typeorm migration:run
```
