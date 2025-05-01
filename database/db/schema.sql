\c turn_system

CREATE TABLE role (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL
);

CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    password TEXT NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    age INTEGER NOT NULL,
    condition BOOLEAN DEFAULT FALSE,
    priority CHAR,
    role_id INTEGER NOT NULL,
    is_staff BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    is_superuser BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (role_id) REFERENCES role(role_id) ON DELETE CASCADE
);

CREATE TABLE service (
    service_id SERIAL PRIMARY KEY,
    service_name VARCHAR(50) UNIQUE NOT NULL,
    service_desc TEXT
);

CREATE TABLE place (
    place_id SERIAL PRIMARY KEY,
    place_name VARCHAR(50) UNIQUE NOT NULL,
    service_id INT NOT NULL,
    FOREIGN KEY (service_id) REFERENCES service(service_id) ON DELETE CASCADE
);

CREATE TABLE turn (
    turn_id SERIAL PRIMARY KEY,
    turn_name VARCHAR(4) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    attended_by INTEGER NULL,
    --owner INTEGER NOT NULL,
    owner INTEGER NULL,
    place_id INTEGER NOT NULL,
    date_created TIMESTAMP,
    date_closed TIMESTAMP NULL,
    FOREIGN KEY (place_id) REFERENCES place(place_id) ON DELETE CASCADE,
    FOREIGN KEY (attended_by) REFERENCES "user"(user_id) ON DELETE CASCADE,
    FOREIGN KEY (owner) REFERENCES "user"(user_id) ON DELETE CASCADE
);
