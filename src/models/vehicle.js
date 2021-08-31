const db = require('../../config/database');

module.exports = {
/*                  GET                  */
/*                  POST                 */
    postVehicleForm: (cedula_conductor, rif_conductor, year_vehicle, vehicle) => {
        if (cedula_conductor === '') {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Vehiculo (numero_placa, year_vehiculo, marca_vehiculo, modelo_vehiculo, version_vehiculo, tipo_vehiculo, descripcion_vehiculo, suma_asegurada, color_vehiculo, serial_motor, serial_corroceria, cantidad_pasajero, capacidad_carga, lugar_habitual, cedula_conductor_vehiculo, rif_conductor_vehiculo, nombre_conductor_vehiculo)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [vehicle.numero_placa, year_vehicle, vehicle.marca_vehiculo, vehicle.modelo_vehiculo, vehicle.version_vehiculo, vehicle.tipo_vehiculo, vehicle.descripcion_vehiculo, vehicle.suma_asegurada, vehicle.color_vehiculo, vehicle.serial_motor, vehicle.serial_corroceria, vehicle.cantidad_pasajero, vehicle.capacidad_carga, vehicle.lugar_habitual, cedula_conductor, rif_conductor, vehicle.nombre_conductor_vehiculo],                          
                (error, rows) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(rows);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Vehiculo (numero_placa, year_vehiculo, marca_vehiculo, modelo_vehiculo, version_vehiculo, tipo_vehiculo, descripcion_vehiculo, suma_asegurada, color_vehiculo, serial_motor, serial_corroceria, cantidad_pasajero, capacidad_carga, lugar_habitual, cedula_conductor_vehiculo, rif_conductor_vehiculo, nombre_conductor_vehiculo)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [vehicle.numero_placa, year_vehicle, vehicle.marca_vehiculo, vehicle.modelo_vehiculo, vehicle.version_vehiculo, vehicle.tipo_vehiculo, vehicle.descripcion_vehiculo, vehicle.suma_asegurada, vehicle.color_vehiculo, vehicle.serial_motor, vehicle.serial_corroceria, vehicle.cantidad_pasajero, vehicle.capacidad_carga, vehicle.lugar_habitual, cedula_conductor, rif_conductor, vehicle.nombre_conductor_vehiculo],                          
                (error, rows) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(rows);
                });
            });
        }
    }
/*                  PUT                  */
/*               DELETE                  */
}