'use strict'
const bcrypt = require('bcrypt');
const helpers = {};

helpers.SECRET_KEY = "FitData";

//Codificar contraseña
helpers.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10),null);
}

//Decodificar contraseña
helpers.matchPassword = (userPassword, password) => {
    return bcrypt.compareSync(userPassword,password);
}

module.exports = helpers;
