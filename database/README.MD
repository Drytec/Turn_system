# Database Component

## Summary

Under construction

## Steps for build and run a single database

## 1. Create sql files:

Create a db folder and include the following files:

- `schema.sql`: Contains the SQL statements for create tables [using DDL]
- `data.sql`: Contains the SQL statements for insert initial data [using DML]

### 2. Create `Dockerfile`

Set postgres imagen base:
-  FROM postgres:16

Add lines for copy files into container:
- COPY ./db/schema.sql /docker-entrypoint-initdb.d/01_schema.sql
- COPY ./db/data.sql /docker-entrypoint-initdb.d/02_data.sql

### 3. Build database image

inside database folder:

```
docker build -t turn_system .
```

### 4. Run server with postgres

```
docker run --name turn_system -p 0.0.0.0:5433:5432 -e POSTGRES_PASSWORD=aP4sw0rd turn_system
```

### Run integrate with dockercompose

To make managing the database container easier, use Docker Compose.

### 1. Run the Database Server with DockerCompose

From root level folder to launch the database services, run:

```bash
docker-compose up -d turn_system_database
```

docker-compose.yml simplifies container management.

Para hacer consultas en la base de datos

docker exec -it turn_system bash

dentro del contenedor

psql -U postgres -d turn
