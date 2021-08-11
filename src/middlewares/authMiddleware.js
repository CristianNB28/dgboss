const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
            if (error) {
                console.log(error);
                res.redirect('/sistema/login');
            } else {
                next();
            }
        })
    } else {
        res.redirect('/sistema/login');
    }
}

module.exports = requireAuth;