\c turn


INSERT INTO types (type_rol) VALUES
    ('Administrador'),
    ('Cliente'),
    ('Empleado'),
    ('Salud'),
    ('Comida'),
    ('Entretenimiento')
    ;
-- Insertar 5 servicios
INSERT INTO service (type_id, service_type,service_description) VALUES
    (4, 'Consulta Médica','Consulta con un profesional de la salud'),
    (4, 'Laboratorio Clínico','Pruebas de laboratorio y análisis clínicos'),
    (5, 'Servicio de Catering','Preparación y entrega de alimentos'),
    (5, 'Restaurante Gourmet','Servicio de comida de alta calidad'),
    (6, 'Evento Musical','Organización de conciertos y festivales');

-- Insertar 5 lugares (places), las tablas n-m las corrije jh despues
INSERT INTO place (place_name, place_location, type_id) VALUES
    ('Hospital Central', 'Calle 10 #15-30', 4),
    ('Clínica Los Ángeles', 'Avenida Principal #12-45', 4),
    ('Restaurante El Sazón', 'Carrera 8 #20-12', 5),
    ('Cafetería Delicias', 'Calle 5 #18-22', 5),
    ('Teatro Metropolitano', 'Avenida Cultural #50-10', 6);

INSERT INTO place_service (place_id, service_id) VALUES
    (1, 1),
    (1, 2),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5);