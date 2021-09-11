const vehicleModel = require('../models/vehicle');
const polInsuInsuredVehiModel = require('../models/pol_insu_insured_vehi');

module.exports = {
/*                  GET                  */
/*                 POST                  */
    postVehicleForm: async (req, res) => {
        let blindaje = req.body.blindaje_boolean_vehiculo ? 1 : 0;
        let cedulaConductor = '';
        let rifConductor = '';
        let yearVehicle = new Date(req.body.year_vehiculo)
        yearVehicle = yearVehicle.getUTCFullYear();
        if (((req.body.id_rif_conductor.startsWith('J')) || (req.body.id_rif_conductor.startsWith('G')) || (req.body.id_rif_conductor.startsWith('V')))) {
            rifConductor = req.body.id_rif_conductor;
        } else {
            cedulaConductor = req.body.id_rif_conductor;
        }
        let vehicle = await vehicleModel.postVehicleForm(blindaje, cedulaConductor, rifConductor, yearVehicle, req.body);
        await polInsuInsuredVehiModel.postPolInsuInsuredVehi(vehicle.insertId);
        res.redirect('/sistema/add-vehicle-policy');
    }
/*                  PUT                  */
/*               DELETE                  */
}