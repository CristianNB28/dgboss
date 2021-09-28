const receiptModel = require('../models/receipt');

module.exports = {
/*                  GET                  */
/*                 POST                  */
    postVehicleReceiptForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionAsociado = parseFloat(req.body.comision_asociada_recibo);
        let montoBonificacionRecibo = parseFloat(req.body.bonificacion_recibo);
        let montoComisionRecibo = parseFloat(req.body.monto_comision_recibo);
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, montoBonificacionRecibo, montoComisionRecibo, fechaDesdeRecibo, fechaHastaRecibo, req.body);
        res.redirect('/sistema/add-vehicle-policy');
    },
    postHealthReceiptForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionAsociado = parseFloat(req.body.comision_asociada_recibo);
        let montoBonificacionRecibo = parseFloat(req.body.bonificacion_recibo);
        let montoComisionRecibo = parseFloat(req.body.monto_comision_recibo);
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, montoBonificacionRecibo, montoComisionRecibo, fechaDesdeRecibo, fechaHastaRecibo, req.body);
        res.redirect('/sistema/add-health-policy');
    },
    postPatrimonialReceiptForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionAsociado = parseFloat(req.body.comision_asociada_recibo);
        let montoBonificacionRecibo = parseFloat(req.body.bonificacion_recibo);
        let montoComisionRecibo = parseFloat(req.body.monto_comision_recibo);
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, montoBonificacionRecibo, montoComisionRecibo, fechaDesdeRecibo, fechaHastaRecibo, req.body);
        res.redirect('/sistema/add-patrimonial-policy');
    }
/*                  PUT                  */
/*               DELETE                  */
}