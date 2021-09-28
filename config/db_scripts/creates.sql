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
    tipo_linea_negocio VARCHAR(255) NOT NULL,
    deshabilitar_usuario BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Rol(
    id_rol INT PRIMARY KEY AUTO_INCREMENT,
    nombre_rol VARCHAR(255) NOT NULL,
    descripcion_rol VARCHAR(255) NOT NULL,
    deshabilitar_rol BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Vehiculo(
    id_vehiculo INT PRIMARY KEY AUTO_INCREMENT,
    numero_placa VARCHAR(255) NOT NULL,
    year_vehiculo YEAR NOT NULL,
    marca_vehiculo VARCHAR(255) NOT NULL,
    modelo_vehiculo VARCHAR(255) NOT NULL,
    version_vehiculo VARCHAR(255) NOT NULL,
    tipo_transmision_vehiculo VARCHAR(255) NOT NULL,
    blindaje_boolean_vehiculo BOOLEAN NOT NULL,
    tipo_vehiculo VARCHAR(255) NOT NULL,
    color_vehiculo VARCHAR(255),
    serial_motor VARCHAR(255),
    serial_corroceria VARCHAR(255),
    cantidad_pasajero INT,
    capacidad_carga INT,
    cedula_conductor_vehiculo VARCHAR(255),
    rif_conductor_vehiculo VARCHAR(255),
    nombre_conductor_vehiculo VARCHAR(255),
    deshabilitar_vehiculo BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Poliza(
    id_poliza INT PRIMARY KEY AUTO_INCREMENT,
    numero_poliza VARCHAR(255) NOT NULL,
    tomador_viejo BOOLEAN NOT NULL,
    nombre_tomador_poliza VARCHAR(255) NOT NULL,
    tipo_ramo_poliza VARCHAR(255),
    tipo_individual_poliza VARCHAR(255) NOT NULL,
    tipo_poliza VARCHAR(255),
    fecha_desde DATE NOT NULL,
    fecha_hasta DATE NOT NULL,
    tipo_moneda_poliza VARCHAR(255) NOT NULL,
    tasa_poliza DECIMAL(10,4),
    prima_anual_poliza DECIMAL(20,4) NOT NULL,
    estatus_poliza VARCHAR(255),
    tipo_cobertura_poliza VARCHAR(255),
    tipo_canal_poliza VARCHAR(255),
    suma_asegurada_poliza DECIMAL(20,4) NOT NULL,
    deducible_poliza DECIMAL(20,4),
    deshabilitar_poliza BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Ejecutivo(
    id_ejecutivo INT PRIMARY KEY AUTO_INCREMENT,
    cedula_ejecutivo VARCHAR(255),
    rif_ejecutivo VARCHAR(255),
    nombre_ejecutivo VARCHAR(255) NOT NULL,
    apellido_ejecutivo VARCHAR(255) NOT NULL,
    celular_ejecutivo VARCHAR(255) NOT NULL,
    correo_ejecutivo VARCHAR(255) NOT NULL,
    direccion_ejecutivo VARCHAR(500) NOT NULL,
    deshabilitar_ejecutivo BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Aseguradora(
    id_aseguradora INT PRIMARY KEY AUTO_INCREMENT,
    rif_aseguradora VARCHAR(255) NOT NULL,
    nombre_aseguradora VARCHAR(255) NOT NULL,
    direccion_aseguradora VARCHAR(255) NOT NULL,
    telefono_aseguradora VARCHAR(255),
    deshabilitar_aseguradora BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Agente_Propio(
    id_agente_propio INT PRIMARY KEY AUTO_INCREMENT,
    cedula_agente_propio VARCHAR(255),
    rif_agente_propio VARCHAR(255),
    nombre_agente_propio VARCHAR(255) NOT NULL,
    apellido_agente_propio VARCHAR(255) NOT NULL,
    celular_agente_propio VARCHAR(255) NOT NULL,
    correo_agente_propio VARCHAR(255) NOT NULL,
    direccion_agente_propio VARCHAR(500) NOT NULL,
    deshabilitar_agente_propio BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Recibo(
    id_recibo INT PRIMARY KEY AUTO_INCREMENT,
    numero_recibo INT NOT NULL,
    tipo_recibo VARCHAR(255) NOT NULL,
    fecha_desde_recibo DATE NOT NULL,
    fecha_hasta_recibo DATE NOT NULL,
    fraccionamiento_boolean_recibo BOOLEAN NOT NULL,
    tipo_fraccionamiento_recibo VARCHAR(255) NOT NULL,
    metodo_pago_recibo VARCHAR(255) NOT NULL, 
    monto_prima_recibo DECIMAL(20,4) NOT NULL,
    comision_asociada_recibo DECIMAL(20,4) NOT NULL,
    bonificacion_recibo DECIMAL(20,4),
    monto_comision_recibo DECIMAL(20,4) NOT NULL,
    deshabilitar_recibo BOOLEAN NOT NULL DEFAULT FALSE,
    poliza_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_poliza_id(poliza_id) REFERENCES Poliza(id_poliza)
);

CREATE TABLE Comision(
    id_comision INT PRIMARY KEY AUTO_INCREMENT,
    porcentaje_agente_comision DECIMAL(10,4) NOT NULL,
    caso_especial_comision DECIMAL(10,4),
    porcentaje_ejecutivo_comision DECIMAL(10,4) NOT NULL,
    porcentaje_fundatina_comision DECIMAL(10,4) NOT NULL,
    porcentaje_director_comision DECIMAL(10,4) NOT NULL,
    porcentaje_socio_comision DECIMAL(10,4) NOT NULL,
    porcentaje_atina_comision DECIMAL(10,4) NOT NULL,
    deshabilitar_comision BOOLEAN NOT NULL DEFAULT FALSE,
    poliza_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_poliza_id(poliza_id) REFERENCES Poliza(id_poliza)
);

CREATE TABLE Asegurado_Persona_Natural(
    id_asegurado_per_nat INT PRIMARY KEY AUTO_INCREMENT,
    cedula_asegurado_per_nat VARCHAR(255),
    rif_asegurado_per_nat VARCHAR(255),
    nombre_asegurado_per_nat VARCHAR(255) NOT NULL,
    apellido_asegurado_per_nat VARCHAR(255) NOT NULL,
    telefono_asegurado_per_nat VARCHAR(255),
    correo_asegurado_per_nat VARCHAR(255) NOT NULL,
    celular_per_nat VARCHAR(255) NOT NULL,
    nombre_emergencia_per_nat VARCHAR(255) NOT NULL,
    telefono_emergencia_per_nat VARCHAR(255) NOT NULL,
    direccion_asegurado_per_nat VARCHAR(500) NOT NULL,
    deshabilitar_asegurado_per_nat BOOLEAN NOT NULL DEFAULT FALSE,
    agente_propio_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_agente_propio_id(agente_propio_id) REFERENCES Agente_Propio(id_agente_propio)
);

CREATE TABLE Asegurado_Persona_Juridica(
    id_asegurado_per_jur INT PRIMARY KEY AUTO_INCREMENT,
    rif_asegurado_per_jur VARCHAR(255) NOT NULL,
    razon_social_per_jur VARCHAR(255) NOT NULL,
    telefono_asegurado_per_jur VARCHAR(255) NOT NULL,
    telefono_opcional_per_jur VARCHAR(255),
    celular_asegurado_per_jur VARCHAR(255) NOT NULL,
    nombre_contacto_per_jur VARCHAR(255),
    correo_asegurado_per_jur VARCHAR(255) NOT NULL,
    correo_opcional_per_jur VARCHAR(255) NOT NULL,
    direccion_asegurado_per_jur VARCHAR(500) NOT NULL,
    deshabilitar_asegurado_per_jur BOOLEAN NOT NULL DEFAULT FALSE,
    agente_propio_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_agente_propio_id(agente_propio_id) REFERENCES Agente_Propio(id_agente_propio)
);

CREATE TABLE Usuario_Rol(
    id_usuario_rol INT PRIMARY KEY AUTO_INCREMENT,
    deshabilitar_usuario_rol BOOLEAN NOT NULL DEFAULT FALSE,
    usuario_id INT NOT NULL,
    rol_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_usuario_id(usuario_id) REFERENCES Usuario(id_usuario),
    CONSTRAINT FOREIGN KEY fk_rol_id(rol_id) REFERENCES Rol(id_rol)
);

CREATE TABLE Poliza_Aseguradora_Asegurado(
    id_paa INT PRIMARY KEY AUTO_INCREMENT,
    deshabilitar_paa BOOLEAN NOT NULL DEFAULT FALSE,
    poliza_id INT NOT NULL,
    aseguradora_id INT NOT NULL,
    asegurado_per_nat_id INT,
    asegurado_per_jur_id INT,
    CONSTRAINT FOREIGN KEY fk_poliza_id(poliza_id) REFERENCES Poliza(id_poliza),
    CONSTRAINT FOREIGN KEY fk_aseguradora_id(aseguradora_id) REFERENCES Aseguradora(id_aseguradora),
    CONSTRAINT FOREIGN KEY fk_asegurado_per_nat_id(asegurado_per_nat_id) REFERENCES Asegurado_Persona_Natural(id_asegurado_per_nat),
    CONSTRAINT FOREIGN KEY fk_asegurado_per_jur_id(asegurado_per_jur_id) REFERENCES Asegurado_Persona_Juridica(id_asegurado_per_jur)
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
    deshabilitar_siniestro BOOLEAN NOT NULL DEFAULT FALSE,
    paa_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_paa_id(paa_id) REFERENCES Poliza_Aseguradora_Asegurado(id_paa)
);

CREATE TABLE Reembolso(
    id_reembolso INT PRIMARY KEY AUTO_INCREMENT,
    patologia_reembolso VARCHAR(255) NOT NULL,
    fecha_ocurrencia_reembolso DATE NOT NULL,
    fecha_notificacion_reembolso DATE NOT NULL,
    monto_reembolso INT NOT NULL,
    deshabilitar_reembolso BOOLEAN NOT NULL DEFAULT FALSE,
    paa_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_paa_id(paa_id) REFERENCES Poliza_Aseguradora_Asegurado(id_paa)
);

CREATE TABLE AMP(
    id_amp INT PRIMARY KEY AUTO_INCREMENT,
    patologia_amp VARCHAR(255) NOT NULL,
    clinica_amp VARCHAR(255) NOT NULL,
    fecha_ocurrencia_amp DATE NOT NULL,
    fecha_notificacion_amp DATE NOT NULL,
    monto_amp INT NOT NULL,
    deshabilitar_amp BOOLEAN NOT NULL DEFAULT FALSE,
    paa_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_paa_id(paa_id) REFERENCES Poliza_Aseguradora_Asegurado(id_paa)
);

CREATE TABLE Emergencia(
    id_emergencia INT PRIMARY KEY AUTO_INCREMENT,
    patologia_emergencia VARCHAR(255) NOT NULL,
    clinica_emergencia VARCHAR(255) NOT NULL,
    fecha_ocurrencia_emergencia DATE NOT NULL,
    fecha_notificacion_emergencia DATE NOT NULL,
    monto_emergencia INT NOT NULL,
    deshabilitar_emergencia BOOLEAN NOT NULL DEFAULT FALSE,
    paa_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_paa_id(paa_id) REFERENCES Poliza_Aseguradora_Asegurado(id_paa)
);

CREATE TABLE Carta_Aval(
    id_carta_aval INT PRIMARY KEY AUTO_INCREMENT,
    patologia_carta_aval VARCHAR(255) NOT NULL,
    clinica_carta_aval VARCHAR(255) NOT NULL,
    fecha_ocurrencia_carta_aval DATE NOT NULL,
    fecha_notificacion_carta_aval DATE NOT NULL,
    monto_carta_aval INT NOT NULL,
    deshabilitar_carta_aval BOOLEAN NOT NULL DEFAULT FALSE,
    paa_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_paa_id(paa_id) REFERENCES Poliza_Aseguradora_Asegurado(id_paa)
);

CREATE TABLE Pol_Aseg_Asegurado_Vehi(
    id_paav INT PRIMARY KEY AUTO_INCREMENT,
    deshabilitar_paav BOOLEAN NOT NULL DEFAULT FALSE,
    paa_id INT NOT NULL,
    vehiculo_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_paa_id(paa_id) REFERENCES Poliza_Aseguradora_Asegurado(id_paa),
    CONSTRAINT FOREIGN KEY fk_vehiculo_id(vehiculo_id) REFERENCES Vehiculo(id_vehiculo)
);

CREATE TABLE Pol_Aseg_Asegurado_Ejecu(
    id_paae INT PRIMARY KEY AUTO_INCREMENT,
    deshabilitar_paae BOOLEAN NOT NULL DEFAULT FALSE,
    paa_id INT NOT NULL,
    ejecutivo_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_paa_id(paa_id) REFERENCES Poliza_Aseguradora_Asegurado(id_paa),
    CONSTRAINT FOREIGN KEY fk_ejecutivo_id(ejecutivo_id) REFERENCES Ejecutivo(id_ejecutivo)
);