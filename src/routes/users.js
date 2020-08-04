const router = require('express').Router();
let db = require('../database/models');

const { encryptPassword, checkPassword } = require('../lib/bcrypt');

// PROFILE
router.get('/', (req, res, next) => {
    try {
        db.User.findByPk(req.session.logged_in.id)
        .then(user => res.render('./user/profile', {user}))
        .catch(err => res.status(500).json({msg: err}));
        // .then(user => res.status(200).json({profile: user}))
        // .catch(err => res.status(500).json({msg: err}));
    } catch (err) {
        res.redirect('/users/login');
        // res.status(404).json({msg: 'No logged_in user found.', login: `http://localhost:3030/users/login`});
    };
});

// REGISTER
router.get('/register', (req, res, next) => res.render('./user/register'));

router.post('/register', (req, res, next) => {
    let { full_name, username, password } = req.body;
    let newUser = {
        full_name,
        username,
        password: encryptPassword(password)
    };

    db.User.create(newUser)
    .then( user => {
        req.session.logged_in = user;
        // res.status(200).json({msg: 'Successfully created', user: user});
        res.status(200).redirect('/users');
    })
    .catch(err => res.status(500).json({msg: err}));
});

// LOGIN
router.get('/login', (req, res, next) => res.render('./user/login'));

router.post('/login', (req, res, next) => {
    let { username, password } = req.body;
    let logging_user = {
        username,
        password
    };

    db.User.findOne({where: {username: logging_user.username}})
    .then(user => {
        try {
            if(checkPassword(logging_user.password, user.password)) {
                req.session.logged_in = user;
                res.redirect('/users');
                // res.status(200).json({msg: 'Successfully Logged In'});
            } else {
                res.status(404).json({msg: 'Missed credentials.'});
            };
        } catch(err) {
            res.status(404).json({msg: 'User not found.'});
        };
    })
    .catch(err => res.status(500).json({msg: err}));
});

module.exports = router;