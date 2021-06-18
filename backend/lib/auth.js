'use strict'
const jwt = require('jsonwebtoken');

const helpers = require('./helpers');

exports.ensureAuth = (req,res,next) =>{

    if(!req.headers.authorization) {
        return res.status(403).send({msg:'La petición no tiene cabecera de autenticación'});
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, helpers.SECRET_KEY);
    } catch (error) {
        console.log(error);
        return res.status(404).send("Token no válido");
    }

    req.user = payload;
    next();
};
