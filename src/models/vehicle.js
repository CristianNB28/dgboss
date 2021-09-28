const db = require('../../config/database');

module.exports = {
/*                  GET                  */
/*                  POST                 */
    postVehicleForm: (blindaje, cedulaConductor, rifConductor, yearVehicle, vehicle) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Vehiculo (numero_placa, year_vehiculo, marca_vehiculo, modelo_vehiculo, version_vehiculo, tipo_transmision_vehiculo, blindaje_boolean_vehiculo, tipo_vehiculo, color_vehiculo, serial_motor, serial_corroceria, cantidad_pasajero, capacidad_carga, cedula_conductor_vehiculo, rif_conductor_vehiculo, nombre_conductor_vehiculo)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [vehicle.numero_placa, yearVehicle, vehicle.marca_vehiculo, vehicle.modelo_vehiculo, vehicle.version_vehiculo, vehicle.tipo_transmision_vehiculo, blindaje, vehicle.tipo_vehiculo, vehicle.color_vehiculo, vehicle.serial_motor, vehicle.serial_corroceria, vehicle.cantidad_pasajero, vehicle.capacidad_carga, cedulaConductor, rifConductor, vehicle.nombre_conductor_vehiculo],                          
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    }
/*                  PUT                  */
/*               DELETE                  */
}