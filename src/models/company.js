const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getCompany: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Empresa', (error, rows) => {
                if (error) {
                    reject(error)
                }
                resolve(rows);
            });
        });
    },
/*                  POST                 */
    postCompanyForm: (comision_porcentaje, fecha_empresa, factor_retencion_empresa, company) => {
        if ((company.id_rif.startsWith('J')) || (company.id_rif.startsWith('V')) || (company.id_rif.startsWith('G'))) {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Empresa (rif_empresa, nombre_empresa, dominio, correo_empresa, pais_empresa, direccion_empresa, porcentaje_empresa, fecha_renovacion, telefono_empresa, telefono_opcional, factor_retencion)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [company.id_rif, company.nombre_empresa, company.dominio_empresa, company.email_empresa, company.pais_empresa, company.direccion_empresa, comision_porcentaje, fecha_empresa, company.telefono_empresa, company.telefono_opcional, factor_retencion_empresa], 
                (error, rows) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(rows);
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                db.query(`INSERT INTO Empresa (cedula_empresa, nombre_empresa, dominio, correo_empresa, pais_empresa, direccion_empresa, porcentaje_empresa, fecha_renovacion, telefono_empresa, telefono_opcional, factor_retencion)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [company.id_rif, company.nombre_empresa, company.dominio_empresa, company.email_empresa, company.pais_empresa, company.direccion_empresa, comision_porcentaje, fecha_empresa, company.telefono_empresa, company.telefono_opcional, factor_retencion_empresa], 
                (error, rows) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(rows);
                });
            });
        }
    }
}