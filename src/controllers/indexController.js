

module.exports = {
/*                  GET                  */
    getIndex:  (req, res) => {
        res.render('index', {
            name: req.session.name
        });
    },
    get404:  (req, res) => {
        res.status(404);
        res.render('404');
    }
}