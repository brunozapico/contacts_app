module.exports = {
    isAuthenticated(req, res, next) {
        req.isAuthenticated() ? next() : res.redirect('/user/login');
    },
    isNotAuthenticated(req, res, next) {
        req.isAuthenticated() ? res.redirect('/user') : next();
    },
};