/* Database */
CREATE DATABASE sistema;

USE sistema;

/* Tables */
CREATE TABLE Usuario(
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    cedula_usuario VARCHAR(255),
    rif_usuario VARCHAR(255),
    nombre_usuario VARCHAR(255) NOT NULL,
    username VARCHAR(255),
    password_usuario VARCHAR(255) NOT NULL,
    correo_usuario VARCHAR(255) NOT NULL,
    telefono_usuario VARCHAR(255),
    direccion_usuario VARCHAR(255),
    cargo_usuario VARCHAR(255),
    productor_boolean BOOLEAN,
    administrador_boolean BOOLEAN,
    tipo_linea_negocio VARCHAR(255) NOT NULL
);

CREATE TABLE Rol(
    id_rol INT PRIMARY KEY AUTO_INCREMENT,
    nombre_rol VARCHAR(255) NOT NULL,
    descripcion_rol VARCHAR(255) NOT NULL
);

CREATE TABLE Tomador(
    id_tomador INT PRIMARY KEY AUTO_INCREMENT,
    cedula_tomador VARCHAR(255),
    rif_tomador VARCHAR(255),
    nombre_tomador VARCHAR(255),
    razon_social_tomador VARCHAR(255),
    correo_usuario VARCHAR(255) NOT NULL
);

CREATE TABLE Empresa(
    id_empresa INT PRIMARY KEY AUTO_INCREMENT,
    cedula_empresa VARCHAR(255),
    rif_empresa VARCHAR(255),
    nombre_empresa VARCHAR(255) NOT NULL,
    dominio VARCHAR(255) NOT NULL,
    correo_empresa VARCHAR(255) NOT NULL,
    pais_empresa VARCHAR(255) NOT NULL,
    direccion_empresa VARCHAR(255) NOT NULL,
    porcentaje_empresa DECIMAL(20,2) NOT NULL,
    fecha_renovacion DATE NOT NULL,
    telefono_empresa VARCHAR(255) NOT NULL,
    telefono_opcional VARCHAR(255),
    factor_retencion DECIMAL(20,4) NOT NULL
);

CREATE TABLE Vehiculo(
    id_vehiculo INT PRIMARY KEY AUTO_INCREMENT,
    numero_placa VARCHAR(255) NOT NULL,
    year_vehiculo YEAR NOT NULL,
    marca_vehiculo VARCHAR(255) NOT NULL,
    modelo_vehiculo VARCHAR(255) NOT NULL,
    version_vehiculo VARCHAR(255) NOT NULL,
    tipo_vehiculo VARCHAR(255) NOT NULL,
    descripcion_vehiculo VARCHAR(255),
    suma_asegurada INT,
    color_vehiculo VARCHAR(255),
    serial_motor VARCHAR(255),
    serial_corroceria VARCHAR(255),
    cantidad_pasajero INT,
    capacidad_carga INT,
    lugar_habitual VARCHAR(255),
    cedula_conductor_vehiculo VARCHAR(255),
    rif_conductor_vehiculo VARCHAR(255),
    nombre_conductor_vehiculo VARCHAR(255)
);

CREATE TABLE Poliza(
    id_poliza INT PRIMARY KEY AUTO_INCREMENT,
    numero_poliza VARCHAR(255) NOT NULL,
    ramo_poliza VARCHAR(255) NOT NULL,
    tomador_viejo BOOLEAN NOT NULL,
    tipo_negocio VARCHAR(255) NOT NULL,
    fecha_desde DATE NOT NULL,
    fecha_hasta DATE NOT NULL,
    tipo_moneda VARCHAR(255) NOT NULL,
    tipo_movimiento VARCHAR(255) NOT NULL,
    monto_prima DECIMAL(20,4) NOT NULL,
    estatus_poliza VARCHAR(255) NOT NULL,
    tipo_cobertura VARCHAR(255) NOT NULL,
    tipo_bono VARCHAR(255) NOT NULL,
    tipo_producto VARCHAR(255),
    tipo_canal VARCHAR(255),
    corporativa_poliza BOOLEAN NOT NULL,
    grupo_poliza VARCHAR(255),
    deducible_poliza INT
);

CREATE TABLE Recibo(
    id_recibo INT PRIMARY KEY AUTO_INCREMENT,
    numero_recibo INT NOT NULL,
    tipo_recibo VARCHAR(255) NOT NULL,
    fecha_vigencia_desde DATE NOT NULL,
    fecha_vigencia_hasta DATE NOT NULL,
    monto_prima_recibo DECIMAL(20,4) NOT NULL,
    monto_comision_recibo DECIMAL(20,4) NOT NULL,
    poliza_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_poliza_id(poliza_id) REFERENCES Poliza(id_poliza)
);

