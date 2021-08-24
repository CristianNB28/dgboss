/* Tabla Usuario */
INSERT INTO `Usuario` (`cedula_usuario`, `rif_usuario`, `nombre_usuario`, `username`, `password_usuario`, `correo_usuario`, `telefono_usuario`, `direccion_usuario`, `cargo_usuario`, `productor_boolean`, `administrador_boolean`, `tipo_linea_negocio`) 
    VALUES ('23421423', NULL, 'Jose Torres', 'jtorrestest', '$2a$08$UZQKsUcKvKCLw3q7XibY8e2029a0GbS.uQMjGAmWqOChexlj73obe', 'jt@test.com', NULL, NULL, NULL, 0, 1, 'Persona');
/* Tabla Rol */
INSERT INTO `Rol` (`nombre_rol`, `descripcion_rol`)
    VALUES ('Analista', 'Analista');
INSERT INTO `Rol` (`nombre_rol`, `descripcion_rol`)
    VALUES ('Cliente', 'Cliente App');
INSERT INTO `Rol` (`nombre_rol`, `descripcion_rol`)
    VALUES ('Ejecutivo', 'Ejecutivo de Cuentas');
INSERT INTO `Rol` (`nombre_rol`, `descripcion_rol`)
    VALUES ('Administrativo', 'Administrativo');
/* Tabla Usuario_Rol */
INSERT INTO `Usuario_Rol` (`usuario_id`, `rol_id`)
    VALUES (1, 4);