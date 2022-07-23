const requireRole = (roles) => {
    return (req, res, next) => {
        const roleInclude = roles.includes(req.cookies.rol);
        if (roleInclude) {
            next();
        } else {
            res.status(403).render('403');
        }
    }
}

module.exports = requireRole;