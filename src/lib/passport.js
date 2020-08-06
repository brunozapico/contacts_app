const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { checkPassword } = require('../lib/bcrypt');
const { validationResult } = require('express-validator');
let db = require('../database/models');

const { encryptPassword } = require('../lib/bcrypt');

passport.use('local.signin', new LocalStrategy({
    passReqToCallback: true
}, (req, username, password, done) => {
        db.User.findOne({where: {username: username}})
        .then(user => {
            if(!user) {
                done(null, false, req.flash('err', 'Incorrect username.'));
            };

            if(!checkPassword(password, user.password)) {
                done(null, false, req.flash('err', 'Incorrect password.'));
            };

            done(null, user);
        })
        .catch(err => {
            console.log(`Error: ${err}`);
            done(null, false, req.flash('err', 'Something went wrong with your SignIn.'));
        });
    },
));

passport.use('local.signup', new LocalStrategy({
    passReqToCallback: true
}, (req, username, password, done) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return done(null , false, req.flash('validations', errors.errors));
    };

    db.User.findOne({where: {username: username}})
    .then(user => {
        if(user) {
            return done(null , false, req.flash('err', 'That user already exists.'))
        };

        let full_name = req.body.full_name;

        let avatar;
        req.files[0] ? avatar = `img/user/avatar/${req.files[0].filename}` : null;
    
        let newUser = {
            full_name,
            username,
            password: encryptPassword(password),
            avatar
        };
    
        db.User.create(newUser)
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            console.log(`Error: ${err}`);
            return done(null, false, req.flash('err', 'Something went wrong with your SignUp.'));
        });
    })
    .catch(err => {
        console.log(`Error: ${err}`);
        return done(null, false, req.flash('err', 'Something went wrong with your SignUp.'));
    });
}));

passport.serializeUser((user, done) => {
    return done(null, user);
});

passport.deserializeUser((user, done) => {
    db.User.findByPk(user.id)
    .then((user) => {
        if(user) {
            return done(null, user)
        } else {
            return done({err: 'Error while deserializing user.'}, null);
        };
    });
});

module.exports = passport;