CREATE DATABASE axon

CREATE TABLE clientes(

    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    direccion VARCHAR(100) ,
    dni VARCHAR(9),
    condicioniva CHAR(1)
);,

CREATE TABLE facturas(

    id SERIAL PRIMARY KEY,
    idCliente INT,
    nroFactura INT ,
    importe DOUBLE PRECISION
);