// Models
const receiptModel = require('../models/receipt');
const collectiveModel = require('../models/collective');
const policyModel = require('../models/policy');
const insurerModel = require('../models/insurer');
const insuredModel = require('../models/insured');
const ownAgentModel = require('../models/own_agent');
const policyInsurerInsuredModel = require('../models/policy_insurer_insured');
const policyOwnAgentModel = require('../models/policy_own_agent');
const polInsInsurerBenefModel = require('../models/pol_insu_insured_benef');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');
const collectiveOwnAgentModel = require('../models/collective_own_agent');
const executiveModel = require('../models/executive');
const beneficiaryModel = require('../models/beneficiary');
const divisionModel = require('../models/division');
// Serializers
const convertStringToNumber = require('../serializers/convertStringToNumber');
const convertNumberToString = require('../serializers/convertNumberToString');

module.exports = {
/*                  GET                  */
    getReceipts: async (req, res) => {
        const resultsPoliciesReceipts = await policyModel.getPoliciesReceipts();
        const resultsCollectiveReceipts = await collectiveModel.getCollectiveReceipts();
        const arrayReceiptPolicy = await Promise.all(
            resultsPoliciesReceipts.map(async (policyReceipt) => {
                const resultPII = await policyInsurerInsuredModel.getPolicyInsurerInsured(policyReceipt.id_poliza);
                const resultNaturalInsured = await insuredModel.getNaturalInsured(resultPII[0].asegurado_per_nat_id);
                const resultLegalInsured = await insuredModel.getLegalInsured(resultPII[0].asegurado_per_jur_id);
                const fechaDesdeRecibo = policyReceipt.fecha_desde_recibo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"); 
                const fechaHastaRecibo = policyReceipt.fecha_hasta_recibo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
                if (resultLegalInsured.length === 0) {
                    return {
                        'numero_poliza': policyReceipt.numero_poliza,
                        'cedula_rif_tomador': policyReceipt.id_rif_tomador,
                        'nombre_completo_razon_social_tomador': policyReceipt.nombre_tomador_poliza,
                        'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                        'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                        'numero_recibo': policyReceipt.numero_recibo,
                        'tipo_recibo': policyReceipt.tipo_recibo,
                        'fecha_desde_recibo': fechaDesdeRecibo,
                        'fecha_hasta_recibo': fechaHastaRecibo,
                        'id_recibo': policyReceipt.id_recibo
                    }
                } else {
                    return {
                        'numero_poliza': policyReceipt.numero_poliza,
                        'cedula_rif_tomador': policyReceipt.id_rif_tomador,
                        'nombre_completo_razon_social_tomador': policyReceipt.nombre_tomador_poliza,
                        'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                        'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                        'numero_recibo': policyReceipt.numero_recibo,
                        'tipo_recibo': policyReceipt.tipo_recibo,
                        'fecha_desde_recibo': fechaDesdeRecibo,
                        'fecha_hasta_recibo': fechaHastaRecibo,
                        'id_recibo': policyReceipt.id_recibo
                    }
                }
            })
        );
        let nameArray = [];
        let cedulaArray = [];
        const arrayReceiptCollective = [];
        for (const collectiveReceipt of resultsCollectiveReceipts) {
            const resultCII = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(collectiveReceipt.id_colectivo);
            const resultNaturalInsured = await insuredModel.getNaturalInsured(resultCII[0].asegurado_per_nat_id);
            const resultLegalInsured = await insuredModel.getLegalInsured(resultCII[0].asegurado_per_jur_id);
            const fechaDesdeRecibo = collectiveReceipt.fecha_desde_recibo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"); 
            const fechaHastaRecibo = collectiveReceipt.fecha_hasta_recibo.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
            if (resultLegalInsured.length === 0) {
                const idsCollectives = resultCII.filter(idCollective => idCollective.colectivo_id === collectiveReceipt.id_colectivo);
                if (idsCollectives.length > 1) {
                    for (const elementCII of idsCollectives) {
                        const resultNaturalInsured = await insuredModel.getNaturalInsured(elementCII.asegurado_per_nat_id);
                        nameArray.push(`${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`);
                        cedulaArray.push(resultNaturalInsured[0].cedula_asegurado_per_nat);
                    }
                    const objectCollective = {
                        'numero_poliza': collectiveReceipt.numero_colectivo,
                        'cedula_rif_tomador': collectiveReceipt.id_rif_tomador,
                        'nombre_completo_razon_social_tomador': collectiveReceipt.nombre_tomador_colectivo,
                        'cedula_rif_asegurado': cedulaArray,
                        'nombre_completo_razon_social_asegurado': nameArray,
                        'numero_recibo': collectiveReceipt.numero_recibo,
                        'tipo_recibo': collectiveReceipt.tipo_recibo,
                        'fecha_desde_recibo': fechaDesdeRecibo,
                        'fecha_hasta_recibo': fechaHastaRecibo,
                        'id_recibo': collectiveReceipt.id_recibo
                    };
                    nameArray = [];
                    cedulaArray = [];
                    arrayReceiptCollective.push(objectCollective);
                } else {
                    nameArray = [];
                    cedulaArray = [];
                    const objectCollective = {
                        'numero_poliza': collectiveReceipt.numero_colectivo,
                        'cedula_rif_tomador': collectiveReceipt.id_rif_tomador,
                        'nombre_completo_razon_social_tomador': collectiveReceipt.nombre_tomador_colectivo,
                        'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat,
                        'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                        'numero_recibo': collectiveReceipt.numero_recibo,
                        'tipo_recibo': collectiveReceipt.tipo_recibo,
                        'fecha_desde_recibo': fechaDesdeRecibo,
                        'fecha_hasta_recibo': fechaHastaRecibo,
                        'id_recibo': collectiveReceipt.id_recibo
                    }
                    arrayReceiptCollective.push(objectCollective);
                }
            } else {
                const objectCollective = {
                    'numero_poliza': collectiveReceipt.numero_colectivo,
                    'cedula_rif_tomador': collectiveReceipt.id_rif_tomador,
                    'nombre_completo_razon_social_tomador': collectiveReceipt.nombre_tomador_colectivo,
                    'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur,
                    'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                    'numero_recibo': collectiveReceipt.numero_recibo,
                    'tipo_recibo': collectiveReceipt.tipo_recibo,
                    'fecha_desde_recibo': fechaDesdeRecibo,
                    'fecha_hasta_recibo': fechaHastaRecibo,
                    'id_recibo': collectiveReceipt.id_recibo
                }
                arrayReceiptCollective.push(objectCollective);
            }
        }
        const data = arrayReceiptPolicy.concat(arrayReceiptCollective);
        res.render('receipts', {
            data,
            name: req.session.name,
            cookieRol: req.cookies.rol
        });
    },
/*                 POST                  */
    postVehicleReceiptForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultPolicy = await policyModel.getPolicyLast();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultOwnAgent = [];
        let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
        let nameRazonInsured = ''; 
        const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
        }
        const policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
        if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else {
            const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
            primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
            primaNetaPoliza = primaNetaPoliza.toFixed(2);
            primaNetaPoliza = Number(primaNetaPoliza);
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        } else {
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        }
        try {
            let {
                prima_neta_recibo: montoPrimaNeta,
                igtf_recibo: montoIgtf,
                prima_total_recibo: montoPrimaTotal,
                monto_comision_recibo: montoComision,
                fecha_desde_recibo: fechaDesdeRecibo,
                fecha_hasta_recibo: fechaHastaRecibo,
                fecha_pago_recibo: fechaPagoRecibo,
            } = req.body;
            const temparrayDivision = [];
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComision = montoComision.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoComision = convertStringToNumber(montoComision);
            fechaPagoRecibo = new Date(fechaPagoRecibo);
            fechaDesdeRecibo = new Date(fechaDesdeRecibo);
            fechaHastaRecibo = new Date(fechaHastaRecibo);
            const receipt = await receiptModel.postReceiptPolicyForm(montoPrimaNeta, montoIgtf, montoPrimaTotal, montoComision, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, resultPolicy[0].id_poliza, req.body);
            if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
                for (let index = 0; index < resultPolicy[0].numero_pago_poliza; index++) {
                    temparrayDivision.push([
                        fechaDesdeRecibo,
                        fechaHastaRecibo,
                        montoPrimaNeta, 
                        montoIgtf, 
                        montoPrimaTotal,
                        montoComision,
                        receipt.insertId
                    ]);
                }
            } else {
                temparrayDivision.push([
                    fechaDesdeRecibo,
                    fechaHastaRecibo,
                    montoPrimaNeta, 
                    montoIgtf, 
                    montoPrimaTotal,
                    montoComision,
                    receipt.insertId
                ]);
            }
            await divisionModel.postDivisionForm(temparrayDivision);
            res.redirect('/sistema/add-vehicle-policy');
        } catch (error) {
            console.log(error);
            res.render('vehiclePolicyForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-vehicle-policy',
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postHealthReceiptForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultPolicy = await policyModel.getPolicyLast();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultsBeneficiaries = [];
        let resultOwnAgent = [];
        let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
        let nameRazonInsured = ''; 
        const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
        }
        const policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
        const polInsInsuredBef = await polInsInsurerBenefModel.getPolInsuInsuredBenef(policyInsurerInsured[0].id_paa);
        for (const beneficiary of polInsInsuredBef) {
            const resultBeneficiary = await beneficiaryModel.getBeneficiary(beneficiary.beneficiario_id);
            resultsBeneficiaries.push(resultBeneficiary[0]);
        }
        if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else {
            const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
            primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
            primaNetaPoliza = primaNetaPoliza.toFixed(2);
            primaNetaPoliza = Number(primaNetaPoliza);
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        } else {
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        }
        try {
            let {
                prima_neta_recibo: montoPrimaNeta,
                igtf_recibo: montoIgtf,
                prima_total_recibo: montoPrimaTotal,
                monto_comision_recibo: montoComision,
                fecha_desde_recibo: fechaDesdeRecibo,
                fecha_hasta_recibo: fechaHastaRecibo,
                fecha_pago_recibo: fechaPagoRecibo,
            } = req.body;
            const temparrayDivision = [];
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComision = montoComision.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoComision = convertStringToNumber(montoComision);
            fechaPagoRecibo = new Date(fechaPagoRecibo);
            fechaDesdeRecibo = new Date(fechaDesdeRecibo);
            fechaHastaRecibo = new Date(fechaHastaRecibo);
            const receipt = await receiptModel.postReceiptPolicyForm(montoPrimaNeta, montoIgtf, montoPrimaTotal, montoComision, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, resultPolicy[0].id_poliza, req.body);
            if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
                for (let index = 0; index < resultPolicy[0].numero_pago_poliza; index++) {
                    temparrayDivision.push([
                        fechaDesdeRecibo,
                        fechaHastaRecibo,
                        montoPrimaNeta, 
                        montoIgtf, 
                        montoPrimaTotal,
                        montoComision,
                        receipt.insertId
                    ]);
                }
            } else {
                temparrayDivision.push([
                    fechaDesdeRecibo,
                    fechaHastaRecibo,
                    montoPrimaNeta, 
                    montoIgtf, 
                    montoPrimaTotal,
                    montoComision,
                    receipt.insertId
                ]);
            }
            await divisionModel.postDivisionForm(temparrayDivision);
            res.redirect('/sistema/add-health-policy');
        } catch (error) {
            console.log(error);
            res.render('healthPolicyForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-health-policy',
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                data: resultsBeneficiaries,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postPatrimonialReceiptForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultPolicy = await policyModel.getPolicyLast();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultOwnAgent = [];
        let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
        let nameRazonInsured = ''; 
        const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
        }
        const policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
        if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else {
            const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
            primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
            primaNetaPoliza = primaNetaPoliza.toFixed(2);
            primaNetaPoliza = Number(primaNetaPoliza);
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        } else {
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        }
        try {
            let {
                prima_neta_recibo: montoPrimaNeta,
                igtf_recibo: montoIgtf,
                prima_total_recibo: montoPrimaTotal,
                monto_comision_recibo: montoComision,
                fecha_desde_recibo: fechaDesdeRecibo,
                fecha_hasta_recibo: fechaHastaRecibo,
                fecha_pago_recibo: fechaPagoRecibo,
            } = req.body;
            const temparrayDivision = [];
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComision = montoComision.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoComision = convertStringToNumber(montoComision);
            fechaPagoRecibo = new Date(fechaPagoRecibo);
            fechaDesdeRecibo = new Date(fechaDesdeRecibo);
            fechaHastaRecibo = new Date(fechaHastaRecibo);
            const receipt = await receiptModel.postReceiptPolicyForm(montoPrimaNeta, montoIgtf, montoPrimaTotal, montoComision, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, resultPolicy[0].id_poliza, req.body);
            if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
                for (let index = 0; index < resultPolicy[0].numero_pago_poliza; index++) {
                    temparrayDivision.push([
                        fechaDesdeRecibo,
                        fechaHastaRecibo,
                        montoPrimaNeta, 
                        montoIgtf, 
                        montoPrimaTotal,
                        montoComision,
                        receipt.insertId
                    ]);
                }
            } else {
                temparrayDivision.push([
                    fechaDesdeRecibo,
                    fechaHastaRecibo,
                    montoPrimaNeta, 
                    montoIgtf, 
                    montoPrimaTotal,
                    montoComision,
                    receipt.insertId
                ]);
            }
            await divisionModel.postDivisionForm(temparrayDivision);
            res.redirect('/sistema/add-patrimonial-policy');
        } catch (error) {
            console.log(error);
            res.render('patrimonialPolicyForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-patrimonial-policy',
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postBailReceiptForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultPolicy = await policyModel.getPolicyLast();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultOwnAgent = [];
        let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
        let nameRazonInsured = ''; 
        const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
        }
        const policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
        if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else {
            const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
            primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
            primaNetaPoliza = primaNetaPoliza.toFixed(2);
            primaNetaPoliza = Number(primaNetaPoliza);
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        } else {
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        }
        try {
            let {
                prima_neta_recibo: montoPrimaNeta,
                igtf_recibo: montoIgtf,
                prima_total_recibo: montoPrimaTotal,
                monto_comision_recibo: montoComision,
                fecha_desde_recibo: fechaDesdeRecibo,
                fecha_hasta_recibo: fechaHastaRecibo,
                fecha_pago_recibo: fechaPagoRecibo,
            } = req.body;
            const temparrayDivision = [];
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComision = montoComision.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoComision = convertStringToNumber(montoComision);
            fechaPagoRecibo = new Date(fechaPagoRecibo);
            fechaDesdeRecibo = new Date(fechaDesdeRecibo);
            fechaHastaRecibo = new Date(fechaHastaRecibo);
            const receipt = await receiptModel.postReceiptPolicyForm(montoPrimaNeta, montoIgtf, montoPrimaTotal, montoComision, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, resultPolicy[0].id_poliza, req.body);
            if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
                for (let index = 0; index < resultPolicy[0].numero_pago_poliza; index++) {
                    temparrayDivision.push([
                        fechaDesdeRecibo,
                        fechaHastaRecibo,
                        montoPrimaNeta, 
                        montoIgtf, 
                        montoPrimaTotal,
                        montoComision,
                        receipt.insertId
                    ]);
                }
            } else {
                temparrayDivision.push([
                    fechaDesdeRecibo,
                    fechaHastaRecibo,
                    montoPrimaNeta, 
                    montoIgtf, 
                    montoPrimaTotal,
                    montoComision,
                    receipt.insertId
                ]);
            }
            await divisionModel.postDivisionForm(temparrayDivision);
            res.redirect('/sistema/add-bail-policy');
        } catch (error) {
            console.log(error);
            res.render('bailPolicyForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-bail-policy',
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postAnotherBranchReceiptForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultPolicy = await policyModel.getPolicyLast();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultOwnAgent = [];
        let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
        let nameRazonInsured = ''; 
        const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
        }
        const policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
        if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else {
            const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
            primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
            primaNetaPoliza = primaNetaPoliza.toFixed(2);
            primaNetaPoliza = Number(primaNetaPoliza);
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        } else {
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        }
        try {
            let {
                prima_neta_recibo: montoPrimaNeta,
                igtf_recibo: montoIgtf,
                prima_total_recibo: montoPrimaTotal,
                monto_comision_recibo: montoComision,
                fecha_desde_recibo: fechaDesdeRecibo,
                fecha_hasta_recibo: fechaHastaRecibo,
                fecha_pago_recibo: fechaPagoRecibo,
            } = req.body;
            const temparrayDivision = [];
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComision = montoComision.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoComision = convertStringToNumber(montoComision);
            fechaPagoRecibo = new Date(fechaPagoRecibo);
            fechaDesdeRecibo = new Date(fechaDesdeRecibo);
            fechaHastaRecibo = new Date(fechaHastaRecibo);
            const receipt = await receiptModel.postReceiptPolicyForm(montoPrimaNeta, montoIgtf, montoPrimaTotal, montoComision, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, resultPolicy[0].id_poliza, req.body);
            if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
                for (let index = 0; index < resultPolicy[0].numero_pago_poliza; index++) {
                    temparrayDivision.push([
                        fechaDesdeRecibo,
                        fechaHastaRecibo,
                        montoPrimaNeta, 
                        montoIgtf, 
                        montoPrimaTotal,
                        montoComision,
                        receipt.insertId
                    ]);
                }
            } else {
                temparrayDivision.push([
                    fechaDesdeRecibo,
                    fechaHastaRecibo,
                    montoPrimaNeta, 
                    montoIgtf, 
                    montoPrimaTotal,
                    montoComision,
                    receipt.insertId
                ]);
            }
            await divisionModel.postDivisionForm(temparrayDivision);
            res.redirect('/sistema/add-another-branch-policy');
        } catch (error) {
            console.log(error);
            res.render('anotherBranchPolicyForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-another-branch-policy',
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postFuneralReceiptForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultPolicy = await policyModel.getPolicyLast();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultsBeneficiaries = [];
        let resultOwnAgent = [];
        let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
        let nameRazonInsured = ''; 
        const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
        }
        const policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
        const polInsInsuredBef = await polInsInsurerBenefModel.getPolInsuInsuredBenef(policyInsurerInsured[0].id_paa);
        for (const beneficiary of polInsInsuredBef) {
            const resultBeneficiary = await beneficiaryModel.getBeneficiary(beneficiary.beneficiario_id);
            resultsBeneficiaries.push(resultBeneficiary[0]);
        }
        if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else {
            const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
            primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
            primaNetaPoliza = primaNetaPoliza.toFixed(2);
            primaNetaPoliza = Number(primaNetaPoliza);
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        } else {
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        }
        try {
            let {
                prima_neta_recibo: montoPrimaNeta,
                igtf_recibo: montoIgtf,
                prima_total_recibo: montoPrimaTotal,
                monto_comision_recibo: montoComision,
                fecha_desde_recibo: fechaDesdeRecibo,
                fecha_hasta_recibo: fechaHastaRecibo,
                fecha_pago_recibo: fechaPagoRecibo,
            } = req.body;
            const temparrayDivision = [];
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComision = montoComision.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoComision = convertStringToNumber(montoComision);
            fechaPagoRecibo = new Date(fechaPagoRecibo);
            fechaDesdeRecibo = new Date(fechaDesdeRecibo);
            fechaHastaRecibo = new Date(fechaHastaRecibo);
            const receipt = await receiptModel.postReceiptPolicyForm(montoPrimaNeta, montoIgtf, montoPrimaTotal, montoComision, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, resultPolicy[0].id_poliza, req.body);
            if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
                for (let index = 0; index < resultPolicy[0].numero_pago_poliza; index++) {
                    temparrayDivision.push([
                        fechaDesdeRecibo,
                        fechaHastaRecibo,
                        montoPrimaNeta, 
                        montoIgtf, 
                        montoPrimaTotal,
                        montoComision,
                        receipt.insertId
                    ]);
                }
            } else {
                temparrayDivision.push([
                    fechaDesdeRecibo,
                    fechaHastaRecibo,
                    montoPrimaNeta, 
                    montoIgtf, 
                    montoPrimaTotal,
                    montoComision,
                    receipt.insertId
                ]);
            }
            await divisionModel.postDivisionForm(temparrayDivision);
            res.redirect('/sistema/add-funeral-policy');
        } catch (error) {
            console.log(error);
            res.render('funeralPolicyForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-funeral-policy',
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                data: resultsBeneficiaries,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postLifeReceiptForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultPolicy = await policyModel.getPolicyLast();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultsBeneficiaries = [];
        let resultOwnAgent = [];
        let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
        let nameRazonInsured = ''; 
        const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
        }
        const policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
        const polInsInsuredBef = await polInsInsurerBenefModel.getPolInsuInsuredBenef(policyInsurerInsured[0].id_paa);
        for (const beneficiary of polInsInsuredBef) {
            const resultBeneficiary = await beneficiaryModel.getBeneficiary(beneficiary.beneficiario_id);
            resultsBeneficiaries.push(resultBeneficiary[0]);
        }
        if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else {
            const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
            primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
            primaNetaPoliza = primaNetaPoliza.toFixed(2);
            primaNetaPoliza = Number(primaNetaPoliza);
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        } else {
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        }
        try {
            let {
                prima_neta_recibo: montoPrimaNeta,
                igtf_recibo: montoIgtf,
                prima_total_recibo: montoPrimaTotal,
                monto_comision_recibo: montoComision,
                fecha_desde_recibo: fechaDesdeRecibo,
                fecha_hasta_recibo: fechaHastaRecibo,
                fecha_pago_recibo: fechaPagoRecibo,
            } = req.body;
            const temparrayDivision = [];
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComision = montoComision.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoComision = convertStringToNumber(montoComision);
            fechaPagoRecibo = new Date(fechaPagoRecibo);
            fechaDesdeRecibo = new Date(fechaDesdeRecibo);
            fechaHastaRecibo = new Date(fechaHastaRecibo);
            const receipt = await receiptModel.postReceiptPolicyForm(montoPrimaNeta, montoIgtf, montoPrimaTotal, montoComision, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, resultPolicy[0].id_poliza, req.body);
            if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
                for (let index = 0; index < resultPolicy[0].numero_pago_poliza; index++) {
                    temparrayDivision.push([
                        fechaDesdeRecibo,
                        fechaHastaRecibo,
                        montoPrimaNeta, 
                        montoIgtf, 
                        montoPrimaTotal,
                        montoComision,
                        receipt.insertId
                    ]);
                }
            } else {
                temparrayDivision.push([
                    fechaDesdeRecibo,
                    fechaHastaRecibo,
                    montoPrimaNeta, 
                    montoIgtf, 
                    montoPrimaTotal,
                    montoComision,
                    receipt.insertId
                ]);
            }
            await divisionModel.postDivisionForm(temparrayDivision);
            res.redirect('/sistema/add-life-policy');
        } catch (error) {
            console.log(error);
            res.render('lifePolicyForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-life-policy',
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                data: resultsBeneficiaries,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postAPReceiptForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultPolicy = await policyModel.getPolicyLast();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultOwnAgent = [];
        let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
        let nameRazonInsured = ''; 
        const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
        }
        const policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
        if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else {
            const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
            primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
            primaNetaPoliza = primaNetaPoliza.toFixed(2);
            primaNetaPoliza = Number(primaNetaPoliza);
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        } else {
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        }
        try {
            let {
                prima_neta_recibo: montoPrimaNeta,
                igtf_recibo: montoIgtf,
                prima_total_recibo: montoPrimaTotal,
                monto_comision_recibo: montoComision,
                fecha_desde_recibo: fechaDesdeRecibo,
                fecha_hasta_recibo: fechaHastaRecibo,
                fecha_pago_recibo: fechaPagoRecibo,
            } = req.body;
            const temparrayDivision = [];
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComision = montoComision.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoComision = convertStringToNumber(montoComision);
            fechaPagoRecibo = new Date(fechaPagoRecibo);
            fechaDesdeRecibo = new Date(fechaDesdeRecibo);
            fechaHastaRecibo = new Date(fechaHastaRecibo);
            const receipt = await receiptModel.postReceiptPolicyForm(montoPrimaNeta, montoIgtf, montoPrimaTotal, montoComision, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, resultPolicy[0].id_poliza, req.body);
            if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
                for (let index = 0; index < resultPolicy[0].numero_pago_poliza; index++) {
                    temparrayDivision.push([
                        fechaDesdeRecibo,
                        fechaHastaRecibo,
                        montoPrimaNeta, 
                        montoIgtf, 
                        montoPrimaTotal,
                        montoComision,
                        receipt.insertId
                    ]);
                }
            } else {
                temparrayDivision.push([
                    fechaDesdeRecibo,
                    fechaHastaRecibo,
                    montoPrimaNeta, 
                    montoIgtf, 
                    montoPrimaTotal,
                    montoComision,
                    receipt.insertId
                ]);
            }
            await divisionModel.postDivisionForm(temparrayDivision);
            res.redirect('/sistema/add-ap-policy');
        } catch (error) {
            console.log(error);
            res.render('apPolicyForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-ap-policy',
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postTravelReceiptForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultPolicy = await policyModel.getPolicyLast();
        const resultsPolicies = await policyModel.getPoliciesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultOwnAgent = [];
        let primaNetaPoliza = resultPolicy[0].prima_neta_poliza;
        let nameRazonInsured = ''; 
        const resultPolicyOwnAgent = await policyOwnAgentModel.getPolicyOwnAgent(resultPolicy[0].id_poliza);
        if (resultPolicyOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultPolicyOwnAgent[0].agente_propio_id);
        }
        const policyInsurerInsured = await policyInsurerInsuredModel.getPolicyInsurerInsured(resultPolicy[0].id_poliza);
        const resultInsurer = await insurerModel.getInsurer(policyInsurerInsured[0].aseguradora_id);
        if (policyInsurerInsured[0].asegurado_per_jur_id === null) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(policyInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else {
            const resultLegalInsured = await insuredModel.getLegalInsured(policyInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
            primaNetaPoliza = primaNetaPoliza / resultPolicy[0].numero_pago_poliza;
            primaNetaPoliza = primaNetaPoliza.toFixed(2);
            primaNetaPoliza = Number(primaNetaPoliza);
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        } else {
            primaNetaPoliza = convertNumberToString(primaNetaPoliza);
        }
        try {
            let {
                prima_neta_recibo: montoPrimaNeta,
                igtf_recibo: montoIgtf,
                prima_total_recibo: montoPrimaTotal,
                monto_comision_recibo: montoComision,
                fecha_desde_recibo: fechaDesdeRecibo,
                fecha_hasta_recibo: fechaHastaRecibo,
                fecha_pago_recibo: fechaPagoRecibo,
            } = req.body;
            const temparrayDivision = [];
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComision = montoComision.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoComision = convertStringToNumber(montoComision);
            fechaPagoRecibo = new Date(fechaPagoRecibo);
            fechaDesdeRecibo = new Date(fechaDesdeRecibo);
            fechaHastaRecibo = new Date(fechaHastaRecibo);
            const receipt = await receiptModel.postReceiptPolicyForm(montoPrimaNeta, montoIgtf, montoPrimaTotal, montoComision, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, resultPolicy[0].id_poliza, req.body);
            if (resultPolicy[0].fraccionamiento_boolean_poliza === 1) {
                for (let index = 0; index < resultPolicy[0].numero_pago_poliza; index++) {
                    temparrayDivision.push([
                        fechaDesdeRecibo,
                        fechaHastaRecibo,
                        montoPrimaNeta, 
                        montoIgtf, 
                        montoPrimaTotal,
                        montoComision,
                        receipt.insertId
                    ]);
                }
            } else {
                temparrayDivision.push([
                    fechaDesdeRecibo,
                    fechaHastaRecibo,
                    montoPrimaNeta, 
                    montoIgtf, 
                    montoPrimaTotal,
                    montoComision,
                    receipt.insertId
                ]);
            }
            await divisionModel.postDivisionForm(temparrayDivision);
            res.redirect('/sistema/add-travel-policy');
        } catch (error) {
            console.log(error);
            res.render('travelPolicyForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-travel-policy',
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policy: resultPolicy[0],
                policies: resultsPolicies,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaPoliza,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postHealthReceiptCollectiveForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultCollective = await collectiveModel.getCollectiveLast();
        const resultsCollective = await collectiveModel.getCollectivesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultOwnAgent = [];
        let primaNetaColectivo = resultCollective[0].prima_neta_colectivo;
        let nameRazonInsured = '';
        const resultcollectiveOwnAgent = await collectiveOwnAgentModel.getCollectiveOwnAgent(resultCollective[0].id_colectivo);
        if (resultcollectiveOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultcollectiveOwnAgent[0].agente_propio_id);
        }
        const collectiveInsurerInsured = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultCollective[0].id_colectivo);
        const resultInsurer = await insurerModel.getInsurer(collectiveInsurerInsured[0].aseguradora_id);
        if ((collectiveInsurerInsured[0].asegurado_per_jur_id === null) && (collectiveInsurerInsured[0].asegurado_per_nat_id !== null)) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(collectiveInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else if ((collectiveInsurerInsured[0].asegurado_per_jur_id !== null) && (collectiveInsurerInsured[0].asegurado_per_nat_id === null)) {
            const resultLegalInsured = await insuredModel.getLegalInsured(collectiveInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultCollective[0].fraccionamiento_boolean_colectivo === 1) {
            primaNetaColectivo = primaNetaColectivo / resultCollective[0].numero_pago_colectivo;
            primaNetaColectivo = primaNetaColectivo.toFixed(2);
            primaNetaColectivo = Number(primaNetaColectivo);
            primaNetaColectivo = convertNumberToString(primaNetaColectivo);
        } else if (resultCollective[0].fraccionamiento_boolean_colectivo === 0) {
            primaNetaColectivo = convertNumberToString(primaNetaColectivo);
        }
        try {
            let {
                prima_neta_recibo: montoPrimaNeta,
                igtf_recibo: montoIgtf,
                prima_total_recibo: montoPrimaTotal,
                monto_comision_recibo: montoComision,
                fecha_desde_recibo: fechaDesdeRecibo,
                fecha_hasta_recibo: fechaHastaRecibo,
                fecha_pago_recibo: fechaPagoRecibo,
            } = req.body;
            const temparrayDivision = [];
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComision = montoComision.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoComision = convertStringToNumber(montoComision);
            fechaPagoRecibo = new Date(fechaPagoRecibo);
            fechaDesdeRecibo = new Date(fechaDesdeRecibo);
            fechaHastaRecibo = new Date(fechaHastaRecibo);
            const receipt = await receiptModel.postReceiptCollectiveForm(montoPrimaNeta, montoIgtf, montoPrimaTotal, montoComision, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, resultCollective[0].id_colectivo, req.body);
            if (resultCollective[0].fraccionamiento_boolean_colectivo === 1) {
                for (let index = 0; index < resultCollective[0].numero_pago_colectivo; index++) {
                    temparrayDivision.push([
                        fechaDesdeRecibo,
                        fechaHastaRecibo,
                        montoPrimaNeta, 
                        montoIgtf, 
                        montoPrimaTotal,
                        montoComision,
                        receipt.insertId
                    ]);
                }
            } else {
                temparrayDivision.push([
                    fechaDesdeRecibo,
                    fechaHastaRecibo,
                    montoPrimaNeta, 
                    montoIgtf, 
                    montoPrimaTotal,
                    montoComision,
                    receipt.insertId
                ]);
            }
            await divisionModel.postDivisionForm(temparrayDivision);
            res.redirect('/sistema/add-health-collective');
        } catch (error) {
            console.log(error);
            res.render('healthCollectiveForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-health-collective',
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collective: resultCollective[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaColectivo,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postVehicleReceiptCollectiveForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultCollective = await collectiveModel.getCollectiveLast();
        const resultsCollective = await collectiveModel.getCollectivesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultOwnAgent = [];
        let primaNetaColectivo = resultCollective[0].prima_neta_colectivo;
        let nameRazonInsured = '';
        const resultcollectiveOwnAgent = await collectiveOwnAgentModel.getCollectiveOwnAgent(resultCollective[0].id_colectivo);
        if (resultcollectiveOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultcollectiveOwnAgent[0].agente_propio_id);
        }
        const collectiveInsurerInsured = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultCollective[0].id_colectivo);
        const resultInsurer = await insurerModel.getInsurer(collectiveInsurerInsured[0].aseguradora_id);
        if ((collectiveInsurerInsured[0].asegurado_per_jur_id === null) && (collectiveInsurerInsured[0].asegurado_per_nat_id !== null)) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(collectiveInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else if ((collectiveInsurerInsured[0].asegurado_per_jur_id !== null) && (collectiveInsurerInsured[0].asegurado_per_nat_id === null)) {
            const resultLegalInsured = await insuredModel.getLegalInsured(collectiveInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultCollective[0].fraccionamiento_boolean_colectivo === 1) {
            primaNetaColectivo = primaNetaColectivo / resultCollective[0].numero_pago_colectivo;
            primaNetaColectivo = primaNetaColectivo.toFixed(2);
            primaNetaColectivo = Number(primaNetaColectivo);
            primaNetaColectivo = convertNumberToString(primaNetaColectivo);
        } else if (resultCollective[0].fraccionamiento_boolean_colectivo === 0) {
            primaNetaColectivo = convertNumberToString(primaNetaColectivo);
        }
        try {
            let {
                prima_neta_recibo: montoPrimaNeta,
                igtf_recibo: montoIgtf,
                prima_total_recibo: montoPrimaTotal,
                monto_comision_recibo: montoComision,
                fecha_desde_recibo: fechaDesdeRecibo,
                fecha_hasta_recibo: fechaHastaRecibo,
                fecha_pago_recibo: fechaPagoRecibo,
            } = req.body;
            const temparrayDivision = [];
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComision = montoComision.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoComision = convertStringToNumber(montoComision);
            fechaPagoRecibo = new Date(fechaPagoRecibo);
            fechaDesdeRecibo = new Date(fechaDesdeRecibo);
            fechaHastaRecibo = new Date(fechaHastaRecibo);
            const receipt = await receiptModel.postReceiptCollectiveForm(montoPrimaNeta, montoIgtf, montoPrimaTotal, montoComision, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, resultCollective[0].id_colectivo, req.body);
            if (resultCollective[0].fraccionamiento_boolean_colectivo === 1) {
                for (let index = 0; index < resultCollective[0].numero_pago_colectivo; index++) {
                    temparrayDivision.push([
                        fechaDesdeRecibo,
                        fechaHastaRecibo,
                        montoPrimaNeta, 
                        montoIgtf, 
                        montoPrimaTotal,
                        montoComision,
                        receipt.insertId
                    ]);
                }
            } else {
                temparrayDivision.push([
                    fechaDesdeRecibo,
                    fechaHastaRecibo,
                    montoPrimaNeta, 
                    montoIgtf, 
                    montoPrimaTotal,
                    montoComision,
                    receipt.insertId
                ]);
            }
            await divisionModel.postDivisionForm(temparrayDivision);
            res.redirect('/sistema/add-vehicle-collective');
        } catch (error) {
            console.log(error);
            res.render('vehicleCollectiveForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-vehicle-collective',
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collective: resultCollective[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaColectivo,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
    postRiskDiverseReceiptCollectiveForm: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        const resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        const resultsLegalInsureds = await insuredModel.getLegalInsureds();
        const resultCollective = await collectiveModel.getCollectiveLast();
        const resultsCollective = await collectiveModel.getCollectivesNumbers();
        const resultsReceipts = await receiptModel.getReceipts();
        const resultsExecutives = await executiveModel.getExecutives();
        const resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let resultOwnAgent = [];
        let primaNetaColectivo = resultCollective[0].prima_neta_colectivo;
        let nameRazonInsured = '';
        const resultcollectiveOwnAgent = await collectiveOwnAgentModel.getCollectiveOwnAgent(resultCollective[0].id_colectivo);
        if (resultcollectiveOwnAgent.length !== 0) {
            resultOwnAgent = await ownAgentModel.getOwnAgent(resultcollectiveOwnAgent[0].agente_propio_id);
        }
        const collectiveInsurerInsured = await collectiveInsurerInsuredModel.getCollectiveInsurerInsured(resultCollective[0].id_colectivo);
        const resultInsurer = await insurerModel.getInsurer(collectiveInsurerInsured[0].aseguradora_id);
        if ((collectiveInsurerInsured[0].asegurado_per_jur_id === null) && (collectiveInsurerInsured[0].asegurado_per_nat_id !== null)) {
            const resultNaturalInsured = await insuredModel.getNaturalInsured(collectiveInsurerInsured[0].asegurado_per_nat_id);
            nameRazonInsured = `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`;
        } else if ((collectiveInsurerInsured[0].asegurado_per_jur_id !== null) && (collectiveInsurerInsured[0].asegurado_per_nat_id === null)) {
            const resultLegalInsured = await insuredModel.getLegalInsured(collectiveInsurerInsured[0].asegurado_per_jur_id);
            nameRazonInsured = resultLegalInsured[0].razon_social_per_jur;
        }
        if (resultCollective[0].fraccionamiento_boolean_colectivo === 1) {
            primaNetaColectivo = primaNetaColectivo / resultCollective[0].numero_pago_colectivo;
            primaNetaColectivo = primaNetaColectivo.toFixed(2);
            primaNetaColectivo = Number(primaNetaColectivo);
            primaNetaColectivo = convertNumberToString(primaNetaColectivo);
        } else if (resultCollective[0].fraccionamiento_boolean_colectivo === 0) {
            primaNetaColectivo = convertNumberToString(primaNetaColectivo);
        }
        try {
            let {
                prima_neta_recibo: montoPrimaNeta,
                igtf_recibo: montoIgtf,
                prima_total_recibo: montoPrimaTotal,
                monto_comision_recibo: montoComision,
                fecha_desde_recibo: fechaDesdeRecibo,
                fecha_hasta_recibo: fechaHastaRecibo,
                fecha_pago_recibo: fechaPagoRecibo,
            } = req.body;
            const temparrayDivision = [];
            montoPrimaNeta = montoPrimaNeta.replace(/[Bs$€]/g, '').replace(' ', '');
            montoIgtf = montoIgtf.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaTotal = montoPrimaTotal.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComision = montoComision.replace(/[Bs$€]/g, '').replace(' ', '');
            montoPrimaNeta = convertStringToNumber(montoPrimaNeta);
            montoIgtf = convertStringToNumber(montoIgtf);
            montoPrimaTotal = convertStringToNumber(montoPrimaTotal);
            montoComision = convertStringToNumber(montoComision);
            fechaPagoRecibo = new Date(fechaPagoRecibo);
            fechaDesdeRecibo = new Date(fechaDesdeRecibo);
            fechaHastaRecibo = new Date(fechaHastaRecibo);
            const receipt = await receiptModel.postReceiptCollectiveForm(montoPrimaNeta, montoIgtf, montoPrimaTotal, montoComision, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, resultCollective[0].id_colectivo, req.body);
            if (resultCollective[0].fraccionamiento_boolean_colectivo === 1) {
                for (let index = 0; index < resultCollective[0].numero_pago_colectivo; index++) {
                    temparrayDivision.push([
                        fechaDesdeRecibo,
                        fechaHastaRecibo,
                        montoPrimaNeta, 
                        montoIgtf, 
                        montoPrimaTotal,
                        montoComision,
                        receipt.insertId
                    ]);
                }
            } else {
                temparrayDivision.push([
                    fechaDesdeRecibo,
                    fechaHastaRecibo,
                    montoPrimaNeta, 
                    montoIgtf, 
                    montoPrimaTotal,
                    montoComision,
                    receipt.insertId
                ]);
            }
            await divisionModel.postDivisionForm(temparrayDivision);
            res.redirect('/sistema/add-risk-diverse-collective');
        } catch (error) {
            console.log(error);
            res.render('riskDiverseCollectiveForm', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'sistema/add-risk-diverse-collective',
                insurers: resultsInsurers,
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                collective: resultCollective[0],
                collectives: resultsCollective,
                receipts: resultsReceipts,
                executives: resultsExecutives,
                ownAgents: resultsOwnAgents,
                insurer: resultInsurer[0],
                ownAgent: resultOwnAgent[0],
                primaNetaColectivo,
                nameRazonInsured,
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        }
    },
/*                  PUT                  */
    putReceipt: async (req, res, next) => {
        let valoresAceptados = /^[0-9]+$/;
        let idReceipt = req.params.id;
        if (idReceipt.match(valoresAceptados)) {
            let resultReceipt = await receiptModel.getReceipt(idReceipt);
            let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
            let resultsLegalInsureds = await insuredModel.getLegalInsureds();
            let resultsPolicies = await policyModel.getPolicies();
            let resultsCollectives = await collectiveModel.getCollectives();
            let resultsOwnAgents = await ownAgentModel.getOwnAgents();
            let resultPolicy = [];
            let resultCollective = [];
            let resultNaturalInsured = [];
            let resultLegalInsured = [];
            let resultOwnAgent = [];
            let resultsNaturalInsured = [];
            let namesNaturalInsured = [];
            let idNaturalInsured = []; 
            let fechaDesdeRecibo = resultReceipt[0].fecha_desde_recibo;
            let fechaHastaRecibo = resultReceipt[0].fecha_hasta_recibo;
            let fechaPagoRecibo = resultReceipt[0].fecha_pago_recibo;
            let primaRecibo = resultReceipt[0].monto_prima_recibo;
            let comisionRecibo = resultReceipt[0].monto_comision_recibo;
            if (primaRecibo.toString().includes('.') === true) {
                primaRecibo = primaRecibo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                primaRecibo = String(primaRecibo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (comisionRecibo.toString().includes('.') === true) {
                comisionRecibo = comisionRecibo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
            } else {
                comisionRecibo = String(comisionRecibo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
            }
            if (fechaPagoRecibo === null) {
                fechaPagoRecibo = '';
            } else {
                fechaPagoRecibo = fechaPagoRecibo.toISOString().substring(0, 10);
            }
            if (fechaDesdeRecibo === null) {
                fechaDesdeRecibo = '';
            } else {
                fechaDesdeRecibo = fechaDesdeRecibo.toISOString().substring(0, 10);
            }
            if (fechaHastaRecibo === null) {
                fechaHastaRecibo = '';
            } else {
                fechaHastaRecibo = fechaHastaRecibo.toISOString().substring(0, 10);
            }
            if (resultReceipt[0].colectivo_id === null) {
                resultPolicy = await policyModel.getPolicy(resultReceipt[0].poliza_id);
                if (resultPolicy[0].tipo_moneda_poliza === 'BOLÍVAR') {
                    primaRecibo = `Bs ${primaRecibo}`;
                    comisionRecibo = `Bs ${comisionRecibo}`;
                } else if (resultPolicy[0].tipo_moneda_poliza === 'DÓLAR') {
                    primaRecibo = `$ ${primaRecibo}`;
                    comisionRecibo = `$ ${comisionRecibo}`;
                } else if (resultPolicy[0].tipo_moneda_poliza === 'EUROS') {
                    primaRecibo = `€ ${primaRecibo}`;
                    comisionRecibo = `€ ${comisionRecibo}`;
                }
                let resultReceiptInsured = await receiptInsuredModel.getReceiptInsured(resultReceipt[0].id_recibo);
                if (resultReceiptInsured[0].asegurado_per_jur_id === null) {
                    resultNaturalInsured = await insuredModel.getNaturalInsured(resultReceiptInsured[0].asegurado_per_nat_id);
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                } else {
                    resultLegalInsured = await insuredModel.getLegalInsured(resultReceiptInsured[0].asegurado_per_jur_id);
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
                }
            } else {
                resultCollective = await collectiveModel.getCollective(resultReceipt[0].colectivo_id);
                if (resultCollective[0].tipo_moneda_colectivo === 'BOLÍVAR') {
                    primaRecibo = `Bs ${primaRecibo}`;
                    comisionRecibo = `Bs ${comisionRecibo}`;
                } else if (resultCollective[0].tipo_moneda_colectivo === 'DÓLAR') {
                    primaRecibo = `$ ${primaRecibo}`;
                    comisionRecibo = `$ ${comisionRecibo}`;
                } else if (resultCollective[0].tipo_moneda_colectivo === 'EUROS') {
                    primaRecibo = `€ ${primaRecibo}`;
                    comisionRecibo = `€ ${comisionRecibo}`;
                }
                let resultReceiptInsured = await receiptInsuredModel.getReceiptInsured(resultReceipt[0].id_recibo);
                if (resultReceiptInsured[0].asegurado_per_jur_id === null) {
                    if (resultReceiptInsured.length > 1) {
                        for (const receiptInsured of resultReceiptInsured) {
                            resultNaturalInsured = await insuredModel.getNaturalInsured(receiptInsured.asegurado_per_nat_id);
                            resultsNaturalInsured.push(resultNaturalInsured);
                            namesNaturalInsured = resultsNaturalInsured.map(naturalInsured => {
                                let names = naturalInsured[0].nombre_asegurado_per_nat + naturalInsured[0].apellido_asegurado_per_nat;
                                return names;
                            });
                            idNaturalInsured = resultsNaturalInsured.map(naturalInsured => naturalInsured[0].cedula_asegurado_per_nat);
                            resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                        }
                    } else {
                        resultNaturalInsured = await insuredModel.getNaturalInsured(resultReceiptInsured[0].asegurado_per_nat_id);
                        resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                    }
                } else {
                    resultLegalInsured = await insuredModel.getLegalInsured(resultReceiptInsured[0].asegurado_per_jur_id);
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
                }
            }
            res.render('editReceipt', {
                naturalInsureds: resultsNaturalInsureds,
                legalInsureds: resultsLegalInsureds,
                policies: resultsPolicies,
                collectives: resultsCollectives,
                ownAgents: resultsOwnAgents,
                fechaDesdeRecibo: fechaDesdeRecibo,
                fechaHastaRecibo: fechaHastaRecibo,
                fechaPagoRecibo: fechaPagoRecibo,
                primaRecibo: primaRecibo,
                comisionRecibo: comisionRecibo,
                policy: resultPolicy[0],
                collective: resultCollective[0],
                naturalInsured: resultNaturalInsured[0],
                resultsNaturalInsured: resultsNaturalInsured,
                namesNaturalInsured: namesNaturalInsured,
                idNaturalInsured: idNaturalInsured,
                legalInsured: resultLegalInsured[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0],
                name: req.session.name,
                cookieRol: req.cookies.rol
            });
        } else {
            next();
        }
    },
    updateReceipt: async (req, res) => {
        let resultsNaturalInsureds = await insuredModel.getNaturalInsureds();
        let resultsLegalInsureds = await insuredModel.getLegalInsureds();
        let resultsPolicies = await policyModel.getPolicies();
        let resultsCollectives = await collectiveModel.getCollectives();
        let resultsOwnAgents = await ownAgentModel.getOwnAgents();
        let idReceipt = req.body.id_recibo;
        let resultReceipt = await receiptModel.getReceipt(idReceipt);
        let resultPolicy = [];
        let resultCollective = [];
        let resultNaturalInsured = [];
        let resultLegalInsured = [];
        let resultOwnAgent = [];
        let resultsNaturalInsured = [];
        let namesNaturalInsured = [];
        let idNaturalInsured = []; 
        let fechaDesdeRecibo = resultReceipt[0].fecha_desde_recibo;
        let fechaHastaRecibo = resultReceipt[0].fecha_hasta_recibo;
        let fechaPagoRecibo = resultReceipt[0].fecha_pago_recibo;
        let primaRecibo = resultReceipt[0].monto_prima_recibo;
        let comisionRecibo = resultReceipt[0].monto_comision_recibo;
        if (primaRecibo.toString().includes('.') === true) {
            primaRecibo = primaRecibo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            primaRecibo = String(primaRecibo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (comisionRecibo.toString().includes('.') === true) {
            comisionRecibo = comisionRecibo.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
        } else {
            comisionRecibo = String(comisionRecibo).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
        }
        if (fechaPagoRecibo === null) {
            fechaPagoRecibo = '';
        } else {
            fechaPagoRecibo = fechaPagoRecibo.toISOString().substring(0, 10);
        }
        if (fechaDesdeRecibo === null) {
            fechaDesdeRecibo = '';
        } else {
            fechaDesdeRecibo = fechaDesdeRecibo.toISOString().substring(0, 10);
        }
        if (fechaHastaRecibo === null) {
            fechaHastaRecibo = '';
        } else {
            fechaHastaRecibo = fechaHastaRecibo.toISOString().substring(0, 10);
        }
        if (resultReceipt[0].colectivo_id === null) {
            resultPolicy = await policyModel.getPolicy(resultReceipt[0].poliza_id);
            let resultReceiptInsured = await receiptInsuredModel.getReceiptInsured(resultReceipt[0].id_recibo);
            if (resultReceiptInsured[0].asegurado_per_jur_id === null) {
                resultNaturalInsured = await insuredModel.getNaturalInsured(resultReceiptInsured[0].asegurado_per_nat_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
            } else {
                resultLegalInsured = await insuredModel.getLegalInsured(resultReceiptInsured[0].asegurado_per_jur_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
            }
        } else {
            resultCollective = await collectiveModel.getCollective(resultReceipt[0].colectivo_id);
            let resultReceiptInsured = await receiptInsuredModel.getReceiptInsured(resultReceipt[0].id_recibo);
            if (resultReceiptInsured[0].asegurado_per_jur_id === null) {
                if (resultReceiptInsured.length > 1) {
                    for (const receiptInsured of resultReceiptInsured) {
                        resultNaturalInsured = await insuredModel.getNaturalInsured(receiptInsured.asegurado_per_nat_id);
                        resultsNaturalInsured.push(resultNaturalInsured);
                        namesNaturalInsured = resultsNaturalInsured.map(naturalInsured => {
                            let names = naturalInsured[0].nombre_asegurado_per_nat + naturalInsured[0].apellido_asegurado_per_nat;
                            return names;
                        });
                        idNaturalInsured = resultsNaturalInsured.map(naturalInsured => naturalInsured[0].cedula_asegurado_per_nat);
                    }
                } else {
                    resultNaturalInsured = await insuredModel.getNaturalInsured(resultReceiptInsured[0].asegurado_per_nat_id);
                    resultOwnAgent = await ownAgentModel.getOwnAgent(resultNaturalInsured[0].agente_propio_id);
                }
            } else {
                resultLegalInsured = await insuredModel.getLegalInsured(resultReceiptInsured[0].asegurado_per_jur_id);
                resultOwnAgent = await ownAgentModel.getOwnAgent(resultLegalInsured[0].agente_propio_id);
            }
        }
        try {
            const tipoIdRifAsegurado = req.body.tipo_id_rif_asegurado;
            let fraccionamiento = req.body.fraccionamiento_boolean_recibo ? 1 : 0;
            let montoPrimaRecibo = req.body.monto_prima_recibo;
            let montoComisionRecibo = req.body.monto_comision_recibo;
            let numeroPago = parseInt(req.body.numero_pago_recibo);
            let fechaDesdeRecibo = new Date(req.body.fecha_desde_recibo);
            let fechaHastaRecibo = new Date(req.body.fecha_hasta_recibo);
            let fechaPagoRecibo = new Date(req.body.fecha_pago_recibo);
            let resultPolicyId = await policyModel.getPolicyNumberId(req.body.numero_poliza_colectivo);
            let resultCollectiveId = await collectiveModel.getCollectiveNumberId(req.body.numero_poliza_colectivo);
            let cedulaAseguradoNatural = '';
            let rifAseguradoJuridico = '';
            montoPrimaRecibo = montoPrimaRecibo.replace(/[Bs$€]/g, '').replace(' ', '');
            montoComisionRecibo = montoComisionRecibo.replace(/[Bs$€]/g, '').replace(' ', '');
            if ((montoPrimaRecibo.indexOf(',') !== -1) && (montoPrimaRecibo.indexOf('.') !== -1)) {
                montoPrimaRecibo = montoPrimaRecibo.replace(",", ".");
                montoPrimaRecibo = montoPrimaRecibo.replace(".", ",");
                montoPrimaRecibo = parseFloat(montoPrimaRecibo.replace(/,/g,''));
            } else if (montoPrimaRecibo.indexOf(',') !== -1) {
                montoPrimaRecibo = montoPrimaRecibo.replace(",", ".");
                montoPrimaRecibo = parseFloat(montoPrimaRecibo);
            }
            if ((montoComisionRecibo.indexOf(',') !== -1) && (montoComisionRecibo.indexOf('.') !== -1)) {
                montoComisionRecibo = montoComisionRecibo.replace(",", ".");
                montoComisionRecibo = montoComisionRecibo.replace(".", ",");
                montoComisionRecibo = parseFloat(montoComisionRecibo.replace(/,/g,''));
            } else if (montoComisionRecibo.indexOf(',') !== -1) {
                montoComisionRecibo = montoComisionRecibo.replace(",", ".");
                montoComisionRecibo = parseFloat(montoComisionRecibo);
            } else if (montoComisionRecibo.indexOf('.') !== -1) {
                montoComisionRecibo = montoComisionRecibo.replace(".", ",");
                montoComisionRecibo = parseFloat(montoComisionRecibo.replace(/,/g,''));
            }
            if ((tipoIdRifAsegurado === 'J') || (tipoIdRifAsegurado === 'G') || (tipoIdRifAsegurado === 'I') || (tipoIdRifAsegurado === 'F')) {
                rifAseguradoJuridico = req.body.id_rif_asegurado;
            } else {
                cedulaAseguradoNatural = req.body.id_rif_asegurado;
            }
            if (resultPolicyId.length === 0) {
                let policyId = null;
                await receiptModel.updateReceiptCollective(fraccionamiento, montoPrimaRecibo, montoComisionRecibo, numeroPago, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, policyId, resultCollectiveId, req.body);
                if (rifAseguradoJuridico === '') {
                    let legalId = null;
                    if (cedulaAseguradoNatural.includes(',') === false) {
                        let resultNaturalId = await insuredModel.getNaturalInsuredId(cedulaAseguradoNatural);
                        await receiptInsuredModel.updateReceiptNaturalInsured(legalId, resultNaturalId[0].id_asegurado_per_nat, req.body.id_recibo);
                        const resultNaturalInsured = resultsNaturalInsureds.filter(naturalInsured => naturalInsured.id_asegurado_per_nat === resultNaturalId[0].id_asegurado_per_nat);
                        if (resultNaturalInsured[0].agente_propio_id === null) {
                            nombreCompletoAgentePropio = req.body.nombre_agente_propio;
                            let nombreAgentePropio = nombreCompletoAgentePropio.split(' ', 1).join(' ');
                            let apellidoAgentePropio = nombreCompletoAgentePropio.split(' ').slice(1,2).join(' ');
                            let idAgentePropio = await ownAgentModel.getOwnAgentId(nombreAgentePropio, apellidoAgentePropio);
                            await insuredModel.updateOwnAgentNaturalInsured(resultNaturalId[0].id_asegurado_per_nat, idAgentePropio[0].id_agente_propio);
                        }
                    } else {
                        arrIdNaturalInsured = cedulaAseguradoNatural.split(',');
                        nombreCompletoAgentePropio = req.body.nombre_agente_propio;
                        let nombreAgentePropio = nombreCompletoAgentePropio.split(' ', 1).join(' ');
                        let apellidoAgentePropio = nombreCompletoAgentePropio.split(' ').slice(1,2).join(' ');
                        let idAgentePropio = await ownAgentModel.getOwnAgentId(nombreAgentePropio, apellidoAgentePropio);
                        for (const idNaturalInsured of arrIdNaturalInsured) {
                            let resultNaturalId = await insuredModel.getNaturalInsuredId(idNaturalInsured);
                            await insuredModel.updateOwnAgentNaturalInsured(resultNaturalId[0].id_asegurado_per_nat, idAgentePropio[0].id_agente_propio);
                            let resultReceiptInsured = await receiptInsuredModel.getReceiptInsuredId(req.body.id_recibo, resultNaturalId[0].id_asegurado_per_nat);
                            await receiptInsuredModel.updateReceiptInsured(resultReceiptInsured[0].id_recibo_asegurado, legalId, resultNaturalId[0].id_asegurado_per_nat, req.body.id_recibo);
                        }
                    }
                } else {
                    let naturalId = null;
                    let resultLegalId = await insuredModel.getLegalInsuredId(rifAseguradoJuridico);
                    await receiptInsuredModel.updateReceiptLegalInsured(naturalId, resultLegalId[0].id_asegurado_per_jur, req.body.id_recibo);
                    const resultLegalInsured = resultsLegalInsureds.filter(legalInsured => legalInsured.id_asegurado_per_jur === resultLegalId[0].id_asegurado_per_jur);
                    if (resultLegalInsured[0].agente_propio_id === null) {
                        nombreCompletoAgentePropio = req.body.nombre_agente_propio;
                        let nombreAgentePropio = nombreCompletoAgentePropio.split(' ', 1).join(' ');
                        let apellidoAgentePropio = nombreCompletoAgentePropio.split(' ').slice(1,2).join(' ');
                        let idAgentePropio = await ownAgentModel.getOwnAgentId(nombreAgentePropio, apellidoAgentePropio);
                        await insuredModel.updateOwnAgentLegalInsured(resultLegalId[0].id_asegurado_per_jur, idAgentePropio[0].id_agente_propio);
                    }
                }
            } else {
                let collectiveId = null;
                await receiptModel.updateReceiptPolicy(fraccionamiento, montoPrimaRecibo, montoComisionRecibo, numeroPago, fechaDesdeRecibo, fechaHastaRecibo, fechaPagoRecibo, collectiveId, resultPolicyId, req.body);
                if (rifAseguradoJuridico === '') {
                    let legalId = null;
                    let resultNaturalId = await insuredModel.getNaturalInsuredId(cedulaAseguradoNatural);
                    await receiptInsuredModel.updateReceiptNaturalInsured(legalId, resultNaturalId[0].id_asegurado_per_nat, req.body.id_recibo);
                    const resultNaturalInsured = resultsNaturalInsureds.filter(naturalInsured => naturalInsured.id_asegurado_per_nat === resultNaturalId[0].id_asegurado_per_nat);
                    if (resultNaturalInsured[0].agente_propio_id === null) {
                        nombreCompletoAgentePropio = req.body.nombre_agente_propio;
                        let nombreAgentePropio = nombreCompletoAgentePropio.split(' ', 1).join(' ');
                        let apellidoAgentePropio = nombreCompletoAgentePropio.split(' ').slice(1,2).join(' ');
                        let idAgentePropio = await ownAgentModel.getOwnAgentId(nombreAgentePropio, apellidoAgentePropio);
                        await insuredModel.updateOwnAgentNaturalInsured(resultNaturalId[0].id_asegurado_per_nat, idAgentePropio[0].id_agente_propio);
                    }
                } else {
                    let naturalId = null;
                    let resultLegalId = await insuredModel.getLegalInsuredId(rifAseguradoJuridico);
                    await receiptInsuredModel.updateReceiptLegalInsured(naturalId, resultLegalId[0].id_asegurado_per_jur, req.body.id_recibo);
                    const resultLegalInsured = resultsLegalInsureds.filter(legalInsured => legalInsured.id_asegurado_per_jur === resultLegalId[0].id_asegurado_per_jur);
                    if (resultLegalInsured[0].agente_propio_id === null) {
                        nombreCompletoAgentePropio = req.body.nombre_agente_propio;
                        let nombreAgentePropio = nombreCompletoAgentePropio.split(' ', 1).join(' ');
                        let apellidoAgentePropio = nombreCompletoAgentePropio.split(' ').slice(1,2).join(' ');
                        let idAgentePropio = await ownAgentModel.getOwnAgentId(nombreAgentePropio, apellidoAgentePropio);
                        await insuredModel.updateOwnAgentLegalInsured(resultLegalId[0].id_asegurado_per_jur, idAgentePropio[0].id_agente_propio);
                    }
                }
            }
            res.render('editReceipt', {
                alert: true,
                alertTitle: 'Exitoso',
                alertMessage: 'Se actualizaron los datos exitosamente',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: `sistema/edit-receipt/${idReceipt}`,
                name: req.session.name,
                cookieRol: req.cookies.rol,
                resultsNaturalInsured: resultsNaturalInsured,
                legalInsureds: resultsLegalInsureds,
                policies: resultsPolicies,
                collectives: resultsCollectives,
                ownAgents: resultsOwnAgents,
                fechaDesdeRecibo: fechaDesdeRecibo,
                fechaHastaRecibo: fechaHastaRecibo,
                fechaPagoRecibo: fechaPagoRecibo,
                primaRecibo: primaRecibo,
                comisionRecibo: comisionRecibo,
                policy: resultPolicy[0],
                collective: resultCollective[0],
                naturalInsured: resultNaturalInsured[0],
                naturalInsureds: resultsNaturalInsured,
                namesNaturalInsured: namesNaturalInsured,
                idNaturalInsured: idNaturalInsured,
                legalInsured: resultLegalInsured[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0]
            });
        } catch (error) {
            console.log(error);
            res.render('editReceipt', {
                alert: true,
                alertTitle: 'Error',
                alertMessage: error.message,
                alertIcon: 'error',
                showConfirmButton: true,
                timer: 1500,
                ruta: `sistema/edit-receipt/${idReceipt}`,
                name: req.session.name,
                cookieRol: req.cookies.rol,
                resultsNaturalInsured: resultsNaturalInsured,
                legalInsureds: resultsLegalInsureds,
                policies: resultsPolicies,
                collectives: resultsCollectives,
                ownAgents: resultsOwnAgents,
                fechaDesdeRecibo: fechaDesdeRecibo,
                fechaHastaRecibo: fechaHastaRecibo,
                fechaPagoRecibo: fechaPagoRecibo,
                primaRecibo: primaRecibo,
                comisionRecibo: comisionRecibo,
                policy: resultPolicy[0],
                collective: resultCollective[0],
                naturalInsured: resultNaturalInsured[0],
                naturalInsureds: resultsNaturalInsured,
                namesNaturalInsured: namesNaturalInsured,
                idNaturalInsured: idNaturalInsured,
                legalInsured: resultLegalInsured[0],
                ownAgent: resultOwnAgent[0],
                receipt: resultReceipt[0]
            });
        }
    },
/*               DELETE                  */
    disableReceipt: async (req, res) => {
        const disableReceipt = 1;
        const disableReceiptDivision = 1;
        await divisionModel.disableReceiptDivision(req.params.id, disableReceiptDivision);
        await receiptModel.updateDisableReceipt(req.params.id, req.body);
        await receiptModel.disableReceipt(req.params.id, disableReceipt); 
        res.redirect('/sistema/receipts');
    }
}