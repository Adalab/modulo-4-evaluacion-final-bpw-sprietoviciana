USE vet;

-- pongo id aqui para hacer mas fácil la inserción de mascotas 

INSERT INTO clients(id, name, lastname, email) VALUES
(1, 'Silvia', 'Prieto', 'silvia@gmail.com'),
(2, 'Alex', 'Hernández', 'alex@gmail.com');

INSERT INTO pets(name, owner) VALUES
('Zelda', 2), 
('Dobby', 1),
('Kratos', 1);
