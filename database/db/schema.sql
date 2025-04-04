\c turn

-- Crear la tabla de Tipos de Usuario
CREATE TABLE types (
     type_id SERIAL PRIMARY KEY,
     type_rol VARCHAR(50) NOT NULL
);

-- Crear la tabla de Usuarios
CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        password VARCHAR(150) NOT NULL,
        username VARCHAR(150) UNIQUE NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        name VARCHAR(150) NOT NULL,
        age INTEGER NOT NULL,
        conditions BOOLEAN DEFAULT FALSE,
        last_name VARCHAR(150) NOT NULL,
        type_id INTEGER NOT NULL,
        e_condition VARCHAR(150) DEFAULT 'Baja',
        is_staff BOOLEAN DEFAULT FALSE,
        is_active BOOLEAN DEFAULT TRUE,
        last_login TIMESTAMP NULL,
        is_superuser BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (type_id) REFERENCES types(type_id) ON DELETE CASCADE
);

-- Crear la tabla de Servicios
CREATE TABLE service (
        service_id SERIAL PRIMARY KEY,
        type_id INTEGER NOT NULL,
        service_type VARCHAR(50) NOT NULL,
        service_description TEXT NOT NULL,
        FOREIGN KEY (type_id) REFERENCES types(type_id) ON DELETE CASCADE
);

-- Crear la tabla de Lugares
CREATE TABLE place (
        place_id SERIAL PRIMARY KEY,
        place_name VARCHAR(50) NOT NULL,
        place_location VARCHAR(50) NOT NULL,
        type_id INTEGER NOT NULL,
        FOREIGN KEY (type_id) REFERENCES types(type_id) ON DELETE CASCADE
);
CREATE TABLE turn (
    turn_id SERIAL PRIMARY KEY,
    turn_num INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    place_id INTEGER NOT NULL ,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (place_id) REFERENCES place(place_id) ON DELETE CASCADE
);
