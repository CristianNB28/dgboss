

module.exports = {
/*                  GET                  */
    getIndex:  (req, res) => {
        res.render('index', {
            name: req.session.name
        });
    }
}