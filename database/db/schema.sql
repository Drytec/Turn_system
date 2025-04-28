\c turn_system

-- Crear la tabla de Tipos de Usuario
CREATE TABLE role (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL
);

-- Crear la tabla de Usuarios
CREATE TABLE users (
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
    service_name VARCHAR(50) NOT NULL,
    service_desc TEXT
);

CREATE TABLE place (
    place_id SERIAL PRIMARY KEY,
    service_id INTEGER NOT NULL,
    place_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (service_id) REFERENCES service(service_id) ON DELETE CASCADE
);

CREATE TABLE place_user (
    place_user_id SERIAL PRIMARY KEY,
    place_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (place_id) REFERENCES place(place_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

CREATE TABLE turn (
    turn_id SERIAL PRIMARY KEY,
    turn_num INTEGER NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    attended_by INTEGER NULL,
    owner INTEGER NOT NULL,
    place_id INTEGER NOT NULL,
    service_id INTEGER NOT NULL,
    date_created TIMESTAMP,
    date_closed TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES service(service_id) ON DELETE CASCADE,
    FOREIGN KEY (attended_by) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (owner) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (place_id) REFERENCES place(place_id) ON DELETE CASCADE
);
