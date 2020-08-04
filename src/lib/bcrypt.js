const bcrypt = require('bcrypt');

encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
};

checkPassword = (password, realPassword) => {
    let check = bcrypt.compareSync(password, realPassword);

    return check;
};

module.exports = { encryptPassword, checkPassword }