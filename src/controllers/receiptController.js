const receiptModel = require('../models/receipt');

module.exports = {
/*                  GET                  */
/*                 POST                  */
    postReceiptForm: async (req, res) => {
        let monto_prima_recibo = parseFloat(req.body.monto_prima_recibo);
        let monto_comision = parseFloat(req.body.monto_comision_recibo);
        let fecha_recibo_desde = new Date(req.body.fecha_vigencia_desde);
        let fecha_recibo_hasta = new Date(req.body.fecha_vigencia_hasta);
        await receiptModel.postReceiptForm(monto_prima_recibo, monto_comision, fecha_recibo_desde, fecha_recibo_hasta, req.body);
        res.redirect('/sistema/add-vehicle-policy');
    }
/*                  PUT                  */
/*               DELETE                  */
}