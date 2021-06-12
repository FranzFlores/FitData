'use strict'

const User = require('../models/user.model');
const helpers = require('../lib/helpers');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'FitData';
var UserController = {};

UserController.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((userResult) => {
            if (userResult) {
                res.status(200).send({ msg: 'Existe' });
            } else {
                console.log(req.body);
                new User({
                    name: req.body.name,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: helpers.generateHash(req.body.password),
                    role: 'Administrador',
                    height: req.body.height,
                    image: 'null'
                }).save().then((newUser) => {
                    if (!newUser) {
                        res.status(200).send({ msg: 'No se ha registrado el usuario' });
                    } else {
                        res.status(200).send({ user: newUser });
                    }
                }).catch(err => {
                    console.log('Error' + err);
                    res.status(500).send({ msg: 'Error al registrar usuario' });
                });
            }
        }).catch(err => {
            console.log('Error' + err);
            res.status(500).send({ msg: 'Error al registrar usuario' });
        });
};

UserController.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((userResult) => {
            if (!userResult) res.status(401).send({ msg: 'El usuario no está registrado' });
            if (helpers.matchPassword(req.body.password, userResult.password)) {
                const token = jwt.sign({ _id: userResult._id }, helpers.SECRET_KEY);
                res.status(200).json({ token });
            } else {
                res.status(401).send({ msg: 'Clave Incorrecta' });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ msg: 'Error al iniciar sesión' });
        });
}

UserController.getUsers = (req,res) => {
    User.find({})
        .then((users)=>{
            res.status(200).send(users);
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).send({ msg: 'Error al devolver usuarios' });
        })
}

module.exports = UserController;
