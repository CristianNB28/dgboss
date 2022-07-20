// Models
const distributionModel = require('../models/distribution');
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
const addZeroes = require('../serializers/addZeroes');

module.exports = {
/*                  GET                  */
/*                 POST                  */
    postDistributionForm: async (req, res) => {
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
                resultExecutive[0].porcentaje_ejecutivo = resultExecutive[0].porcentaje_ejecutivo.toString();
                resultExecutive[0].porcentaje_ejecutivo = addZeroes(resultExecutive[0].porcentaje_ejecutivo);
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
                resultExecutive[0].porcentaje_ejecutivo = resultExecutive[0].porcentaje_ejecutivo.toString();
                resultExecutive[0].porcentaje_ejecutivo = addZeroes(resultExecutive[0].porcentaje_ejecutivo);
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
                monto_comision_distribucion: montoComision,
                monto_bonificacion_distribucion: montoBonificacion,
                monto_comision_bonificacion: montoComisionBonificacion,
                total_comision_distribuir: totalComision,
                porcentaje_bonificacion_distribucion: porcentajeBonificacion,
                porcentaje_islr_distribucion: porcentajeIslr,
                porcentaje_agente_distribucion: porcentajeAgentePropio,
                caso_especial_distribucion: porcentajeCasoEspecial,
                porcentaje_atina_distribucion: porcentajeAtina,
                porcentaje_fundatina_distribucion: porcentajeFundatina,
                porcentaje_director_distribucion: porcentajeDirector,
                porcentaje_socio_distribucion: porcentajeSocio,
                porcentaje_gerente_distribucion: porcentajeGerente,
                porcentaje_coordinador_suscripcion: porcentajeCoordinadorSuscripcion,
                porcentaje_coordinador_reclamo: porcentajeCoordinadorReclamo,
                porcentaje_coordinador_administracion: porcentajeCoordinadorAdministracion,
                porcentaje_ejecutivo_suscripcion: porcentajeEjecutivoSuscripcion,
                porcentaje_ejecutivo_reclamo: porcentajeEjecutivoReclamo,
                porcentaje_ejecutivo_cobranza: porcentajeEjecutivoCobranza
            } = req.body;
            const reciboDistribucion = 1;
            montoComision = montoComision.replace(/[Bs$€]/g, '').replace(' ', '');
            montoBonificacion = montoBonificacion.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComisionBonificacion = montoComisionBonificacion.replace(/[Bs$€]/g, '').replace(' ', '');
            totalComision = totalComision.replace(/[Bs$€]/g, '').replace(' ', '');
            porcentajeBonificacion = porcentajeBonificacion.replace(/[%]/g, '').replace(' ', '');
            porcentajeIslr = porcentajeIslr.replace(/[%]/g, '').replace(' ', '');
            porcentajeAgentePropio = porcentajeAgentePropio.replace(/[%]/g, '').replace(' ', '');
            porcentajeCasoEspecial = porcentajeCasoEspecial.replace(/[%]/g, '').replace(' ', '');
            porcentajeAtina = porcentajeAtina.replace(/[%]/g, '').replace(' ', '');
            porcentajeFundatina = porcentajeFundatina.replace(/[%]/g, '').replace(' ', '');
            porcentajeDirector = porcentajeDirector.replace(/[%]/g, '').replace(' ', '');
            porcentajeSocio = porcentajeSocio.replace(/[%]/g, '').replace(' ', '');
            porcentajeGerente = porcentajeGerente.replace(/[%]/g, '').replace(' ', '');
            porcentajeCoordinadorSuscripcion = porcentajeCoordinadorSuscripcion.replace(/[%]/g, '').replace(' ', '');
            porcentajeCoordinadorReclamo = porcentajeCoordinadorReclamo.replace(/[%]/g, '').replace(' ', '');
            porcentajeCoordinadorAdministracion = porcentajeCoordinadorAdministracion.replace(/[%]/g, '').replace(' ', '');
            porcentajeEjecutivoSuscripcion = porcentajeEjecutivoSuscripcion.replace(/[%]/g, '').replace(' ', '');
            porcentajeEjecutivoReclamo = porcentajeEjecutivoReclamo.replace(/[%]/g, '').replace(' ', '');
            porcentajeEjecutivoCobranza = porcentajeEjecutivoCobranza.replace(/[%]/g, '').replace(' ', '');
            montoComision = convertStringToNumber(montoComision);
            montoBonificacion = convertStringToNumber(montoBonificacion);
            montoComisionBonificacion = convertStringToNumber(montoComisionBonificacion);
            totalComision = convertStringToNumber(totalComision);
            porcentajeBonificacion = convertStringToNumber(porcentajeBonificacion);
            porcentajeIslr = convertStringToNumber(porcentajeIslr);
            porcentajeAgentePropio = convertStringToNumber(porcentajeAgentePropio);
            porcentajeCasoEspecial = convertStringToNumber(porcentajeCasoEspecial);
            porcentajeAtina = convertStringToNumber(porcentajeAtina);
            porcentajeFundatina = convertStringToNumber(porcentajeFundatina);
            porcentajeDirector = convertStringToNumber(porcentajeDirector);
            porcentajeSocio = convertStringToNumber(porcentajeSocio);
            porcentajeGerente = convertStringToNumber(porcentajeGerente);
            porcentajeCoordinadorSuscripcion = convertStringToNumber(porcentajeCoordinadorSuscripcion);
            porcentajeCoordinadorReclamo = convertStringToNumber(porcentajeCoordinadorReclamo);
            porcentajeCoordinadorAdministracion = convertStringToNumber(porcentajeCoordinadorAdministracion);
            porcentajeEjecutivoSuscripcion = convertStringToNumber(porcentajeEjecutivoSuscripcion);
            porcentajeEjecutivoReclamo = convertStringToNumber(porcentajeEjecutivoReclamo);
            porcentajeEjecutivoCobranza = convertStringToNumber(porcentajeEjecutivoCobranza);
            await distributionModel.postDistributionForm(
                montoComision, 
                montoBonificacion, 
                montoComisionBonificacion, 
                totalComision, 
                porcentajeBonificacion, 
                porcentajeIslr, 
                porcentajeAgentePropio, 
                porcentajeCasoEspecial, 
                porcentajeAtina, 
                porcentajeFundatina,
                porcentajeDirector,
                porcentajeSocio,
                porcentajeGerente,
                porcentajeCoordinadorSuscripcion,
                porcentajeCoordinadorReclamo,
                porcentajeCoordinadorAdministracion,
                porcentajeEjecutivoSuscripcion,
                porcentajeEjecutivoReclamo,
                porcentajeEjecutivoCobranza,
                idDivision
            );
            await divisionModel.updateReceiptDivision(idDivision, reciboDistribucion);
            res.redirect(`/sistema/subdivisions/${resultDivision[0].recibo_id}`);
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
/*                  PUT                  */
/*               DELETE                  */
}