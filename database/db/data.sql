\c turn_system


INSERT INTO role (role_name) VALUES
    ('Administrador'),
    ('Cliente'),
    ('Empleado');

INSERT INTO service (service_name, service_desc) VALUES
    ('Consulta Médica','Consulta con un profesional de la salud'),
    ('Laboratorio Clínico','Pruebas de laboratorio y análisis clínicos'),
    ('PQRs','Servicio al Cliente');

INSERT INTO place (service_id, place_name) VALUES
    (1, 'Area de Consultas'),
    (2, 'Laboratorio'),
    (3, 'Atencion al cliente');