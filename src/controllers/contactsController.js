let db = require('../database/models');

module.exports = {
    list(req, res, next) {
        try {
            db.Contact.findAll({ where: { user_id: req.user.id } })
            .then(contacts => {
                res.render('./contact/list', {contacts});
            })
            .catch(err =>{
                res.status(404).json(err);
            })
        } catch (err) {
            res.status(500).json({msg: err});
        };
    },
    create_get(req, res, next) {
        try {
            res.render('./contact/create');
        } catch (err) {
            res.status(500).json({msg: err});
        };
    },
    create_post(req, res, next) {
        try {
            let avatar;
            req.files[0] ? avatar = `img/contacts/avatar/${req.files[0].filename}` : null;

            db.Contact.create({
                user_id: req.user.id,
                full_name: req.body.full_name,
                number: req.body.number,
                avatar
            })
            .then(contact => {
                res.status(200).redirect('/contacts');
            })
            .catch(err => res.status(400).json(err));
        } catch (err) {
            res.status(500).json({msg: err});
        };
    },
    detail(req, res, next) {
        try {
            db.Contact.findOne({ where: { id: req.params.id, user_id: req.user.id } })
            .then(contact => {
                res.render('./contact/detail', {contact});
            })
            .catch(err => {
                res.status(404).json(err);
            });
        } catch (err) {
            res.status(500).json({msg: err});
        };
    },
    update_get(req, res, next) {
        try {
            db.Contact.findOne({where: {id: req.params.id, user_id: req.user.id}})
            .then(contact => {
                if(contact) {
                    res.render('./contact/update', {contact});
                } else {
                    res.redirect('/contacts');
                };
            })
            .catch(err => {
                res.status(404).json(err);
            });
        } catch (err) {
            res.status(500).json({msg: err});
        };
    },
    update_patch(req, res, next) {
        try {
            db.Contact.findOne({where: {id: req.params.id, user_id: req.user.id}})
            .then(contact => {
                if(contact) {
                    let avatar;
                    req.files[0] ? avatar = req.files[0].filename : null;
                    req.body.delete_avatar ? avatar = `no_avatar.png` : null;
                    let updated_contact = {
                        full_name: req.body.full_name,
                        number: req.body.number,
                        avatar: avatar != null ? `/img/contacts/avatar/${avatar}` : contact.avatar
                    };
            
                    db.Contact.update(updated_contact, { where: { id: req.params.id, user_id: req.user.id } })
                    .then(contact => {
                        res.status(200).redirect(`/contacts/${req.params.id}`);
                    })
                    .catch(err => {
                        res.status(400).json(err);
                    });
                } else {
                    res.status(404).redirect('/contacts');
                };
            })
            .catch(err => {
                res.status(400).redirect('/contacts');
            });
        } catch (err) {
            res.status(500).json({msg: err});
        };
    },
    delete_contact(req, res, next) {
        try {
            db.Contact.destroy({where: {id: req.params.id, user_id: req.user.id}})
            .then(contact => {
                res.status(200).redirect('/contacts');
            })
            .catch(err => {
                res.status(404).json(err);
            });
        } catch (err) {
            res.status(500).json({msg: err});
        };
    },
};