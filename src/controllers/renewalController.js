const policyInsurerInsuredModel = require('../models/policy_insurer_insured');
const insurerModel = require('../models/insurer');
const insuredModel = require('../models/insured');
const policyModel = require('../models/policy');
const collectiveModel = require('../models/collective');
const collectiveInsurerInsuredModel = require('../models/collective_insurer_insured');

module.exports = {
/*                  GET                  */
    getRenewalConsultation: async (req, res) => {
        try {
            const resultsInsurers = await insurerModel.getInsurers();
            res.render('renewalConsultation', {
                insurers: resultsInsurers,
                name: req.session.name,
                cookieRol: req.cookies.rol 
            });
        } catch (error) {
            console.log(error);
        }
    },
/*                 POST                  */
    postRenewalConsultation: async (req, res) => {
        const resultsInsurers = await insurerModel.getInsurers();
        try {
            let { 
                numero_poliza: numeroPoliza, 
                nombre_aseguradora: nombreAseguradora,
                ramo_poliza: ramoPoliza,
                fecha_poliza: fechaPoliza,
                nombre_asegurado: nombreAsegurado,
                tipo_id_rif_asegurado: tipoIdRifAsegurado,
                id_rif_asegurado: idRifAsegurado,
                tipo_poliza: tipoPoliza
            } = req.body;
            const filters = []; 
            if (numeroPoliza !== '') {
                filters.push(policyCollective => policyCollective.numero_poliza === numeroPoliza);
            }
            if (nombreAseguradora !== '') {
                filters.push(policyCollective => policyCollective.nombre_aseguradora === nombreAseguradora);
            }
            if (ramoPoliza !== '') {
                filters.push(policyCollective => policyCollective.tipo_individual_poliza === ramoPoliza);
            }
            if (fechaPoliza !== '') {
                fechaPoliza = new Date(fechaPoliza);
                filters.push(policyCollective => policyCollective.fecha_desde_poliza.getTime() === fechaPoliza.getTime());
            }
            if (nombreAsegurado !== '') {
                filters.push(policyCollective => policyCollective.nombre_completo_razon_social_asegurado === nombreAsegurado);
            }
            if (idRifAsegurado !== '') {
                filters.push(policyCollective => policyCollective.cedula_rif_asegurado === idRifAsegurado && policyCollective.tipo_cedula_rif_asegurado === tipoIdRifAsegurado);
            }
            if (tipoPoliza !== '') {
                filters.push(policyCollective => policyCollective.tipo_poliza === tipoPoliza);
            }
            const resultPolicy = await policyModel.getPolicies();
            const resultPII = await policyInsurerInsuredModel.getPoliciesInsurersInsureds();
            const arrayPII = await Promise.all(
                resultPII.map(async (pii) => {
                    const resultInsurer = await insurerModel.getInsurer(pii.aseguradora_id);
                    const resultNaturalInsured = await insuredModel.getNaturalInsured(pii.asegurado_per_nat_id);
                    const resultLegalInsured = await insuredModel.getLegalInsured(pii.asegurado_per_jur_id);
                    if (resultLegalInsured.length === 0) {
                        return {
                            'tipo_poliza': 'INDIVIDUAL',
                            'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                            'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                            'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                            'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat
                        }
                    } else {
                        return {
                            'tipo_poliza': 'INDIVIDUAL',
                            'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                            'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                            'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                            'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur
                        }
                    }
                })
            );
            let nameArray = [];
            let typeIdRif = [];
            let idRif = [];
            let countCII = 0;
            const resultCollective = await collectiveModel.getCollectives();
            const resultCII = await collectiveInsurerInsuredModel.getCollectivesInsurersInsureds();
            const arrayCII = await Promise.all(
                resultCII.map(async (cii) => {
                    const resultInsurer = await insurerModel.getInsurer(cii.aseguradora_id);
                    const resultNaturalInsured = await insuredModel.getNaturalInsured(cii.asegurado_per_nat_id);
                    const resultLegalInsured = await insuredModel.getLegalInsured(cii.asegurado_per_jur_id);
                    if (resultLegalInsured.length === 0) {
                        const idsCollectives = resultCII.filter(idCollective => idCollective.colectivo_id === cii.colectivo_id);
                        if (idsCollectives.length > 1) {
                            nameArray.push(`${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`);
                            typeIdRif.push(resultNaturalInsured[0].tipo_cedula_asegurado_per_nat);
                            idRif.push(resultNaturalInsured[0].cedula_asegurado_per_nat);
                            countCII++;
                            if (idsCollectives.length === countCII) {
                                const objectCollective = {
                                    'tipo_poliza': 'COLECTIVO',
                                    'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                    'nombre_completo_razon_social_asegurado': nameArray,
                                    'tipo_cedula_rif_asegurado': typeIdRif,
                                    'cedula_rif_asegurado': idRif
                                };
                                nameArray = [];
                                typeIdRif = [];
                                idRif = [];
                                countCII = 0;
                                return objectCollective;
                            } else { 
                                return undefined
                            };
                        } else {
                            nameArray = [];
                            typeIdRif = [];
                            idRif = [];
                            countCII = 0;
                            return {
                                'tipo_poliza': 'COLECTIVO',
                                'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                                'nombre_completo_razon_social_asegurado': `${resultNaturalInsured[0].nombre_asegurado_per_nat} ${resultNaturalInsured[0].apellido_asegurado_per_nat}`,
                                'tipo_cedula_rif_asegurado': resultNaturalInsured[0].tipo_cedula_asegurado_per_nat,
                                'cedula_rif_asegurado': resultNaturalInsured[0].cedula_asegurado_per_nat
                            }
                        }
                    } else {
                        return {
                            'tipo_poliza': 'COLECTIVO',
                            'nombre_aseguradora': resultInsurer[0].nombre_aseguradora,
                            'nombre_completo_razon_social_asegurado': resultLegalInsured[0].razon_social_per_jur,
                            'tipo_cedula_rif_asegurado': resultLegalInsured[0].tipo_rif_asegurado_per_jur,
                            'cedula_rif_asegurado': resultLegalInsured[0].rif_asegurado_per_jur
                        }
                    }
                })
            );
            const arrayCIINew = arrayCII.filter(CIInew => CIInew !== undefined);
            const policyII = resultPolicy.map((item, i) => Object.assign({}, item, arrayPII[i]));
            const collectiveII = resultCollective.map((item, i) => {
                const objectCII = {
                    'id_poliza': item.id_colectivo,
                    'numero_poliza': item.numero_colectivo,
                    'nombre_tomador_poliza': item.nombre_tomador_colectivo,
                    'tipo_individual_poliza': item.tipo_colectivo,
                    'fecha_desde_poliza': item.fecha_desde_colectivo,
                    'fecha_hasta_poliza': item.fecha_hasta_colectivo,
                    'tipo_moneda_poliza': item.tipo_moneda_colectivo,
                    'prima_anual_poliza': item.prima_anual_colectivo,
                    'estatus_poliza': item.estatus_colectivo
                }
                return Object.assign({}, objectCII, arrayCIINew[i]);
            });
            const policyCollective = policyII.concat(collectiveII);
            const data = policyCollective.filter(policyCollective => filters.every(filterPolicy => filterPolicy(policyCollective)));
            data.forEach(item => {
                let primaPoliza = item.prima_anual_poliza;
                if (primaPoliza.toString().includes('.') === true) {
                    item.prima_anual_poliza = item.prima_anual_poliza.toString().replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.');
                } else {
                    item.prima_anual_poliza = String(item.prima_anual_poliza).replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ',00';
                }
                if (item.tipo_moneda_poliza === 'BOLÍVAR') {
                    item.prima_anual_poliza = `Bs ${item.prima_anual_poliza}`;
                } else if (item.tipo_moneda_poliza === 'DÓLAR') {
                    item.prima_anual_poliza = `$ ${item.prima_anual_poliza}`;
                } else if (item.tipo_moneda_poliza === 'EUROS') {
                    item.prima_anual_poliza = `€ ${item.prima_anual_poliza}`;
                }
                item.fecha_desde_poliza = item.fecha_desde_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1"); 
                item.fecha_hasta_poliza = item.fecha_hasta_poliza.toISOString().substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/g,"$3/$2/$1");
            });
            res.render('renewalConsultation', {
                data,
                insurers: resultsInsurers,
                name: req.session.name,
                cookieRol: req.cookies.rol 
            });
        } catch (error) {
            console.log(error);
        }
    },
/*                  PUT                  */
/*               DELETE                  */
}