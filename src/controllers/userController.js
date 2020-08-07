const passport = require('../lib/passport');
const { validationResult } = require('express-validator');
let db = require('../database/models');

const { encryptPassword } = require('../lib/bcrypt');

module.exports = {
    profile(req, res, next) {
        try {
            db.User.findByPk(req.user.id)
            .then(user => user ? res.render('./user/profile', {user}) : res.redirect('user/login'))
            .catch(err => res.status(500).json({msg: 'User not found.'}));
        } catch (err) {
            res.status(500).json({msg: err});
        };
    },
    signup_get(req, res, next) {
        try {
            res.render('./user/signup', { errors: req.flash('err'), validations: req.flash('validations')});
        } catch (err) {
            res.status(500).json({msg: err});
        };
    },
    signup_post(req, res, next) {
        try {
            passport.authenticate('local.signup', {
                successRedirect: '/user',
                failureRedirect: '/user/signup',
                failureFlash: true
            })(req, res, next)
            console.log(req.flash('err'))
        } catch (err) {
            res.status(500).json({msg: err});
        };
    },
    login_get(req, res, next) {
        try {
            res.render('./user/login', { errors: req.flash('err'), validations: req.flash('validations')});
        } catch (err) {
            res.status(500).json({msg: err});
        };
    },
    login_post(req, res, next) {
        try {
            passport.authenticate('local.signin', {
                successRedirect: '/user',
                failureRedirect: '/user/login',
                failureFlash: true
            })(req, res, next)
        } catch (err) {
            res.status(500).json({msg: err});
        };
    },
    update_get(req, res, next) {
        try {
            res.render('./user/edit_profile', {user: req.user});
        } catch (err) {
            res.status(500).json({msg: err});
        };
    },
    update_post(req, res, next) {
        try {
            let errors = validationResult(req);
            if(!errors.isEmpty()) { 
                res.render('./user/edit_profile', { user: req.user, errors: errors.errors });
            } else {
                let password, avatar;
                req.body.password ? password = req.body.password : null;
                req.files[0] ? avatar = req.files[0].filename : null;
                req.body.delete_avatar ? avatar = `no_avatar.png` : null;
            
                let update_user = {
                    full_name: req.body.full_name,
                    username: req.body.username,
                    password: password != null ? encryptPassword(password) : req.user.password,
                    avatar: avatar != null ? `/img/user/avatar/${avatar}` : req.user.avatar
                };
    
                db.User.update(update_user, {where: {id: req.user.id}})
                .then(user => res.redirect('/user'))
                .catch(err => res.status(500).json({msg: err}));
            };
        } catch (err) {
            res.status(500).json({msg: err});
        };
    },
    destroy_session(req, res, next) {
        try {
            req.logOut();
            req.session.destroy();
            res.redirect('/user/login');
        } catch (err) {
            res.status(500).json({msg: err});
        };
    },
    delete_user(req, res, next) {
        try {
            db.User.destroy({ where: { id: req.user.id } })
            .then(() => {
                req.logOut();
                req.session.destroy();
                res.redirect('/user/login');
            })
            .catch(err => res.status(500).json({msg: err}));
        } catch (err) {
            res.status(500).json({msg: err});
        };
    },
};