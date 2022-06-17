const db = require('../../config/database');

module.exports = {
/*                  GET                  */
    getDivision: (id) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT *
                                FROM Fraccionamiento 
                                WHERE id_fraccionamiento=? AND deshabilitar_fraccionamiento=0`, 
                [id],
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
    getDivisionReceipt: (idReceipt) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`SELECT *
                                FROM Fraccionamiento 
                                WHERE recibo_id=? AND deshabilitar_fraccionamiento=0`, 
                [idReceipt],
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
    postDivisionForm: (temparrayDivision) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err); 
                    return; 
                }
                connection.query(`INSERT INTO Fraccionamiento (fecha_desde_fraccionamiento, fecha_hasta_fraccionamiento, prima_neta_fraccionamiento, igtf_fraccionamiento, prima_total_fraccionamiento, monto_comision_fraccionamiento, recibo_id)
                                VALUES ?`,
                [temparrayDivision],
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
    updateDivisionForm: (montoPrimaNeta, montoIgtf, montoPrimaTotal, montoComision, fechaDesdeFraccionamiento, fechaHastaFraccionamiento, fechaPagoFraccionamiento, division) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Fraccionamiento 
                                SET numero_fraccionamiento=?, tipo_fraccionamiento=?, fecha_desde_fraccionamiento=?, fecha_hasta_fraccionamiento=?, prima_neta_fraccionamiento=?, igtf_fraccionamiento=?, prima_total_fraccionamiento=?, fecha_pago_fraccionamiento=?, metodo_pago_fraccionamiento=?, monto_comision_fraccionamiento=?
                                WHERE id_fraccionamiento=?`, 
                [division.numero_fraccionamiento, division.tipo_fraccionamiento, fechaDesdeFraccionamiento, fechaHastaFraccionamiento, montoPrimaNeta, montoIgtf, montoPrimaTotal, fechaPagoFraccionamiento, division.metodo_pago_fraccionamiento, montoComision, division.id_fraccionamiento],
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
    updateReceiptDivision: (id, reciboDistribucion) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Fraccionamiento 
                                SET recibo_distribuicion_fraccionamiento=?    
                                WHERE id_fraccionamiento=?`, 
                [reciboDistribucion, id],
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
    updateDisableDivision: (id, division) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Fraccionamiento 
                                SET obser_deshabilitar_fraccionamiento=?    
                                WHERE id_fraccionamiento=?`, 
                [division.obser_deshabilitar_fraccionamiento, id],
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
    disableDivision: (id, disableDivision) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Fraccionamiento 
                                SET deshabilitar_fraccionamiento=? 
                                WHERE id_fraccionamiento=?`, 
                [disableDivision, id],
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
    disableReceiptDivision: (idReceipt, disableReceiptDivision) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(err) { 
                    console.log(err);
                    return; 
                }
                connection.query(`UPDATE Fraccionamiento 
                                SET deshabilitar_fraccionamiento=? 
                                WHERE recibo_id=?`, 
                [disableReceiptDivision, idReceipt],
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
}