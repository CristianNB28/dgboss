const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getVehicle: (vehicleId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * 
                    FROM Vehiculo 
                    WHERE id_vehiculo=? AND deshabilitar_vehiculo=0`,
            [vehicleId], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postVehicleForm: (blindaje, cedulaConductor, gradoBlindaje, montoBlindaje, yearVehicle, vehicle) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Vehiculo (numero_placa, year_vehiculo, marca_vehiculo, modelo_vehiculo, version_vehiculo, tipo_transmision_vehiculo, blindaje_boolean_vehiculo, tipo_vehiculo, color_vehiculo, serial_motor, serial_carroceria, cantidad_pasajero, capacidad_carga, cedula_conductor_vehiculo, nombre_conductor_vehiculo, monto_blindaje_vehiculo, grado_blindaje_vehiculo)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [vehicle.numero_placa, yearVehicle, vehicle.marca_vehiculo, vehicle.modelo_vehiculo, vehicle.version_vehiculo, vehicle.tipo_transmision_vehiculo, blindaje, vehicle.tipo_vehiculo, vehicle.color_vehiculo, vehicle.serial_motor, vehicle.serial_carroceria, vehicle.cantidad_pasajero, vehicle.capacidad_carga, cedulaConductor, vehicle.nombre_conductor_vehiculo, montoBlindaje, gradoBlindaje],                          
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    postVehicleCollectiveForm: (fileTransmission, fileShield, fileBody, fileYear, fileVehicleType, fileSumInsured, fileSerialEngine, movementType, vehicle) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Vehiculo (numero_placa, year_vehiculo, marca_vehiculo, modelo_vehiculo, version_vehiculo, tipo_transmision_vehiculo, blindaje_boolean_vehiculo, tipo_vehiculo, color_vehiculo, serial_motor, serial_carroceria, capacidad_carga, nombre_conductor_vehiculo, suma_asegurada_vehiculo, tipo_movimiento_vehiculo)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [vehicle.Placa, fileYear, vehicle.Marca, vehicle.Modelo, vehicle.Version, fileTransmission, fileShield, fileVehicleType, vehicle.Color, fileSerialEngine, fileBody, vehicle.Carga, vehicle.Conductor, fileSumInsured, movementType.tipo_movimiento_vehiculo],                          
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  PUT                  */
    updateVehicle: (blindaje, capacidadCarga, sumaAsegurada, yearVehicle, vehicle) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Vehiculo 
                    SET numero_placa=?, year_vehiculo=?, marca_vehiculo=?, modelo_vehiculo=?, version_vehiculo=?, tipo_transmision_vehiculo=?, blindaje_boolean_vehiculo=?, tipo_vehiculo=?, color_vehiculo=?, serial_motor=?, serial_carroceria=?, capacidad_carga=?, nombre_conductor_vehiculo=?, suma_asegurada_vehiculo=?, tipo_movimiento_vehiculo=?    
                    WHERE id_vehiculo=?`, 
            [vehicle.numero_placa, yearVehicle, vehicle.marca_vehiculo, vehicle.modelo_vehiculo, vehicle.version_vehiculo, vehicle.tipo_transmision_vehiculo, blindaje, vehicle.tipo_vehiculo, vehicle.color_vehiculo, vehicle.serial_motor, vehicle.serial_carroceria, capacidadCarga, vehicle.nombre_conductor_vehiculo, sumaAsegurada, vehicle.tipo_movimiento_beneficiario, vehicle.id_vehiculo], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    updateDisableVehicle: (id, vehicle) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Vehiculo SET obser_deshabilitar_vehiculo=? WHERE id_vehiculo=?`, 
            [vehicle.obser_deshabilitar_vehiculo, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*               DELETE                  */
    disableVehicle: (id, disableVehicle) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Vehiculo SET deshabilitar_vehiculo=? WHERE id_vehiculo=?`, 
            [disableVehicle, id], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
}