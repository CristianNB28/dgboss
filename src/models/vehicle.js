const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getVehicle: (vehicleId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT * 
                                FROM Vehiculo 
                                WHERE id_vehiculo=? AND deshabilitar_vehiculo=0`, 
                [vehicleId],
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
    },
/*                  POST                 */
    postVehicleForm: (blindaje, gradoBlindaje, montoBlindaje, yearVehicle, vehicle) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Vehiculo (numero_placa, year_vehiculo, marca_vehiculo, modelo_vehiculo, version_vehiculo, tipo_transmision_vehiculo, blindaje_boolean_vehiculo, tipo_vehiculo, color_vehiculo, serial_motor, serial_carroceria, cantidad_pasajero, capacidad_carga, cedula_conductor_vehiculo, tipo_cedula_vehiculo, nombre_conductor_vehiculo, monto_blindaje_vehiculo, grado_blindaje_vehiculo)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [vehicle.numero_placa, yearVehicle, vehicle.marca_vehiculo, vehicle.modelo_vehiculo, vehicle.version_vehiculo, vehicle.tipo_transmision_vehiculo, blindaje, vehicle.tipo_vehiculo, vehicle.color_vehiculo, vehicle.serial_motor, vehicle.serial_carroceria, vehicle.cantidad_pasajero, vehicle.capacidad_carga, vehicle.cedula_conductor_vehiculo, vehicle.tipo_cedula_vehiculo, vehicle.nombre_conductor_vehiculo, montoBlindaje, gradoBlindaje],
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
    },
    postVehicleCollectiveForm: (temparray) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Vehiculo (numero_certificado_vehiculo, numero_placa, year_vehiculo, marca_vehiculo, modelo_vehiculo, version_vehiculo, tipo_transmision_vehiculo, blindaje_boolean_vehiculo, tipo_vehiculo, color_vehiculo, serial_motor, serial_carroceria, capacidad_carga, cedula_conductor_vehiculo, tipo_cedula_vehiculo, nombre_conductor_vehiculo, suma_asegurada_vehiculo, tipo_movimiento_vehiculo)
                                VALUES ?`,
                [temparray],
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
    },
/*                  PUT                  */
    updateVehicle: (blindaje, capacidadCarga, sumaAsegurada, yearVehicle, vehicle) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Vehiculo 
                                SET numero_placa=?, year_vehiculo=?, marca_vehiculo=?, modelo_vehiculo=?, version_vehiculo=?, tipo_transmision_vehiculo=?, blindaje_boolean_vehiculo=?, tipo_vehiculo=?, color_vehiculo=?, serial_motor=?, serial_carroceria=?, capacidad_carga=?, cedula_conductor_vehiculo=?, nombre_conductor_vehiculo=?, suma_asegurada_vehiculo=?, tipo_movimiento_vehiculo=?    
                                WHERE id_vehiculo=?`, 
                [vehicle.numero_placa, yearVehicle, vehicle.marca_vehiculo, vehicle.modelo_vehiculo, vehicle.version_vehiculo, vehicle.tipo_transmision_vehiculo, blindaje, vehicle.tipo_vehiculo, vehicle.color_vehiculo, vehicle.serial_motor, vehicle.serial_carroceria, capacidadCarga, vehicle.cedula_conductor_vehiculo, vehicle.nombre_conductor_vehiculo, sumaAsegurada, vehicle.tipo_movimiento_beneficiario, vehicle.id_vehiculo],
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
    },
    updateDisableVehicle: (id, vehicle) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Vehiculo 
                                SET obser_deshabilitar_vehiculo=? 
                                WHERE id_vehiculo=?`, 
                [vehicle.obser_deshabilitar_vehiculo, id],
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
    },
/*               DELETE                  */
    disableVehicle: (id, disableVehicle) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Vehiculo 
                                SET deshabilitar_vehiculo=? 
                                WHERE id_vehiculo=?`,
                [disableVehicle, id],
                (error, rows) => {
                    connection.release();
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(rows);
                });
            });
        });
    }
}