

module.exports = {
/*                  GET                  */
    getVehiclePolicyForm: (req, res) => {
        res.render('vehiclePolicyForm', {
            name: req.session.name
        });
    },
/*                 POST                  */
/*                  PUT                  */
/*               DELETE                  */
}