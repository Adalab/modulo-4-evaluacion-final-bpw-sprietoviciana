CREATE DATABASE vet;

USE vet;


CREATE TABLE clients (
	id INT AUTO_INCREMENT PRIMARY KEY,  
	name VARCHAR(50) NOT NULL,  
	lastname VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL
);

CREATE TABLE pets (
	id INT AUTO_INCREMENT PRIMARY KEY, 
	owner INT NOT NULL,
	name VARCHAR(50) NOT NULL,
	FOREIGN KEY (owner) REFERENCES clients(id)
);