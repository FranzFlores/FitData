'use strict'

const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const helpers = require('../lib/helpers');
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

UserController.getUsers = (req, res) => {
    User.find({})
        .then((users) => {
            res.status(200).send(users);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ msg: 'Error al devolver usuarios' });
        });
}

UserController.getUser = (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            res.status(200).send(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ msg: 'Error al devolver usuario' });
        });
}

UserController.updateUser = (req, res) => {
    var userUpdate = {
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email
    }

    User.findOneAndUpdate({ _id: req.params.id }, userUpdate)
        .then(result => {
            if (!result) {
                res.status(404).send({ msg: 'Ocurrio un error al actualizar la informacion del usuario' });
            } else {
                res.status(200).send({ msg: 'Se ha actualizado la información del usuario con éxito' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ msg: 'Error al actualizar el usuario' });
        });
}

UserController.updatePassword = (req, res) => {
    User.findById(req.params.id)
        .then(account => {
            if (helpers.matchPassword(req.body.oldPassword, account.password)) {
                var hash = helpers.generateHash(req.body.newPassword);
                var update = {};
                update.password = hash;
                User.findByIdAndUpdate(req.params.id, update, (err, account) => {
                    if (err) res.status(500).send({ message: "Error en la peticion" });
                    else {
                        if (!account) res.status(404).send({ message: "No se actualizo la cuenta" });
                        else res.status(200).send({ msg: 'Se ha actulizado la contraseña con éxito' });
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ msg: 'Error al actualizar el usuario' });
        });
};

UserController.updateStatusUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, { status: req.body.status })
        .then(user => {
            if (!user) {
                res.status(404).send({ msg: "Ocurrió un error al eliminar la cuenta" });
            } else {
                if (user.status == false) {
                    res.status(200).send({ msg: 'Se elimino el usuario con éxito' });
                } else {
                    res.status(200).send({ msg: 'Se restauró el usuario con éxito' });
                }
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ msg: 'Error al actualizar el usuario' });
        });
};


UserController.uploadImageUser = (req, res) => {
    if (req.files) {
        let filePath = req.files.image.path;
        let fileSplit = filePath.split('\\');
        let fileName = fileSplit[fileSplit.length - 1];
        let extSplit = fileName.split('\.');
        var fileExt = extSplit[1];

        if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpge' || fileExt == 'JPG') {
            User.updateOne({ _id: req.params.id }, { image: fileName })
                .then(projectUpdate => {
                    if (!projectUpdate) {
                        res.status(404).send({ msg: 'No se ha podido subir la imagen' });
                    } else {
                        res.status(200).json(projectUpdate);
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send({ msg: 'Error al subir imagen' });
                });
        } else {
            //Elimina el archivo subido en caso de ser inválido
            fs.unlink(filePath, (err) => {
                console.log(err);
                return res.status(200).send({ msg: 'La extensión no es válida' });
            });
        }
    }
};

UserController.getImageUser = (req, res) => {
    var path_file = './backend/uploads/users/' + req.params.imageFile;
    fs.stat(path_file, (error) => {
        if (!error) {
            return res.sendFile(path.resolve(path_file));
        } else {
            return res.status(204).send({
                msg: 'No existe la imagen'
            })
        }
    });
};

module.exports = UserController;
