\c turn_system

CREATE TABLE role (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE custom_user (
    id SERIAL PRIMARY KEY,
    password VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    age INTEGER NOT NULL,
    condition BOOLEAN NULL DEFAULT NULL,
    last_name VARCHAR(150) NOT NULL,
    role_id INTEGER NOT NULL,
    priority CHAR DEFAULT NULL,
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

CREATE TABLE place_custom_user (
    place_custom_user_id SERIAL PRIMARY KEY,
    place_id INT NOT NULL,
    custom_user_id INT NOT NULL,
    FOREIGN KEY (place_id) REFERENCES place(place_id) ON DELETE CASCADE,
    FOREIGN KEY (custom_user_id) REFERENCES custom_user(id) ON DELETE CASCADE
);

CREATE TABLE turn (
    turn_id SERIAL PRIMARY KEY,
    turn_name VARCHAR(5) NOT NULL,
    turn_priority CHAR NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    canceled BOOLEAN DEFAULT FALSE,
    attended_by INTEGER NULL,
    owner INTEGER NOT NULL,
    place_id INTEGER NOT NULL,
    date_created TIMESTAMP,
    date_closed TIMESTAMP NULL,
    FOREIGN KEY (place_id) REFERENCES place(place_id) ON DELETE CASCADE,
    FOREIGN KEY (attended_by) REFERENCES custom_user(id) ON DELETE CASCADE,
    FOREIGN KEY (owner) REFERENCES custom_user(id) ON DELETE CASCADE
);
