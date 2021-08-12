/* Database */
CREATE DATABASE sistema;

USE sistema;

/* Tables */
CREATE TABLE Usuario(
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    cedula_usuario INT,
    rif_usuario VARCHAR(255),
    nombre_usuario VARCHAR(255) NOT NULL,
    apellido_usuario VARCHAR(255) NOT NULL,
    password_usuario VARCHAR(255) NOT NULL,
    correo_usuario VARCHAR(255) NOT NULL,
    direccion_usuario VARCHAR(255) NOT NULL,
    cargo_usuario VARCHAR(255) NOT NULL,
    productor_boolean BOOLEAN,
    administrador_boolean BOOLEAN,
    tipo_linea_negocio VARCHAR(255) NOT NULL
);

CREATE TABLE Rol(
    id_rol INT PRIMARY KEY AUTO_INCREMENT,
    nombre_rol VARCHAR(255) NOT NULL,
    descripcion_rol VARCHAR(255) NOT NULL
);

CREATE TABLE Usuario_Rol(
    id_usuario_rol INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    rol_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_usuario_id(usuario_id) REFERENCES Usuario(id_usuario),
    CONSTRAINT FOREIGN KEY fk_rol_id(rol_id) REFERENCES Rol(id_rol)
);