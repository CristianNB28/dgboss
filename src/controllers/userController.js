
module.exports = {
/*                  GET                  */
    getUserForm: (req, res) => {
        res.render('userForm', {
            name: req.session.name
        });
    },
/*                  POST                  */
    postUserForm: (req, res) => {
        res.send('Hello desde el post del formulario de un usuario');
    }
}