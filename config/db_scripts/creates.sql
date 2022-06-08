/* Database */
CREATE DATABASE sistema;

USE sistema;

/* Tables */
CREATE TABLE Vehiculo(
    id_vehiculo INT PRIMARY KEY AUTO_INCREMENT,
    numero_certificado_vehiculo VARCHAR(255),
    numero_placa VARCHAR(255) NOT NULL,
    year_vehiculo YEAR NOT NULL,
    marca_vehiculo VARCHAR(255) NOT NULL,
    modelo_vehiculo VARCHAR(255) NOT NULL,
    version_vehiculo VARCHAR(255) NOT NULL,
    tipo_transmision_vehiculo VARCHAR(255) NOT NULL,
    blindaje_boolean_vehiculo BOOLEAN NOT NULL,
    tipo_vehiculo VARCHAR(255) NOT NULL,
    color_vehiculo VARCHAR(255),
    serial_motor VARCHAR(255) NOT NULL,
    serial_carroceria VARCHAR(255) NOT NULL,
    cantidad_pasajero INT,
    capacidad_carga INT,
    cedula_conductor_vehiculo VARCHAR(255),
    tipo_cedula_vehiculo CHAR(5),
    nombre_conductor_vehiculo VARCHAR(255),
    suma_asegurada_vehiculo DECIMAL(20,4),
    tipo_movimiento_vehiculo VARCHAR(255),
    monto_blindaje_vehiculo DECIMAL(20,4),
    grado_blindaje_vehiculo INT,
    obser_deshabilitar_vehiculo VARCHAR(500),
    deshabilitar_vehiculo BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Poliza(
    id_poliza INT PRIMARY KEY AUTO_INCREMENT,
    numero_poliza VARCHAR(255) NOT NULL,
    tomador_asegurado_poliza BOOLEAN NOT NULL,
    tipo_id_rif_tomador CHAR(5) NOT NULL,
    id_rif_tomador VARCHAR(255) NOT NULL,
    nombre_tomador_poliza VARCHAR(255) NOT NULL,
    correo_tomador VARCHAR(255) NOT NULL,
    tipo_ramo_poliza VARCHAR(255),
    tipo_individual_poliza VARCHAR(255) NOT NULL,
    fecha_desde_poliza DATE NOT NULL,
    fecha_hasta_poliza DATE NOT NULL,
    tipo_moneda_poliza VARCHAR(255) NOT NULL,
    tasa_poliza VARCHAR(255),
    prima_neta_poliza DECIMAL(20,4) NOT NULL,
    igtf_poliza DECIMAL(20,4) NOT NULL,
    prima_total_poliza DECIMAL(20,4) NOT NULL,
    estatus_poliza VARCHAR(255),
    tipo_cobertura_poliza DECIMAL(20,4),
    tipo_canal_poliza VARCHAR(255),
    suma_asegurada_poliza DECIMAL(20,4) NOT NULL,
    deducible_poliza DECIMAL(20,4),
    grupo_poliza VARCHAR(255),
    maternidad_poliza VARCHAR(255),
    plazo_espera_poliza VARCHAR(255),
    detalle_cliente_poliza DATE,
    tipo_producto_poliza VARCHAR(255),
    fraccionamiento_boolean_poliza BOOLEAN NOT NULL,
    tipo_fraccionamiento_poliza VARCHAR(255),
    numero_pago_poliza INT,
    obser_deshabilitar_poliza VARCHAR(500),
    deshabilitar_poliza BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Ejecutivo(
    id_ejecutivo INT PRIMARY KEY AUTO_INCREMENT,
    cedula_ejecutivo VARCHAR(255) NOT NULL,
    tipo_cedula_ejecutivo CHAR(5) NOT NULL,
    nombre_ejecutivo VARCHAR(255) NOT NULL,
    apellido_ejecutivo VARCHAR(255) NOT NULL,
    celular_ejecutivo VARCHAR(255) NOT NULL,
    correo_ejecutivo VARCHAR(255) NOT NULL,
    direccion_ejecutivo VARCHAR(500) NOT NULL,
    cargo_ejecutivo VARCHAR(255) NOT NULL,
    departamento_cargo_ejecutivo VARCHAR(255) NOT NULL,
    porcentaje_ejecutivo DECIMAL(10,4) NOT NULL,
    obser_deshabilitar_ejecutivo VARCHAR(500),
    deshabilitar_ejecutivo BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Aseguradora(
    id_aseguradora INT PRIMARY KEY AUTO_INCREMENT,
    rif_aseguradora VARCHAR(255) NOT NULL,
    tipo_rif_aseguradora CHAR(5) NOT NULL,
    nombre_aseguradora VARCHAR(255) NOT NULL,
    direccion_aseguradora VARCHAR(255) NOT NULL,
    telefono_aseguradora VARCHAR(255),
    obser_deshabilitar_aseguradora VARCHAR(500),
    deshabilitar_aseguradora BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Agente_Propio(
    id_agente_propio INT PRIMARY KEY AUTO_INCREMENT,
    cedula_agente_propio VARCHAR(255) NOT NULL,
    tipo_cedula_agente_propio CHAR(5) NOT NULL,
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
    tipo_cedula_beneficiario CHAR(5) NOT NULL,
    fec_nac_beneficiario DATE NOT NULL,
    parentesco_beneficiario VARCHAR(255) NOT NULL,
    direccion_beneficiario VARCHAR(500),
    telefono_beneficiario VARCHAR(255),
    correo_beneficiario VARCHAR(255),
    banco_beneficiario VARCHAR(255),
    tipo_cuenta_beneficiario VARCHAR(255),
    nro_cuenta_beneficiario VARCHAR(500),
    tipo_movimiento_beneficiario VARCHAR(255),
    obser_deshabilitar_beneficiario VARCHAR(500),
    deshabilitar_beneficiario BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Colectivo(
    id_colectivo INT PRIMARY KEY AUTO_INCREMENT,
    numero_colectivo VARCHAR(255) NOT NULL,
    tomador_asegurado_colectivo BOOLEAN NOT NULL,
    tipo_id_rif_tomador CHAR(5) NOT NULL,
    id_rif_tomador VARCHAR(255) NOT NULL,
    nombre_tomador_colectivo VARCHAR(255) NOT NULL,
    correo_tomador VARCHAR(255) NOT NULL,
    tipo_colectivo VARCHAR(255) NOT NULL,
    fecha_desde_colectivo DATE NOT NULL,
    fecha_hasta_colectivo DATE NOT NULL,
    tipo_moneda_colectivo VARCHAR(255) NOT NULL,
    prima_neta_colectivo DECIMAL(20,4) NOT NULL,
    igtf_colectivo DECIMAL(20,4) NOT NULL,
    prima_total_colectivo DECIMAL(20,4) NOT NULL,
    estatus_colectivo VARCHAR(255),
    cobertura_suma_asegurada_colectivo DECIMAL(20,4),
    tipo_canal_colectivo VARCHAR(255),
    deducible_colectivo DECIMAL(20,4),
    grupo_colectivo VARCHAR(255),
    maternidad_colectivo VARCHAR(255),
    plazo_espera_colectivo VARCHAR(255),
    detalle_cliente_colectivo DATE,
    fraccionamiento_boolean_colectivo BOOLEAN NOT NULL,
    tipo_fraccionamiento_colectivo VARCHAR(255),
    numero_pago_colectivo INT,
    obser_deshabilitar_colectivo VARCHAR(500),
    deshabilitar_colectivo BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Riesgo_Diverso(
    id_riesgo_diverso INT PRIMARY KEY AUTO_INCREMENT,
    numero_certificado_riesgo_diverso VARCHAR(255) NOT NULL,
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
    obser_deshabilitar_riesgo_diverso VARCHAR(500),
    deshabilitar_riesgo_diverso BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Usuario(
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    cedula_usuario VARCHAR(255) NOT NULL,
    tipo_cedula_usuario CHAR(5) NOT NULL,
    nombre_apellido_usuario VARCHAR(255) NOT NULL,
    cargo_usuario VARCHAR(255) NOT NULL,
    correo_usuario VARCHAR(255) NOT NULL,
    direccion_usuario VARCHAR(255),
    username VARCHAR(255),
    password_usuario VARCHAR(255) NOT NULL,
    obser_deshabilitar_usuario VARCHAR(500),
    deshabilitar_usuario BOOLEAN NOT NULL DEFAULT FALSE,
    ejecutivo_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_usuario_ejecutivo_id(ejecutivo_id) REFERENCES Ejecutivo(id_ejecutivo)
);

CREATE TABLE Recibo(
    id_recibo INT PRIMARY KEY AUTO_INCREMENT,
    numero_recibo VARCHAR(255) NOT NULL,
    tipo_recibo VARCHAR(255) NOT NULL,
    fecha_desde_recibo DATE NOT NULL,
    fecha_hasta_recibo DATE NOT NULL, 
    prima_neta_recibo DECIMAL(20,4) NOT NULL,
    igtf_recibo DECIMAL(20,4) NOT NULL,
    prima_total_recibo DECIMAL(20,4) NOT NULL,
    fecha_pago_recibo DATE NOT NULL,
    metodo_pago_recibo VARCHAR(255) NOT NULL,
    monto_comision_recibo DECIMAL(20,4) NOT NULL,
    obser_deshabilitar_recibo VARCHAR(500),
    deshabilitar_recibo BOOLEAN NOT NULL DEFAULT FALSE,
    poliza_id INT,
    colectivo_id INT,
    CONSTRAINT FOREIGN KEY fk_recibo_poliza_id(poliza_id) REFERENCES Poliza(id_poliza),
    CONSTRAINT FOREIGN KEY fk_recibo_colectivo_id(colectivo_id) REFERENCES Colectivo(id_colectivo)
);

CREATE TABLE Distribucion(
    id_distribucion INT PRIMARY KEY AUTO_INCREMENT,
    monto_comision_distribucion DECIMAL(20,4) NOT NULL,
    porcentaje_bonificacion_distribucion DECIMAL(10,4) NOT NULL,
    monto_bonificacion_distribucion DECIMAL(20,4) NOT NULL,
    monto_comision_bonificacion DECIMAL(20,4) NOT NULL,
    porcentaje_islr_distribucion DECIMAL(10,4) NOT NULL,
    total_comision_distribuir DECIMAL(20,4) NOT NULL,
    porcentaje_agente_distribucion DECIMAL(10,4) NOT NULL,
    caso_especial_distribucion DECIMAL(10,4),
    porcentaje_atina_distribucion DECIMAL(10,4) NOT NULL,
    porcentaje_fundatina_distribucion DECIMAL(10,4) NOT NULL,
    porcentaje_director_distribucion DECIMAL(10,4) NOT NULL,
    porcentaje_socio_distribucion DECIMAL(10,4) NOT NULL,
    porcentaje_gerente_distribucion DECIMAL(10,4) NOT NULL,
    porcentaje_coordinador_suscripcion DECIMAL(10,4) NOT NULL,
    porcentaje_coordinador_reclamo DECIMAL(10,4) NOT NULL,
    porcentaje_coordinador_administracion DECIMAL(10,4) NOT NULL,
    porcentaje_ejecutivo_suscripcion DECIMAL(10,4) NOT NULL,
    porcentaje_ejecutivo_reclamo DECIMAL(10,4) NOT NULL,
    porcentaje_ejecutivo_cobranza DECIMAL(10,4) NOT NULL,
    deshabilitar_distribucion BOOLEAN NOT NULL DEFAULT FALSE,
    recibo_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_distribucion_recibo_id(recibo_id) REFERENCES Recibo(id_recibo)
);

CREATE TABLE Asegurado_Persona_Natural(
    id_asegurado_per_nat INT PRIMARY KEY AUTO_INCREMENT,
    cedula_asegurado_per_nat VARCHAR(255) NOT NULL,
    tipo_cedula_asegurado_per_nat CHAR(5) NOT NULL,
    nombre_asegurado_per_nat VARCHAR(255) NOT NULL,
    apellido_asegurado_per_nat VARCHAR(255) NOT NULL,
    fec_nac_per_nat DATE NOT NULL,
    telefono_asegurado_per_nat VARCHAR(255),
    correo_asegurado_per_nat VARCHAR(255) NOT NULL,
    celular_per_nat VARCHAR(255) NOT NULL,
    nombre_emergencia_per_nat VARCHAR(255),
    telefono_emergencia_per_nat VARCHAR(255),
    direccion_asegurado_per_nat VARCHAR(500) NOT NULL,
    obser_deshabilitar_per_nat VARCHAR(500),
    deshabilitar_asegurado_per_nat BOOLEAN NOT NULL DEFAULT FALSE,
    agente_propio_id INT,
    CONSTRAINT FOREIGN KEY fk_natural_agente_propio_id(agente_propio_id) REFERENCES Agente_Propio(id_agente_propio)
);

CREATE TABLE Asegurado_Persona_Juridica(
    id_asegurado_per_jur INT PRIMARY KEY AUTO_INCREMENT,
    rif_asegurado_per_jur VARCHAR(255) NOT NULL,
    tipo_rif_asegurado_per_jur CHAR(5) NOT NULL,
    razon_social_per_jur VARCHAR(255) NOT NULL,
    telefono_asegurado_per_jur VARCHAR(255) NOT NULL,
    telefono_opcional_per_jur VARCHAR(255),
    celular_asegurado_per_jur VARCHAR(255) NOT NULL,
    nombre_contacto_per_jur VARCHAR(255),
    cargo_contacto_per_jur VARCHAR(255),
    celular_contacto_per_jur VARCHAR(255),
    correo_contacto_per_jur VARCHAR(255),
    correo_asegurado_per_jur VARCHAR(255) NOT NULL,
    correo_opcional_per_jur VARCHAR(255),
    direccion_asegurado_per_jur VARCHAR(500) NOT NULL,
    obser_deshabilitar_per_jur VARCHAR(500),
    deshabilitar_asegurado_per_jur BOOLEAN NOT NULL DEFAULT FALSE,
    agente_propio_id INT,
    CONSTRAINT FOREIGN KEY fk_juridica_agente_propio_id(agente_propio_id) REFERENCES Agente_Propio(id_agente_propio)
);

CREATE TABLE Asegurado_Beneficiario(
    id_asegurado_beneficiario INT PRIMARY KEY AUTO_INCREMENT,
    desahabilitar_asegurado_beneficiario BOOLEAN NOT NULL DEFAULT FALSE,
    asegurado_per_nat_id INT,
    asegurado_per_jur_id INT,
    beneficiario_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_ab_beneficiario_id(beneficiario_id) REFERENCES Beneficiario(id_beneficiario),
    CONSTRAINT FOREIGN KEY fk_ab_asegurado_per_nat_id(asegurado_per_nat_id) REFERENCES Asegurado_Persona_Natural(id_asegurado_per_nat),
    CONSTRAINT FOREIGN KEY fk_ab_asegurado_per_jur_id(asegurado_per_jur_id) REFERENCES Asegurado_Persona_Juridica(id_asegurado_per_jur)
);

CREATE TABLE Poliza_Aseguradora_Asegurado(
    id_paa INT PRIMARY KEY AUTO_INCREMENT,
    deshabilitar_paa BOOLEAN NOT NULL DEFAULT FALSE,
    poliza_id INT NOT NULL,
    aseguradora_id INT NOT NULL,
    asegurado_per_nat_id INT,
    asegurado_per_jur_id INT,
    CONSTRAINT FOREIGN KEY fk_paa_poliza_id(poliza_id) REFERENCES Poliza(id_poliza),
    CONSTRAINT FOREIGN KEY fk_paa_aseguradora_id(aseguradora_id) REFERENCES Aseguradora(id_aseguradora),
    CONSTRAINT FOREIGN KEY fk_paa_asegurado_per_nat_id(asegurado_per_nat_id) REFERENCES Asegurado_Persona_Natural(id_asegurado_per_nat),
    CONSTRAINT FOREIGN KEY fk_paa_asegurado_per_jur_id(asegurado_per_jur_id) REFERENCES Asegurado_Persona_Juridica(id_asegurado_per_jur)
);

CREATE TABLE Colectivo_Aseguradora_Asegurado(
    id_caa INT PRIMARY KEY AUTO_INCREMENT,
    deshabilitar_caa BOOLEAN NOT NULL DEFAULT FALSE,
    colectivo_id INT NOT NULL,
    aseguradora_id INT NOT NULL,
    asegurado_per_nat_id INT,
    asegurado_per_jur_id INT,
    CONSTRAINT FOREIGN KEY fk_caa_colectivo_id(colectivo_id) REFERENCES Colectivo(id_colectivo),
    CONSTRAINT FOREIGN KEY fk_caa_aseguradora_id(aseguradora_id) REFERENCES Aseguradora(id_aseguradora),
    CONSTRAINT FOREIGN KEY fk_caa_asegurado_per_nat_id(asegurado_per_nat_id) REFERENCES Asegurado_Persona_Natural(id_asegurado_per_nat),
    CONSTRAINT FOREIGN KEY fk_caa_asegurado_per_jur_id(asegurado_per_jur_id) REFERENCES Asegurado_Persona_Juridica(id_asegurado_per_jur)
);

CREATE TABLE Poliza_Agente_Propio(
    id_pap INT PRIMARY KEY AUTO_INCREMENT,
    deshabilitar_pap BOOLEAN NOT NULL DEFAULT FALSE,
    poliza_id INT NOT NULL,
    agente_propio_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_pap_poliza_id(poliza_id) REFERENCES Poliza(id_poliza),
    CONSTRAINT FOREIGN KEY fk_pap_agente_propio_id(agente_propio_id) REFERENCES Agente_Propio(id_agente_propio)
);

CREATE TABLE Colectivo_Agente_Propio(
    id_cap INT PRIMARY KEY AUTO_INCREMENT,
    deshabilitar_cap BOOLEAN NOT NULL DEFAULT FALSE,
    colectivo_id INT NOT NULL,
    agente_propio_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_cap_colectivo_id(colectivo_id) REFERENCES Colectivo(id_colectivo),
    CONSTRAINT FOREIGN KEY fk_cap_agente_propio_id(agente_propio_id) REFERENCES Agente_Propio(id_agente_propio)
);

CREATE TABLE Pol_Aseg_Asegurado_Benef(
    id_paab INT PRIMARY KEY AUTO_INCREMENT,
    deshabilitar_paab BOOLEAN NOT NULL DEFAULT FALSE,
    paa_id INT NOT NULL,
    beneficiario_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_paab_paa_id(paa_id) REFERENCES Poliza_Aseguradora_Asegurado(id_paa),
    CONSTRAINT FOREIGN KEY fk_paab_beneficiario_id(beneficiario_id) REFERENCES Beneficiario(id_beneficiario)
);

CREATE TABLE Col_Aseg_Asegurado_Benef(
    id_caab INT PRIMARY KEY AUTO_INCREMENT,
    deshabilitar_caab BOOLEAN NOT NULL DEFAULT FALSE,
    caa_id INT NOT NULL,
    beneficiario_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_caab_caa_id(caa_id) REFERENCES Colectivo_Aseguradora_Asegurado(id_caa),
    CONSTRAINT FOREIGN KEY fk_caab_beneficiario_id(beneficiario_id) REFERENCES Beneficiario(id_beneficiario)
);

CREATE TABLE Reembolso(
    id_reembolso INT PRIMARY KEY AUTO_INCREMENT,
    patologia_reembolso VARCHAR(255) NOT NULL,
    fecha_ocurrencia_reembolso DATE NOT NULL,
    fecha_notificacion_reembolso DATE NOT NULL,
    monto_reclamo_reembolso DECIMAL(20,4) NOT NULL,
    monto_pagado_reembolso DECIMAL(20,4),
    observacion_reembolso VARCHAR(500) NOT NULL,
    tipo_moneda_reembolso VARCHAR(255) NOT NULL,
    obser_deshabilitar_reembolso VARCHAR(500),
    estatus_reembolso VARCHAR(255) NOT NULL,
    numero_siniestro_reembolso VARCHAR(255) NOT NULL,
    deshabilitar_reembolso BOOLEAN NOT NULL DEFAULT FALSE,
    asegurado_beneficiario_id INT NOT NULL,
    poliza_id INT,
    colectivo_id INT,
    CONSTRAINT FOREIGN KEY fk_reembolso_asegurado_beneficiario_id(asegurado_beneficiario_id) REFERENCES Asegurado_Beneficiario(id_asegurado_beneficiario),
    CONSTRAINT FOREIGN KEY fk_reembolso_poliza_id(poliza_id) REFERENCES Poliza(id_poliza),
    CONSTRAINT FOREIGN KEY fk_reembolso_colectivo_id(colectivo_id) REFERENCES Colectivo(id_colectivo)
);

CREATE TABLE AMP(
    id_amp INT PRIMARY KEY AUTO_INCREMENT,
    patologia_amp VARCHAR(255) NOT NULL,
    clinica_amp VARCHAR(255) NOT NULL,
    fecha_ocurrencia_amp DATE NOT NULL,
    fecha_notificacion_amp DATE NOT NULL,
    monto_reclamado_amp DECIMAL(20,4) NOT NULL,
    monto_pagado_amp DECIMAL(20,4),
    observacion_amp VARCHAR(500) NOT NULL,
    tipo_moneda_amp VARCHAR(255) NOT NULL,
    obser_deshabilitar_amp VARCHAR(500),
    estatus_amp VARCHAR(255) NOT NULL,
    numero_siniestro_amp VARCHAR(255) NOT NULL,
    deshabilitar_amp BOOLEAN NOT NULL DEFAULT FALSE,
    asegurado_beneficiario_id INT NOT NULL,
    poliza_id INT,
    colectivo_id INT,
    CONSTRAINT FOREIGN KEY fk_amp_asegurado_beneficiario_id(asegurado_beneficiario_id) REFERENCES Asegurado_Beneficiario(id_asegurado_beneficiario),
    CONSTRAINT FOREIGN KEY fk_amp_poliza_id(poliza_id) REFERENCES Poliza(id_poliza),
    CONSTRAINT FOREIGN KEY fk_amp_colectivo_id(colectivo_id) REFERENCES Colectivo(id_colectivo)
);

CREATE TABLE Emergencia(
    id_emergencia INT PRIMARY KEY AUTO_INCREMENT,
    patologia_emergencia VARCHAR(255) NOT NULL,
    clinica_emergencia VARCHAR(255) NOT NULL,
    fecha_ocurrencia_emergencia DATE NOT NULL,
    fecha_notificacion_emergencia DATE NOT NULL,
    monto_reclamado_emergencia DECIMAL(20,4) NOT NULL,
    monto_pagado_emergencia DECIMAL(20,4),
    observacion_emergencia VARCHAR(500) NOT NULL,
    tipo_moneda_emergencia VARCHAR(255) NOT NULL,
    obser_deshabilitar_emergencia VARCHAR(500),
    estatus_emergencia VARCHAR(255) NOT NULL,
    numero_siniestro_emergencia VARCHAR(255) NOT NULL,
    deshabilitar_emergencia BOOLEAN NOT NULL DEFAULT FALSE,
    asegurado_beneficiario_id INT NOT NULL,
    poliza_id INT,
    colectivo_id INT,
    CONSTRAINT FOREIGN KEY fk_emergencia_asegurado_beneficiario_id(asegurado_beneficiario_id) REFERENCES Asegurado_Beneficiario(id_asegurado_beneficiario),
    CONSTRAINT FOREIGN KEY fk_emergencia_poliza_id(poliza_id) REFERENCES Poliza(id_poliza),
    CONSTRAINT FOREIGN KEY fk_emergencia_colectivo_id(colectivo_id) REFERENCES Colectivo(id_colectivo)
);

CREATE TABLE Carta_Aval(
    id_carta_aval INT PRIMARY KEY AUTO_INCREMENT,
    patologia_carta_aval VARCHAR(255) NOT NULL,
    clinica_carta_aval VARCHAR(255) NOT NULL,
    fecha_ocurrencia_carta_aval DATE NOT NULL,
    fecha_notificacion_carta_aval DATE NOT NULL,
    monto_reclamado_carta_aval DECIMAL(20,4) NOT NULL,
    monto_pagado_carta_aval DECIMAL(20,4),
    observacion_carta_aval VARCHAR(500) NOT NULL,
    tipo_moneda_carta_aval VARCHAR(255) NOT NULL,
    obser_deshabilitar_carta_aval VARCHAR(500),
    estatus_carta_aval VARCHAR(255) NOT NULL,
    numero_siniestro_carta_aval VARCHAR(255) NOT NULL,
    deshabilitar_carta_aval BOOLEAN NOT NULL DEFAULT FALSE,
    asegurado_beneficiario_id INT NOT NULL,
    poliza_id INT,
    colectivo_id INT,
    CONSTRAINT FOREIGN KEY fk_carta_asegurado_beneficiario_id(asegurado_beneficiario_id) REFERENCES Asegurado_Beneficiario(id_asegurado_beneficiario),
    CONSTRAINT FOREIGN KEY fk_carta_poliza_id(poliza_id) REFERENCES Poliza(id_poliza),
    CONSTRAINT FOREIGN KEY fk_carta_colectivo_id(colectivo_id) REFERENCES Colectivo(id_colectivo)
);

CREATE TABLE Pol_Aseg_Asegurado_Vehi(
    id_paav INT PRIMARY KEY AUTO_INCREMENT,
    deshabilitar_paav BOOLEAN NOT NULL DEFAULT FALSE,
    paa_id INT NOT NULL,
    vehiculo_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_paav_paa_id(paa_id) REFERENCES Poliza_Aseguradora_Asegurado(id_paa),
    CONSTRAINT FOREIGN KEY fk_paav_vehiculo_id(vehiculo_id) REFERENCES Vehiculo(id_vehiculo)
);

CREATE TABLE Col_Aseg_Asegurado_Vehi(
    id_caav INT PRIMARY KEY AUTO_INCREMENT,
    deshabilitar_caav BOOLEAN NOT NULL DEFAULT FALSE,
    caa_id INT NOT NULL,
    vehiculo_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_caav_caa_id(caa_id) REFERENCES Colectivo_Aseguradora_Asegurado(id_caa),
    CONSTRAINT FOREIGN KEY fk_caav_vehiculo_id(vehiculo_id) REFERENCES Vehiculo(id_vehiculo)
);

CREATE TABLE Col_Aseg_Asegurado_Ries_Diver(
    id_caard INT PRIMARY KEY AUTO_INCREMENT,
    deshabilitar_caard BOOLEAN NOT NULL DEFAULT FALSE,
    caa_id INT NOT NULL,
    riesgo_diverso_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_caard_caa_id(caa_id) REFERENCES Colectivo_Aseguradora_Asegurado(id_caa),
    CONSTRAINT FOREIGN KEY fk_caard_riesgo_diverso_id(riesgo_diverso_id) REFERENCES Riesgo_Diverso(id_riesgo_diverso)
);

CREATE TABLE Pol_Aseg_Asegurado_Ejecu(
    id_paae INT PRIMARY KEY AUTO_INCREMENT,
    deshabilitar_paae BOOLEAN NOT NULL DEFAULT FALSE,
    paa_id INT NOT NULL,
    ejecutivo_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_paae_paa_id(paa_id) REFERENCES Poliza_Aseguradora_Asegurado(id_paa),
    CONSTRAINT FOREIGN KEY fk_paae_ejecutivo_id(ejecutivo_id) REFERENCES Ejecutivo(id_ejecutivo)
);

CREATE TABLE Col_Aseg_Asegurado_Ejecu(
    id_caae INT PRIMARY KEY AUTO_INCREMENT,
    deshabilitar_caae BOOLEAN NOT NULL DEFAULT FALSE,
    caa_id INT NOT NULL,
    ejecutivo_id INT NOT NULL,
    CONSTRAINT FOREIGN KEY fk_caae_caa_id(caa_id) REFERENCES Colectivo_Aseguradora_Asegurado(id_caa),
    CONSTRAINT FOREIGN KEY fk_caae_ejecutivo_id(ejecutivo_id) REFERENCES Ejecutivo(id_ejecutivo)
);