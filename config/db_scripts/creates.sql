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
    obser_deshabilitar_usuario VARCHAR(500),
    deshabilitar_usuario BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Rol(
    id_rol INT PRIMARY KEY AUTO_INCREMENT,
    nombre_rol VARCHAR(255) NOT NULL,
    descripcion_rol VARCHAR(255) NOT NULL,
    obser_deshabilitar_rol VARCHAR(500),
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
    suma_asegurada_vehiculo DECIMAL(20,4),
    tipo_movimiento_vehiculo VARCHAR(255),
    deshabilitar_vehiculo BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Poliza(
    id_poliza INT PRIMARY KEY AUTO_INCREMENT,
    numero_poliza VARCHAR(255) NOT NULL,
    tomador_asegurado_poliza BOOLEAN NOT NULL,
    nombre_tomador_poliza VARCHAR(255) NOT NULL,
    tipo_ramo_poliza VARCHAR(255),
    tipo_individual_poliza VARCHAR(255) NOT NULL,
    fecha_desde_poliza DATE NOT NULL,
    fecha_hasta_poliza DATE NOT NULL,
    tipo_moneda_poliza VARCHAR(255) NOT NULL,
    tasa_poliza DECIMAL(10,4),
    prima_anual_poliza DECIMAL(20,4) NOT NULL,
    estatus_poliza VARCHAR(255),
    tipo_cobertura_poliza VARCHAR(255),
    tipo_canal_poliza VARCHAR(255),
    suma_asegurada_poliza DECIMAL(20,4) NOT NULL,
    deducible_poliza DECIMAL(20,4),
    grupo_poliza VARCHAR(255),
    maternidad_poliza VARCHAR(255),
    plazo_espera_poliza VARCHAR(255),
    detalle_cliente_poliza VARCHAR(255),
    obser_deshabilitar_poliza VARCHAR(500),
    tipo_producto_poliza VARCHAR(255),
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
    tipo_ejecutivo VARCHAR(255) NOT NULL,
    obser_deshabilitar_ejecutivo VARCHAR(500),
    deshabilitar_ejecutivo BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Aseguradora(
    id_aseguradora INT PRIMARY KEY AUTO_INCREMENT,
    rif_aseguradora VARCHAR(255) NOT NULL,
    nombre_aseguradora VARCHAR(255) NOT NULL,
    direccion_aseguradora VARCHAR(255) NOT NULL,
    telefono_aseguradora VARCHAR(255),
    obser_deshabilitar_aseguradora VARCHAR(500),
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
    porcentaje_agente_propio DECIMAL(10,4) NOT NULL,
    obser_deshabilitar_agente_propio VARCHAR(500),
    deshabilitar_agente_propio BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Beneficiario(
    id_beneficiario INT PRIMARY KEY AUTO_INCREMENT,
    nombre_beneficiario VARCHAR(255) NOT NULL,
    apellido_beneficiario VARCHAR(255) NOT NULL,
    cedula_beneficiario VARCHAR(255) NOT NULL,
    fec_nac_beneficiario DATE NOT NULL,
    parentesco_beneficiario VARCHAR(255) NOT NULL,
    direccion_beneficiario VARCHAR(500),
    telefono_beneficiario VARCHAR(255),
    correo_beneficiario VARCHAR(255),
    banco_beneficiario VARCHAR(255),
    tipo_cuenta_beneficiario VARCHAR(255),
    nro_cuenta_beneficiario VARCHAR(500),
    tipo_movimiento_beneficiario VARCHAR(255),
    deshabilitar_beneficiario BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Colectivo(
    id_colectivo INT PRIMARY KEY AUTO_INCREMENT,
    numero_colectivo VARCHAR(255) NOT NULL,
    nombre_tomador_colectivo VARCHAR(255) NOT NULL,
    tipo_colectivo VARCHAR(255) NOT NULL,
    fecha_desde_colectivo DATE NOT NULL,
    fecha_hasta_colectivo DATE NOT NULL,
    tipo_moneda_colectivo VARCHAR(255) NOT NULL,
    prima_anual_colectivo DECIMAL(20,4) NOT NULL,
    estatus_colectivo VARCHAR(255),
    cobertura_colectivo VARCHAR(255),
    tipo_canal_colectivo VARCHAR(255),
    deducible_colectivo DECIMAL(20,4),
    grupo_colectivo VARCHAR(255) NOT NULL,
    maternidad_colectivo VARCHAR(255),
    plazo_espera_colectivo VARCHAR(255),
    detalle_cliente_colectivo VARCHAR(255),
    obser_deshabilitar_colectivo VARCHAR(500),
    deshabilitar_colectivo BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Riesgo_Diverso(
    id_riesgo_diverso INT PRIMARY KEY AUTO_INCREMENT,
    nom_razon_riesgo_diverso VARCHAR(255) NOT NULL,
    cedula_riesgo_diverso VARCHAR(255),
    rif_riesgo_diverso VARCHAR(255),
    direccion_riesgo_diverso VARCHAR(500) NOT NULL,
    telefono_riesgo_diverso VARCHAR(255) NOT NULL,
    correo_riesgo_diverso VARCHAR(255) NOT NULL,
    suma_asegurada_riesgo_diverso DECIMAL(20,4) NOT NULL,
    modelo_riesgo_diverso VARCHAR(255) NOT NULL,
    serial_riesgo_diverso VARCHAR(255) NOT NULL,
    tipo_movimiento_riesgo_diverso VARCHAR(255),
    deshabilitar_riesgo_diverso BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Recibo(
    id_recibo INT PRIMARY KEY AUTO_INCREMENT,
    numero_recibo INT NOT NULL,
    tipo_recibo VARCHAR(255) NOT NULL,
    fecha_desde_recibo DATE NOT NULL,
    fecha_hasta_recibo DATE NOT NULL,
    fraccionamiento_boolean_recibo BOOLEAN NOT NULL,
    tipo_fraccionamiento_recibo VARCHAR(255),
    metodo_pago_recibo VARCHAR(255) NOT NULL, 
    monto_prima_recibo DECIMAL(20,4) NOT NULL,
    monto_comision_recibo DECIMAL(20,4) NOT NULL,
    numero_pago_recibo INT,
    deshabilitar_recibo BOOLEAN NOT NULL DEFAULT FALSE,
    poliza_id INT,
    colectivo_id INT,
    CONSTRAINT FOREIGN KEY fk_poliza_id(poliza_id) REFERENCES Poliza(id_poliza),
    CONSTRAINT FOREIGN KEY fk_colectivo_id(colectivo_id) REFERENCES Colectivo(id_colectivo)
);

CREATE TABLE Comision(
    id_comision INT PRIMARY KEY AUTO_INCREMENT,
    porcentaje_agente_comision DECIMAL(10,4) NOT NULL,
    caso_especial_comision DECIMAL(10,4),
    porcentaje_ejecutivo_suscripcion DECIMAL(10,4) NOT NULL,
    porcentaje_ejecutivo_siniestro DECIMAL(10,4) NOT NULL,
    porcentaje_ejecutivo_cobranza DECIMAL(10,4) NOT NULL,
    porcentaje_fundatina_comision DECIMAL(10,4) NOT NULL,
    porcentaje_director_comision DECIMAL(10,4) NOT NULL,
    porcentaje_socio_comision DECIMAL(10,4) NOT NULL,
    porcentaje_atina_comision DECIMAL(10,4) NOT NULL,
    monto_comision_comision DECIMAL(20,4) NOT NULL,
    deshabilitar_comision BOOLEAN NOT NULL DEFAULT FALSE,
    poliza_id INT,
    colectivo_id INT,
    CONSTRAINT FOREIGN KEY fk_poliza_id(poliza_id) REFERENCES Poliza(id_poliza),
    CONSTRAINT FOREIGN KEY fk_colectivo_id(colectivo_id) REFERENCES Colectivo(id_colectivo)
);

CREATE TABLE Factor_Verificacion(
    id_factor_verificacion INT PRIMARY KEY AUTO_INCREMENT,
    porcentaje_prima_factor_verificacion DECIMAL(10,4) NOT NULL,
    estatus_comision_factor_verificacion VARCHAR(255) NOT NULL,
    comision_id INT,
    CONSTRAINT FOREIGN KEY fk_comision_id(comision_id) REFERENCES Comision(id_comision)
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
    obser_deshabilitar_per_nat VARCHAR(500),
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
    cargo_contacto_per_jur VARCHAR(255),
    correo_asegurado_per_jur VARCHAR(255) NOT NULL,
    correo_opcional_per_jur VARCHAR(255) NOT NULL,
    direccion_asegurado_per_jur VARCHAR(500) NOT NULL,
    obser_deshabilitar_per_jur VARCHAR(500),
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

CREATE TABLE Colectivo_Aseguradora_Asegurado(
    id_caa INT PRIMARY KEY AUTO_INCREMENT,
    deshabilitar_caa BOOLEAN NOT NULL DEFAULT FALSE,
    colectivo_id INT NOT NULL,
    aseguradora_id INT NOT NULL,
    asegurado_per_nat_id INT,
    asegurado_per_jur_id INT,
    CONSTRAINT FOREIGN KEY fk_colectivo_id(colectivo_id) REFERENCES Colectivo(id_colectivo),
    CONSTRAINT FOREIGN KEY fk_aseguradora_id(aseguradora_id) REFERENCES Aseguradora(id_aseguradora),
    CONSTRAINT FOREIGN KEY fk_asegurado_per_nat_id(asegurado_per_nat_id) REFERENCES Asegurado_Persona_Natural(id_asegurado_per_nat),
    CONSTRAINT FOREIGN KEY fk_asegurado_per_jur_id(asegurado_per_jur_id) REFERENCES Asegurado_Persona_Juridica(id_asegurado_per_jur)
);

CREATE TABLE Pol_Aseg_Asegurado_Benef(
    id_paab INT PRIMARY KEY AUTO_INCREMENT,
    deshabilitar_paab BOOLEAN NOT NULL DEFAULT FALSE,
    paa_id INT NOT NULL,
    beneficiario_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_paa_id(paa_id) REFERENCES Poliza_Aseguradora_Asegurado(id_paa),
    CONSTRAINT FOREIGN KEY fk_beneficiario_id(beneficiario_id) REFERENCES Beneficiario(id_beneficiario)
);

CREATE TABLE Col_Aseg_Asegurado_Benef(
    id_caab INT PRIMARY KEY AUTO_INCREMENT,
    deshabilitar_caab BOOLEAN NOT NULL DEFAULT FALSE,
    caa_id INT NOT NULL,
    beneficiario_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_caa_id(caa_id) REFERENCES Colectivo_Aseguradora_Asegurado(id_caa),
    CONSTRAINT FOREIGN KEY fk_beneficiario_id(beneficiario_id) REFERENCES Beneficiario(id_beneficiario)
);

CREATE TABLE Reembolso(
    id_reembolso INT PRIMARY KEY AUTO_INCREMENT,
    patologia_reembolso VARCHAR(255) NOT NULL,
    fecha_ocurrencia_reembolso DATE NOT NULL,
    fecha_notificacion_reembolso DATE NOT NULL,
    monto_reclamo_reembolso DECIMAL(10,4) NOT NULL,
    monto_pagado_reembolso DECIMAL(10,4),
    observacion_reembolso VARCHAR(500) NOT NULL,
    tipo_moneda_reembolso VARCHAR(255) NOT NULL,
    obser_deshabilitar_reembolso VARCHAR(500),
    estatus_reembolso VARCHAR(255) NOT NULL,
    siniestro_nombre_reembolso VARCHAR(255) NOT NULL,
    deshabilitar_reembolso BOOLEAN NOT NULL DEFAULT FALSE,
    asegurado_per_nat_id INT,
    asegurado_per_jur_id INT,
    CONSTRAINT FOREIGN KEY fk_asegurado_per_nat_id(asegurado_per_nat_id) REFERENCES Asegurado_Persona_Natural(id_asegurado_per_nat),
    CONSTRAINT FOREIGN KEY fk_asegurado_per_jur_id(asegurado_per_jur_id) REFERENCES Asegurado_Persona_Juridica(id_asegurado_per_jur)
);

CREATE TABLE AMP(
    id_amp INT PRIMARY KEY AUTO_INCREMENT,
    patologia_amp VARCHAR(255) NOT NULL,
    clinica_amp VARCHAR(255) NOT NULL,
    fecha_ocurrencia_amp DATE NOT NULL,
    fecha_notificacion_amp DATE NOT NULL,
    monto_reclamado_amp DECIMAL(10,4) NOT NULL,
    monto_pagado_amp DECIMAL(10,4),
    observacion_amp VARCHAR(500) NOT NULL,
    tipo_moneda_amp VARCHAR(255) NOT NULL,
    obser_deshabilitar_amp VARCHAR(500),
    estatus_amp VARCHAR(255) NOT NULL,
    siniestro_nombre_amp VARCHAR(255) NOT NULL,
    deshabilitar_amp BOOLEAN NOT NULL DEFAULT FALSE,
    asegurado_per_nat_id INT,
    asegurado_per_jur_id INT,
    CONSTRAINT FOREIGN KEY fk_asegurado_per_nat_id(asegurado_per_nat_id) REFERENCES Asegurado_Persona_Natural(id_asegurado_per_nat),
    CONSTRAINT FOREIGN KEY fk_asegurado_per_jur_id(asegurado_per_jur_id) REFERENCES Asegurado_Persona_Juridica(id_asegurado_per_jur)
);

CREATE TABLE Emergencia(
    id_emergencia INT PRIMARY KEY AUTO_INCREMENT,
    patologia_emergencia VARCHAR(255) NOT NULL,
    clinica_emergencia VARCHAR(255) NOT NULL,
    fecha_ocurrencia_emergencia DATE NOT NULL,
    fecha_notificacion_emergencia DATE NOT NULL,
    monto_reclamado_emergencia DECIMAL(10,4) NOT NULL,
    monto_pagado_emergencia DECIMAL(10,4),
    observacion_emergencia VARCHAR(500) NOT NULL,
    tipo_moneda_emergencia VARCHAR(255) NOT NULL,
    obser_deshabilitar_emergencia VARCHAR(500),
    estatus_emergencia VARCHAR(255) NOT NULL,
    siniestro_nombre_emergencia VARCHAR(255) NOT NULL,
    deshabilitar_emergencia BOOLEAN NOT NULL DEFAULT FALSE,
    asegurado_per_nat_id INT,
    asegurado_per_jur_id INT,
    CONSTRAINT FOREIGN KEY fk_asegurado_per_nat_id(asegurado_per_nat_id) REFERENCES Asegurado_Persona_Natural(id_asegurado_per_nat),
    CONSTRAINT FOREIGN KEY fk_asegurado_per_jur_id(asegurado_per_jur_id) REFERENCES Asegurado_Persona_Juridica(id_asegurado_per_jur)
);

CREATE TABLE Carta_Aval(
    id_carta_aval INT PRIMARY KEY AUTO_INCREMENT,
    patologia_carta_aval VARCHAR(255) NOT NULL,
    clinica_carta_aval VARCHAR(255) NOT NULL,
    fecha_ocurrencia_carta_aval DATE NOT NULL,
    fecha_notificacion_carta_aval DATE NOT NULL,
    monto_reclamado_carta_aval DECIMAL(10,4) NOT NULL,
    monto_pagado_carta_aval DECIMAL(10,4),
    observacion_carta_aval VARCHAR(500) NOT NULL,
    tipo_moneda_carta_aval VARCHAR(255) NOT NULL,
    obser_deshabilitar_carta_aval VARCHAR(500),
    estatus_carta_aval VARCHAR(255) NOT NULL,
    siniestro_nombre_carta_aval VARCHAR(255) NOT NULL,
    deshabilitar_carta_aval BOOLEAN NOT NULL DEFAULT FALSE,
    asegurado_per_nat_id INT,
    asegurado_per_jur_id INT,
    CONSTRAINT FOREIGN KEY fk_asegurado_per_nat_id(asegurado_per_nat_id) REFERENCES Asegurado_Persona_Natural(id_asegurado_per_nat),
    CONSTRAINT FOREIGN KEY fk_asegurado_per_jur_id(asegurado_per_jur_id) REFERENCES Asegurado_Persona_Juridica(id_asegurado_per_jur)
);

CREATE TABLE Pol_Aseg_Asegurado_Vehi(
    id_paav INT PRIMARY KEY AUTO_INCREMENT,
    deshabilitar_paav BOOLEAN NOT NULL DEFAULT FALSE,
    paa_id INT NOT NULL,
    vehiculo_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_paa_id(paa_id) REFERENCES Poliza_Aseguradora_Asegurado(id_paa),
    CONSTRAINT FOREIGN KEY fk_vehiculo_id(vehiculo_id) REFERENCES Vehiculo(id_vehiculo)
);

CREATE TABLE Col_Aseg_Asegurado_Vehi(
    id_caav INT PRIMARY KEY AUTO_INCREMENT,
    deshabilitar_caav BOOLEAN NOT NULL DEFAULT FALSE,
    caa_id INT NOT NULL,
    vehiculo_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_caa_id(caa_id) REFERENCES Colectivo_Aseguradora_Asegurado(id_caa),
    CONSTRAINT FOREIGN KEY fk_vehiculo_id(vehiculo_id) REFERENCES Vehiculo(id_vehiculo)
);

CREATE TABLE Col_Aseg_Asegurado_Ries_Diver(
    id_caard INT PRIMARY KEY AUTO_INCREMENT,
    deshabilitar_caard BOOLEAN NOT NULL DEFAULT FALSE,
    caa_id INT NOT NULL,
    riesgo_diverso_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_caa_id(caa_id) REFERENCES Colectivo_Aseguradora_Asegurado(id_caa),
    CONSTRAINT FOREIGN KEY fk_riesgo_diverso_id(riesgo_diverso_id) REFERENCES Riesgo_Diverso(id_riesgo_diverso)
);

CREATE TABLE Pol_Aseg_Asegurado_Ejecu(
    id_paae INT PRIMARY KEY AUTO_INCREMENT,
    deshabilitar_paae BOOLEAN NOT NULL DEFAULT FALSE,
    paa_id INT NOT NULL,
    ejecutivo_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_paa_id(paa_id) REFERENCES Poliza_Aseguradora_Asegurado(id_paa),
    CONSTRAINT FOREIGN KEY fk_ejecutivo_id(ejecutivo_id) REFERENCES Ejecutivo(id_ejecutivo)
);