CREATE TABLE Aseguradora(
    id_aseguradora INT PRIMARY KEY AUTO_INCREMENT,
    rif_aseguradora VARCHAR(255) NOT NULL,
    nombre_aseguradora VARCHAR(255) NOT NULL,
    direccion_aseguradora VARCHAR(255) NOT NULL,
    telefono_aseguradora VARCHAR(255),
    empresa_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_empresa_id(empresa_id) REFERENCES Empresa(id_empresa)
);

CREATE TABLE Asegurado(
    id_asegurado INT PRIMARY KEY AUTO_INCREMENT,
    cedula_asegurado VARCHAR(255),
    rif_asegurado VARCHAR(255),
    nombre_asegurado VARCHAR(255) NOT NULL,
    telefono_asegurado VARCHAR(255) NOT NULL,
    correo_asegurado VARCHAR(255) NOT NULL,
    tipo_asegurado VARCHAR(255) NOT NULL,
    empresa_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_empresa_id(empresa_id) REFERENCES Empresa(id_empresa)
);

CREATE TABLE Poliza_Tomador(
    id_poliza_tomador INT PRIMARY KEY AUTO_INCREMENT,
    poliza_id INT NOT NULL,
    tomador_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_poliza_id(poliza_id) REFERENCES Poliza(id_poliza),
    CONSTRAINT FOREIGN KEY fk_tomador_id(tomador_id) REFERENCES Tomador(id_tomador)
);

CREATE TABLE Usuario_Rol(
    id_usuario_rol INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    rol_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_usuario_id(usuario_id) REFERENCES Usuario(id_usuario),
    CONSTRAINT FOREIGN KEY fk_rol_id(rol_id) REFERENCES Rol(id_rol)
);

CREATE TABLE Poliza_Aseguradora_Asegurado(
    id_paa INT PRIMARY KEY AUTO_INCREMENT,
    poliza_id INT NOT NULL,
    aseguradora_id INT NOT NULL,
    asegurado_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_poliza_id(poliza_id) REFERENCES Poliza(id_poliza),
    CONSTRAINT FOREIGN KEY fk_aseguradora_id(aseguradora_id) REFERENCES Aseguradora(id_aseguradora),
    CONSTRAINT FOREIGN KEY fk_asegurado_id(asegurado_id) REFERENCES Asegurado(id_asegurado)
);

CREATE TABLE Siniestro(
    id_siniestro INT PRIMARY KEY AUTO_INCREMENT,
    numero_reclamo_siniestro VARCHAR(255),
    fecha_notifi_aseguradora DATE NOT NULL,
    fecha_notifi_empresa DATE NOT NULL,
    fecha_ocurrencia DATE NOT NULL,
    tipo_siniestro VARCHAR(255) NOT NULL,
    estatus_siniestro VARCHAR(255) NOT NULL,
    lugar_siniestro VARCHAR(255) NOT NULL,
    tipo_causa_siniestro VARCHAR(255) NOT NULL,
    damage_siniestro VARCHAR(255) NOT NULL,
    monto_reclamado DECIMAL(20,4),
    deducible_boolean BOOLEAN NOT NULL,
    descripcion_siniestro VARCHAR(255) NOT NULL,
    observacion_siniestro VARCHAR(255) NOT NULL,
    paa_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_paa_id(paa_id) REFERENCES Poliza_Aseguradora_Asegurado(id_paa)
);

CREATE TABLE Comision(
    id_comision INT PRIMARY KEY AUTO_INCREMENT,
    porcentaje_comision DECIMAL(10,4) NOT NULL,
    estatus_comision VARCHAR(255) NOT NULL,
    recibo_id INT NOT NULL,
    paa_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_recibo_id(recibo_id) REFERENCES Recibo(id_recibo),
    CONSTRAINT FOREIGN KEY fk_paa_id(paa_id) REFERENCES Poliza_Aseguradora_Asegurado(id_paa)
);

CREATE TABLE Pol_Aseg_Asegurado_Vehi(
    id_paav INT PRIMARY KEY AUTO_INCREMENT,
    paa_id INT NOT NULL,
    vehiculo_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_paa_id(paa_id) REFERENCES Poliza_Aseguradora_Asegurado(id_paa),
    CONSTRAINT FOREIGN KEY fk_vehiculo_id(vehiculo_id) REFERENCES Vehiculo(id_vehiculo)
);