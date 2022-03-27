CREATE DATABASE Alkemy

CREATE TABLE values(

    id SERIAL PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL,
    concepto VARCHAR(255) ,
    importe NUMERIC(9) NOT NULL,
    fechas DATE
);