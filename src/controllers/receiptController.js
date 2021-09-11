const receiptModel = require('../models/receipt');

module.exports = {
/*                  GET                  */
/*                 POST                  */
    postReceiptForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionRecibo = parseFloat(req.body.monto_comision_recibo);
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionRecibo, fechaDesdeRecibo, fechaHastaRecibo, req.body);
        res.redirect('/sistema/add-vehicle-policy');
    }
/*                  PUT                  */
/*               DELETE                  */
}