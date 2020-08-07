let db = require('../../database/models');

const { encryptPassword } = require('../../lib/bcrypt');
const { validationResult } = require('express-validator');

module.exports = {
    users_get(req, res, next) {
        try {
            let start = req.query.start ? Number(req.query.start) : 0,
            rpp = req.query.rpp ? Number(req.query.rpp) : 10;
            
            db.User.findAndCountAll({
                attributes: ['id', 'full_name', 'username', 'avatar', 'created_at', 'updated_at'],
                limit: rpp,
                offset: start,
            })
            .then(result => {
                let next = null,
                previous = null,
                first = 'http://localhost:8080/api/v1/users?start=0&rpp=10';
                
                result.rows.length == rpp ? next = `http://localhost:8080/api/v1/users?start=${(rpp + start)}&rpp=${rpp}` : null;
                start > (rpp - 1) ? previous = `http://localhost:8080/api/v1/users?start=${(start - rpp)}` : previous;
                
                result.rows.forEach(user => {
                    user.setDataValue('detail', `http://localhost:8080/api/v1/users/${user.id}`);
                });
                
                result.rows.length == 0 ?
                users_list = 'Database limit exceeded.' :
                users_list = result.rows;
                
                let answer = {
                    meta: {
                        status: 200,
                        url: 'http://localhost:8080/api/v1/users',
                        count: result.count,
                        pagination: {
                            first,
                            previous,
                            next,
                        },
                    },
                    data: {
                        count: typeof users_list == 'object' ? users_list.length : null,
                        users: users_list,
                    },
                };
                
                res.status(200).json(answer);
            })
            .catch(err => res.status(400).json({
                status: 400,
                error: 'Bad Request.',
                message:'Server could not interpret the request due to invalid syntax.',
                err
            }));
        } catch (err) {
            res.status(500).json({
                status: 500,
                error: 'Internal Server Error.',
                message:'Server has encountered a situation that it does not know how to handle.',
                err
            });
        };
    },
    user_detail_get(req, res, next) {
        try {
            db.User.findByPk(req.params.id, {
                attributes: ['id', 'full_name', 'username', 'avatar', 'created_at', 'updated_at'],
            })
            .then(user => {
                let answer = {
                    meta: {
                        status: 200,
                        url: `http://localhost:8080/api/v1/users/${user.id}`,
                        url_users: `http://localhost:8080/api/v1/users`,
                        count: 1
                    },
                    data: user,
                };
                
                res.status(200).json(answer);
            })
            .catch(err => {
                res.status(404).json({
                    status: 404,
                    error: 'Not Found.',
                    message: 'Server could not find the requested content. User out of range or not found.',
                    err
                });
            });
        } catch (err) {
            res.status(400).json({
                status: 400,
                error: 'Bad Request.',
                message: 'Server could not interpret the request due to invalid syntax.',
                err
            });
        };
    },
    user_create_post(req, res, next) {
        try {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(406).json({
                    status: 406,
                    error: 'Not Acceptable.',
                    message: 'Server cannot produce a response matching the list of acceptable values.',
                    errors: errors.errors
                });
            } else {
                let { full_name, username, password } = req.body,
                
                newUser = {
                    full_name,
                    username,
                    password: encryptPassword(password),
                };
                
                db.User.create(newUser)
                .then(user => {
                    res.status(201).json({
                        status: 201,
                        message: 'The request was successful and led to the creation of a resource.',
                        user: {
                            full_name: user.full_name,
                            username: user.username
                        },
                    });
                })
                .catch(err => {
                    res.status(409).json({
                        status: 409,
                        error: 'Conflict.',
                        message: 'Request conflict with current state of the server.',
                        err: err.original.sqlMessage
                    });
                });
            };
        } catch (err) {
            res.status(400).json({
                status: 400,
                error: 'Bad Request.',
                message: 'Server could not interpret the request due to invalid syntax.',
                err
            });
        };
    },
    user_updated_patch(req, res, next) {
        try {
            let errors = validationResult(req);
            if(!errors.isEmpty()) {
                res.status(406).json({
                    status: 406,
                    error: 'Not Acceptable.',
                    message: 'Server cannot produce a response matching the list of acceptable values.',
                    errors: errors.errors
                });
            } else {
                db.User.findByPk(req.params.id)
                .then(user => {
                    if(user) {
                        let full_name, username, password;
                        req.body.full_name ? full_name = req.body.full_name : user.full_name;
                        req.body.username ? username = req.body.username : user.username;
                        req.body.password ? password = encryptPassword(req.body.password) : user.password;
                        
                        let update_user = {
                            full_name,
                            username,
                            password
                        };
                        
                        db.User.update(update_user, {where: {id: req.params.id}})
                        .then(result => res.status(200).json({
                            status: 200,
                            message: 'The request was successful and led to the update of a resource.',
                        }))
                        .catch(err => res.status(500).json({msg: err}));
                    } else {
                        res.status(404).json({
                            status: 404,
                            error: 'Not Found.',
                            message: 'Server could not find the requested content. User out of range or not found.',
                        });
                    };
                })
                .catch(err => {
                    res.status(400).json({
                        status: 400,
                        error: 'Bad Request.',
                        message: 'Server could not interpret the request due to invalid syntax.',
                        err
                    });
                });
            };
        } catch (err) {
            res.status(500).json({
                status: 500,
                error: 'Internal Server Error.',
                message:'Server has encountered a situation that it does not know how to handle.',
                err
            });
        };
    },
    user_delete(req, res, next) {
        try {
            db.User.findByPk(req.params.id)
            .then(user => {
                if(user) {
                    db.User.destroy({where: {id: req.params.id}})
                    .then(result => {
                        res.status(200).json({
                            status: 200,
                            message: 'The request was successful and led to the delete of a resource.',
                        });
                    })
                    .catch(err => {
                        res.status(400).json({
                            status: 400,
                            error: 'Bad Request.',
                            message: 'Server could not interpret the request due to invalid syntax.',
                            err
                        });
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        error: 'Not Found.',
                        message: 'Server could not find the requested content. User out of range or not found.',
                    });
                };
            })
            .catch(err => {
                res.status(400).json({
                    status: 400,
                    error: 'Bad Request.',
                    message: 'Server could not interpret the request due to invalid syntax.',
                    err
                });
            });
        } catch (err) {
            res.status(500).json({
                status: 500,
                error: 'Internal Server Error.',
                message:'Server has encountered a situation that it does not know how to handle.',
                err
            });
        };
    },
};