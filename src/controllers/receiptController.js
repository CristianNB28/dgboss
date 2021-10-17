const receiptModel = require('../models/receipt');

module.exports = {
/*                  GET                  */
/*                 POST                  */
    postVehicleReceiptForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionAsociado = parseFloat(req.body.monto_comision_recibo);
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, req.body);
        res.redirect('/sistema/add-vehicle-policy');
    },
    postHealthReceiptForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionAsociado = parseFloat(req.body.monto_comision_recibo);
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, req.body);
        res.redirect('/sistema/add-health-policy');
    },
    postPatrimonialReceiptForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionAsociado = parseFloat(req.body.monto_comision_recibo);
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, req.body);
        res.redirect('/sistema/add-patrimonial-policy');
    },
    postBailReceiptForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionAsociado = parseFloat(req.body.monto_comision_recibo);
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, req.body);
        res.redirect('/sistema/add-bail-policy');
    },
    postAnotherBranchReceiptForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionAsociado = parseFloat(req.body.monto_comision_recibo);
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, req.body);
        res.redirect('/sistema/add-another-branch-policy');
    },
    postFuneralReceiptForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionAsociado = parseFloat(req.body.monto_comision_recibo);
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, req.body);
        res.redirect('/sistema/add-funeral-policy');
    },
    postLifeReceiptForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionAsociado = parseFloat(req.body.monto_comision_recibo);
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, req.body);
        res.redirect('/sistema/add-life-policy');
    },
    postAPReceiptForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionAsociado = parseFloat(req.body.monto_comision_recibo);
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, req.body);
        res.redirect('/sistema/add-ap-policy');
    },
    postTravelReceiptForm: async (req, res) => {
        let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
        let montoPrimaRecibo = parseFloat(req.body.monto_prima_recibo);
        let montoComisionAsociado = parseFloat(req.body.monto_comision_recibo);
        let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
        let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
        await receiptModel.postReceiptForm(fraccionamiento, montoPrimaRecibo, montoComisionAsociado, fechaDesdeRecibo, fechaHastaRecibo, req.body);
        res.redirect('/sistema/add-travel-policy');
    }
/*                  PUT                  */
/*               DELETE                  */
}