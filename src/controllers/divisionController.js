// Models
const divisionModel = require('../models/division');
const receiptModel = require('../models/receipt');
const collectiveModel = require('../models/collective');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');
const collectiveOwnAgentModel = require('../models/collective_own_agent');
const colInsuInsuredExecModel = require('../models/col_insu_insured_executive');
const policyModel = require('../models/policy');
const policyInsurerInsuredModel = require('../models/policy_insurer_insured');
const policyOwnAgentModel = require('../models/policy_own_agent');
const polInsuInsuredExecModel = require('../models/pol_insu_insured_executive');
const ownAgentModel = require('../models/own_agent');
const insurerModel = require('../models/insurer');
const insuredModel = require('../models/insured');
const executiveModel = require('../models/executive');
// Serializers
const convertStringToNumber = require('../serializers/convertStringToNumber');
const convertNumberToString = require('../serializers/convertNumberToString');
const convertStringToCurrency = require('../serializers/convertStringToCurrency');

module.exports = {
/*                  GET                  */
/*                 POST                  */

/*                  PUT                  */
    putSubdivisions: async (req, res, next) => {
        const valoresAceptados = /^[0-9]+$/;
        const idReceipt = req.params.id;
        if (idReceipt.match(valoresAceptados)) {
            const resultDivision = await divisionModel.getDivisionReceipt(idReceipt);
            const data = await Promise.all(
                resultDivision.map(async (division) => {
                    const resultReceipt = await receiptModel.getReceipt(idReceipt);
                    let montoPrimaNeta = division.prima_neta_fraccionamiento;
                    let montoIGTF = division.igtf_fraccionamiento;
                    let montoPrimaTotal = division.prima_total_fraccionamiento;
                    let montoComision = division.monto_comision_fraccionamiento;
                    if (resultReceipt[0].poliza_id !== null) {
                        const resultPolicy = await policyModel.getPolicy(resultReceipt[0].poliza_id);
                        montoPrimaNeta = convertNumberToString(montoPrimaNeta);
                        montoIGTF = convertNumberToString(montoIGTF);
                        montoPrimaTotal = convertNumberToString(montoPrimaTotal);
                        montoComision = convertNumberToString(montoComision);
                        montoPrimaNeta = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaNeta);
                        montoIGTF = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoIGTF);
                        montoPrimaTotal = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoPrimaTotal);
                        montoComision = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, montoComision);
                    } else if (resultReceipt[0].colectivo_id !== null) {
                        const resultColective = await collectiveModel.getCollective(resultReceipt[0].colectivo_id);
                        montoPrimaNeta = convertNumberToString(montoPrimaNeta);
                        montoIGTF = convertNumberToString(montoIGTF);
                        montoPrimaTotal = convertNumberToString(montoPrimaTotal);
                        montoComision = convertNumberToString(montoComision);
                        montoPrimaNeta = convertStringToCurrency(resultColective[0].tipo_moneda_colectivo, montoPrimaNeta);
                        montoIGTF = convertStringToCurrency(resultColective[0].tipo_moneda_colectivo, montoIGTF);
                        montoPrimaTotal = convertStringToCurrency(resultColective[0].tipo_moneda_colectivo, montoPrimaTotal);
                        montoComision = convertStringToCurrency(resultColective[0].tipo_moneda_colectivo, montoComision);
                    }
                    const fechaDesdeFraccionamiento = division.fecha_desde_fraccionamiento.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"); 
                    const fechaHastaFraccionamiento = division.fecha_hasta_fraccionamiento.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
                    if (division.recibo_distribuicion_fraccionamiento === 0) {
                        const numeroFraccionamiento = 'PENDIENTE';
                        const tipoFraccionamiento = 'PENDIENTE';
                        const metodoPagoFraccionamiento = 'PENDIENTE';
                        return {
                            'id_fraccionamiento': division.id_fraccionamiento,
                            'numero_fraccionamiento': numeroFraccionamiento,
                            'tipo_fraccionamiento': tipoFraccionamiento,
                            'fecha_desde_fraccionamiento': fechaDesdeFraccionamiento,
                            'fecha_hasta_fraccionamiento': fechaHastaFraccionamiento,
                            'metodo_pago_fraccionamiento': metodoPagoFraccionamiento,
                            'prima_neta_fraccionamiento': montoPrimaNeta, 
                            'igtf_fraccionamiento': montoIGTF, 
                            'prima_total_fraccionamiento': montoPrimaTotal,
                            'monto_comision_fraccionamiento': montoComision,
                            'recibo_distribuicion_fraccionamiento': division.recibo_distribuicion_fraccionamiento
                        }
                    } else {
                        return {
                            'id_fraccionamiento': division.id_fraccionamiento,
                            'numero_fraccionamiento': division.numero_fraccionamiento,
                            'tipo_fraccionamiento': division.tipo_fraccionamiento,
                            'fecha_desde_fraccionamiento': fechaDesdeFraccionamiento,
                            'fecha_hasta_fraccionamiento': fechaHastaFraccionamiento,
                            'metodo_pago_fraccionamiento': division.metodo_pago_fraccionamiento,
                            'prima_neta_fraccionamiento': montoPrimaNeta, 
                            'igtf_fraccionamiento': montoIGTF, 
                            'prima_total_fraccionamiento': montoPrimaTotal,
                            'monto_comision_fraccionamiento': montoComision,
                            'recibo_distribuicion_fraccionamiento': division.recibo_distribuicion_fraccionamiento
                        }
                    }
                })
            );
            res.render('subdivisions', {
                data,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    putDivisionAdminForm: async (req, res, next) => {
        const valoresAceptados = /^[0-9]+$/;
        const idDivision = req.params.id;
        if (idDivision.match(valoresAceptados)) {
            const resultDivision = await divisionModel.getDivision(idDivision);
            const resultReceipt = await receiptModel.getReceipt(resultDivision[0].recibo_id);
            const resultsReceipts = await receiptModel.getReceipts();
            const resultsExecutives = await executiveModel.getExecutives();
            const percentajeExecutives = resultsExecutives.filter(executives => {
                const condicionalGerente = ((executives.cargo_ejecutivo === 'GERENTE') && (executives.departamento_cargo_ejecutivo === 'TÉCNICO'));
                const condicionalReclamos = ((executives.cargo_ejecutivo === 'COORDINADOR') && (executives.departamento_cargo_ejecutivo === 'SINIESTRO'));
                const condicionalAdministracion = ((executives.cargo_ejecutivo === 'COORDINADOR') && (executives.departamento_cargo_ejecutivo === 'ADMINISTRACIÓN'));
                return (condicionalGerente || condicionalReclamos || condicionalAdministracion);
            });
            const percentajeExecutivesPolicy = [];
            let resultCollective = [];
            let resultPolicy = [];
            let resultOwnAgent = [];
            let resultInsurer = [];
            let nameRazonInsured = '';
            if (resultReceipt[0].poliza_id !== null) {
                const resultPoa = await policyOwnAgentModel.getPolicyOwnAgent(resultReceipt[0].poliza_id);
                const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultReceipt[0].poliza_id);
                const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
                resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
                resultPolicy = await policyModel.getPolicy(resultReceipt[0].poliza_id);
                if (resultPoa.length !== 0) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultPoa[0].agente_propio_id);
                }
                if ((resultPII[0].asegurado_per_jur_id === null) && (resultPII[0].asegurado_per_nat_id !== null)) {
                    const resultNaturalInsured = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
                    nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
                } else if ((resultPII[0].asegurado_per_jur_id !== null) && (resultPII[0].asegurado_per_nat_id === null)) {
                    const resultLegalInsured = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
                    nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
                }
                for (const resultPIIE of resultsPIIE) {
                    const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
                    resultExecutive[0].porcentaje_ejecutivo = convertNumberToString(resultExecutive[0].porcentaje_ejecutivo);
                    resultExecutive[0].porcentaje_ejecutivo = `${resultExecutive[0].porcentaje_ejecutivo}%`;
                    percentajeExecutivesPolicy.push(resultExecutive[0].porcentaje_ejecutivo);
                }
                resultDivision.forEach(division => {
                    division.fecha_desde_fraccionamiento = division.fecha_desde_fraccionamiento.toISOString().substring(0, 10);
                    division.fecha_hasta_fraccionamiento = division.fecha_hasta_fraccionamiento.toISOString().substring(0, 10);
                    division.prima_neta_fraccionamiento = convertNumberToString(division.prima_neta_fraccionamiento);
                    division.monto_comision_fraccionamiento = convertNumberToString(division.monto_comision_fraccionamiento);
                    division.prima_neta_fraccionamiento = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, division.prima_neta_fraccionamiento);
                    division.monto_comision_fraccionamiento = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, division.monto_comision_fraccionamiento);
                    if (division.fecha_pago_fraccionamiento !== null) {
                        division.fecha_pago_fraccionamiento = division.fecha_pago_fraccionamiento.toISOString().substring(0, 10);
                    }
                });
                resultOwnAgent.forEach(ownAgent => {
                    ownAgent.porcentaje_agente_propio = convertNumberToString(ownAgent.porcentaje_agente_propio);
                    ownAgent.porcentaje_agente_propio = `${ownAgent.porcentaje_agente_propio}%`;
                });
            } else if (resultReceipt[0].colectivo_id !== null) {
                const resultCoa = await collectiveOwnAgentModel.getCollectiveOwnAgent(resultReceipt[0].colectivo_id);
                const resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultReceipt[0].colectivo_id);
                const resultsCIIE = await colInsuInsuredExecModel.getColInsuInsuredExecutive(resultCII[0].id_caa);
                resultInsurer = await insurerModel.getInsurer(resultCII[0].aseguradora_id);
                resultCollective = await collectiveModel.getCollective(resultReceipt[0].colectivo_id);
                if (resultCoa.length !== 0) {
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultCoa[0].agente_propio_id);
                }
                if ((resultCII[0].asegurado_per_jur_id === null) && (resultCII[0].asegurado_per_nat_id !== null)) {
                    const resultNaturalInsured = await insuredModel.getNaturalInsured(resultCII[0].asegurado_per_nat_id);
                    nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
                } else if ((resultCII[0].asegurado_per_jur_id !== null) && (resultCII[0].asegurado_per_nat_id === null)) {
                    const resultLegalInsured = await insuredModel.getLegalInsured(resultCII[0].asegurado_per_jur_id);
                    nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
                }
                for (const resultCIIE of resultsCIIE) {
                    const resultExecutive = await executiveModel.getExecutive(resultCIIE.ejecutivo_id);
                    resultExecutive[0].porcentaje_ejecutivo = convertNumberToString(resultExecutive[0].porcentaje_ejecutivo);
                    resultExecutive[0].porcentaje_ejecutivo = `${resultExecutive[0].porcentaje_ejecutivo}%`;
                    percentajeExecutivesPolicy.push(resultExecutive[0].porcentaje_ejecutivo);
                }
                resultDivision.forEach(division => {
                    division.fecha_desde_fraccionamiento = division.fecha_desde_fraccionamiento.toISOString().substring(0, 10);
                    division.fecha_hasta_fraccionamiento = division.fecha_hasta_fraccionamiento.toISOString().substring(0, 10);
                    division.prima_neta_fraccionamiento = convertNumberToString(division.prima_neta_fraccionamiento);
                    division.monto_comision_fraccionamiento = convertNumberToString(division.monto_comision_fraccionamiento);
                    division.prima_neta_fraccionamiento = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, division.prima_neta_fraccionamiento);
                    division.monto_comision_fraccionamiento = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, division.monto_comision_fraccionamiento);
                    if (division.fecha_pago_fraccionamiento !== null) {
                        division.fecha_pago_fraccionamiento = division.fecha_pago_fraccionamiento.toISOString().substring(0, 10);
                    }
                });
                resultOwnAgent.forEach(ownAgent => {
                    ownAgent.porcentaje_agente_propio = convertNumberToString(ownAgent.porcentaje_agente_propio);
                    ownAgent.porcentaje_agente_propio = `${ownAgent.porcentaje_agente_propio}%`;
                });
            }
            percentajeExecutives.forEach(percentaje => {
                percentaje.porcentaje_ejecutivo = convertNumberToString(percentaje.porcentaje_ejecutivo);
                percentaje.porcentaje_ejecutivo = `${percentaje.porcentaje_ejecutivo}%`;
            });
            res.render('divisionAdminForm', {
                nameRazonInsured,
                percentajeExecutives,
                percentajeExecutivesPolicy,
                division: resultDivision[0],
                collective: resultCollective[0],
                policy: resultPolicy[0],
                ownAgent: resultOwnAgent[0],
                insurer: resultInsurer[0],
                receipts: resultsReceipts,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    updateDivisionAdminForm: async (req, res) => { 
        const idDivision = req.body.id_fraccionamiento;
        const resultDivision = await divisionModel.getDivision(idDivision);
        const resultReceipt = await receiptModel.getReceipt(resultDivision[0].recibo_id);
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const percentajeExecutives = resultsExecutives.filter(executives => {
            const condicionalGerente = ((executives.cargo_ejecutivo === 'GERENTE') && (executives.departamento_cargo_ejecutivo === 'TÉCNICO'));
            const condicionalReclamos = ((executives.cargo_ejecutivo === 'COORDINADOR') && (executives.departamento_cargo_ejecutivo === 'SINIESTRO'));
            const condicionalAdministracion = ((executives.cargo_ejecutivo === 'COORDINADOR') && (executives.departamento_cargo_ejecutivo === 'ADMINISTRACIÓN'));
            return (condicionalGerente || condicionalReclamos || condicionalAdministracion);
        });
        const percentajeExecutivesPolicy = [];
        let resultCollective = [];
        let resultPolicy = [];
        let resultOwnAgent = [];
        let resultInsurer = [];
        let nameRazonInsured = '';
        if (resultReceipt[0].poliza_id !== null) {
            const resultPoa = await policyOwnAgentModel.getPolicyOwnAgent(resultReceipt[0].poliza_id);
            const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultReceipt[0].poliza_id);
            const resultsPIIE = await polInsuInsuredExecModel.getPolInsuInsuredExecutive(resultPII[0].id_paa);
            resultInsurer = await insurerModel.getInsurer(resultPII[0].aseguradora_id);
            resultPolicy = await policyModel.getPolicy(resultReceipt[0].poliza_id);
            if (resultPoa.length !== 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultPoa[0].agente_propio_id);
            }
            if ((resultPII[0].asegurado_per_jur_id === null) && (resultPII[0].asegurado_per_nat_id !== null)) {
                const resultNaturalInsured = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
                nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
            } else if ((resultPII[0].asegurado_per_jur_id !== null) && (resultPII[0].asegurado_per_nat_id === null)) {
                const resultLegalInsured = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
                nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
            }
            for (const resultPIIE of resultsPIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultPIIE.ejecutivo_id);
                resultExecutive[0].porcentaje_ejecutivo = convertNumberToString(resultExecutive[0].porcentaje_ejecutivo);
                resultExecutive[0].porcentaje_ejecutivo = `${resultExecutive[0].porcentaje_ejecutivo}%`;
                percentajeExecutivesPolicy.push(resultExecutive[0].porcentaje_ejecutivo);
            }
            resultDivision.forEach(division => {
                division.fecha_desde_fraccionamiento = division.fecha_desde_fraccionamiento.toISOString().substring(0, 10);
                division.fecha_hasta_fraccionamiento = division.fecha_hasta_fraccionamiento.toISOString().substring(0, 10);
                division.prima_neta_fraccionamiento = convertNumberToString(division.prima_neta_fraccionamiento);
                division.monto_comision_fraccionamiento = convertNumberToString(division.monto_comision_fraccionamiento);
                division.prima_neta_fraccionamiento = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, division.prima_neta_fraccionamiento);
                division.monto_comision_fraccionamiento = convertStringToCurrency(resultPolicy[0].tipo_moneda_poliza, division.monto_comision_fraccionamiento);
                if (division.fecha_pago_fraccionamiento !== null) {
                    division.fecha_pago_fraccionamiento = division.fecha_pago_fraccionamiento.toISOString().substring(0, 10);
                }
            });
            resultOwnAgent.forEach(ownAgent => {
                ownAgent.porcentaje_agente_propio = convertNumberToString(ownAgent.porcentaje_agente_propio);
                ownAgent.porcentaje_agente_propio = `${ownAgent.porcentaje_agente_propio}%`;
            });
        } else if (resultReceipt[0].colectivo_id !== null) {
            const resultCoa = await collectiveOwnAgentModel.getCollectiveOwnAgent(resultReceipt[0].colectivo_id);
            const resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultReceipt[0].colectivo_id);
            const resultsCIIE = await colInsuInsuredExecModel.getColInsuInsuredExecutive(resultCII[0].id_caa);
            resultInsurer = await insurerModel.getInsurer(resultCII[0].aseguradora_id);
            resultCollective = await collectiveModel.getCollective(resultReceipt[0].colectivo_id);
            if (resultCoa.length !== 0) {
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultCoa[0].agente_propio_id);
            }
            if ((resultCII[0].asegurado_per_jur_id === null) && (resultCII[0].asegurado_per_nat_id !== null)) {
                const resultNaturalInsured = await insuredModel.getNaturalInsured(resultCII[0].asegurado_per_nat_id);
                nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
            } else if ((resultCII[0].asegurado_per_jur_id !== null) && (resultCII[0].asegurado_per_nat_id === null)) {
                const resultLegalInsured = await insuredModel.getLegalInsured(resultCII[0].asegurado_per_jur_id);
                nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
            }
            for (const resultCIIE of resultsCIIE) {
                const resultExecutive = await executiveModel.getExecutive(resultCIIE.ejecutivo_id);
                resultExecutive[0].porcentaje_ejecutivo = convertNumberToString(resultExecutive[0].porcentaje_ejecutivo);
                resultExecutive[0].porcentaje_ejecutivo = `${resultExecutive[0].porcentaje_ejecutivo}%`;
                percentajeExecutivesPolicy.push(resultExecutive[0].porcentaje_ejecutivo);
            }
            resultDivision.forEach(division => {
                division.fecha_desde_fraccionamiento = division.fecha_desde_fraccionamiento.toISOString().substring(0, 10);
                division.fecha_hasta_fraccionamiento = division.fecha_hasta_fraccionamiento.toISOString().substring(0, 10);
                division.prima_neta_fraccionamiento = convertNumberToString(division.prima_neta_fraccionamiento);
                division.monto_comision_fraccionamiento = convertNumberToString(division.monto_comision_fraccionamiento);
                division.prima_neta_fraccionamiento = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, division.prima_neta_fraccionamiento);
                division.monto_comision_fraccionamiento = convertStringToCurrency(resultCollective[0].tipo_moneda_colectivo, division.monto_comision_fraccionamiento);
                if (division.fecha_pago_fraccionamiento !== null) {
                    division.fecha_pago_fraccionamiento = division.fecha_pago_fraccionamiento.toISOString().substring(0, 10);
                }
            });
            resultOwnAgent.forEach(ownAgent => {
                ownAgent.porcentaje_agente_propio = convertNumberToString(ownAgent.porcentaje_agente_propio);
                ownAgent.porcentaje_agente_propio = `${ownAgent.porcentaje_agente_propio}%`;
            });
        }
        percentajeExecutives.forEach(percentaje => {
            percentaje.porcentaje_ejecutivo = convertNumberToString(percentaje.porcentaje_ejecutivo);
            percentaje.porcentaje_ejecutivo = `${percentaje.porcentaje_ejecutivo}%`;
        });
        try {
            let {
                prima_neta_fraccionamiento: montoPrimaNeta,
                igtf_fraccionamiento: montoIgtf,
                prima_total_fraccionamiento: montoPrimaTotal,
                monto_comision_fraccionamiento: montoComision,
                fecha_desde_fraccionamiento: fechaDesdeFraccionamiento,
                fecha_hasta_fraccionamiento: fechaHastaFraccionamiento,
                fecha_pago_fraccionamiento: fechaPagoFraccionamiento,
            } = req.body;
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComision = montoComision.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoComision = convertStringToNumber(montoComision);
            fechaPagoFraccionamiento = new Date(fechaPagoFraccionamiento);
            fechaDesdeFraccionamiento = new Date(fechaDesdeFraccionamiento);
            fechaHastaFraccionamiento = new Date(fechaHastaFraccionamiento);
            await divisionModel.updateDivisionForm(montoPrimaNeta, montoIgtf, montoPrimaTotal, montoComision, fechaDesdeFraccionamiento, fechaHastaFraccionamiento, fechaPagoFraccionamiento, req.body);
            res.redirect(`/sistema/division/${idDivision}`);
        } catch (error) {
            console.log(error);
            res.render('divisionAdminForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/division/${idDivision}`,
                nameRazonInsured,
                percentajeExecutives,
                percentajeExecutivesPolicy,
                division: resultDivision[0],
                collective: resultCollective[0],
                policy: resultPolicy[0],
                ownAgent: resultOwnAgent[0],
                insurer: resultInsurer[0],
                receipts: resultsReceipts,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
/*               DELETE                  */
    disableDivision: async (req, res) => {
        const disableDivision = 1;
        const resultDivision = await divisionModel.getDivision(req.params.id);
        const resultReceipt = await receiptModel.getReceipt(resultDivision[0].recibo_id);
        await divisionModel.updateDisableDivision(req.params.id, req.body);
        await divisionModel.disableDivision(req.params.id, disableDivision);
        res.redirect(`/sistema/subdivisions/${resultReceipt[0].id_recibo}`);
    }
}