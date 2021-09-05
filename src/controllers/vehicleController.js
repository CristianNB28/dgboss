const vehicleModel = require('../models/vehicle');
const polInsuInsuredVehiModel = require('../models/pol_insu_insured_vehi');

module.exports = {
/*                  GET                  */
/*                 POST                  */
    postVehicleForm: async (req, res) => {
        let cedula_conductor = '';
        let rif_conductor = '';
        let year_vehicle = new Date(req.body.year_vehiculo)
        year_vehicle = year_vehicle.getUTCFullYear();
        if (((req.body.id_rif_conductor.startsWith('J')) || (req.body.id_rif_conductor.startsWith('G')) || (req.body.id_rif_conductor.startsWith('V')))) {
            rif_conductor = req.body.id_rif_conductor;
        } else {
            cedula_conductor = req.body.id_rif_conductor;
        }
        let vehicle = await vehicleModel.postVehicleForm(cedula_conductor, rif_conductor, year_vehicle, req.body);
        await polInsuInsuredVehiModel.postPolInsuInsuredVehi(vehicle.insertId);
        res.redirect('/sistema/add-vehicle-policy');
    }
/*                  PUT                  */
/*               DELETE                  */
}