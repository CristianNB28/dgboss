const db = require('../../config/database');

module.exports = {
/*                  GET                  */
/*                  POST                 */
    postBeneficiaryForm: async (fechaNacBeneficiario, beneficiary) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Beneficiario (nombre_beneficiario, apellido_beneficiario, cedula_beneficiario, fec_nac_beneficiario, parentesco_beneficiario)
                    VALUES (?, ?, ?, ?, ?)`, 
            [beneficiary.nombre_beneficiario, beneficiary.apellido_beneficiario, beneficiary.cedula_beneficiario, fechaNacBeneficiario, beneficiary.parentesco_beneficiario], 
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
    postExtensiveBeneficiaryForm: async (dateFile, accountTypeFile, accountNumberFile, movementType, beneficiary) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Beneficiario (nombre_beneficiario, apellido_beneficiario, cedula_beneficiario, fec_nac_beneficiario, parentesco_beneficiario, direccion_beneficiario, telefono_beneficiario, correo_beneficiario, banco_beneficiario, tipo_cuenta_beneficiario, nro_cuenta_beneficiario, tipo_movimiento_beneficiario)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [beneficiary.Nombre, beneficiary.Apellido, beneficiary.Cedula, dateFile, beneficiary.Parentesco, beneficiary.Direccion, beneficiary.Telefono, beneficiary.Correo, beneficiary.Banco, accountTypeFile, accountNumberFile, movementType.tipo_movimiento_beneficiario], 
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