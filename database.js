'use strict'

const mongoose = require('mongoose');

const User = require('./models/user.model');
const helpers = require('./lib/helpers');
const Muscle_Group = require('./models/muscle_group.model');

const URI = "mongodb://localhost/FitData";

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(db => {
        console.log('Data Base Connect!!');

        //Crear usuario por defecto
        User.find({}).then(users => {
            if (users.length == 0) {
                new User({
                    name: "admin",
                    lastName: "admin",
                    email: 'admin@gmail.com',
                    password: helpers.generateHash('admin_pass'),
                    role: 'Administrador',
                    height: 170,
                    image: 'null'
                }).save()
                    .then((newUser) => {
                        if (!newUser) {
                            console.log('Error al crear el usuario por defecto');
                        } else {
                            console.log('¡Administrador Creado!');
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
            }
        }).catch((err) => {
            console.log(err);
        });

        //Crear Grupos Musculares Por defecto
        Muscle_Group.find({})
            .then((muscle_groups) => {
                if (muscle_groups.length == 0) {
                    Muscle_Group.insertMany([
                        {
                            name: 'Pectorales',
                        },
                        {
                            name: 'Hombros',
                        },
                        {
                            name: 'Trapecio',
                        },
                        {
                            name: 'Bíceps',
                        },
                        {
                            name: 'Tríceps',
                        },
                        {
                            name: 'Antebrazos',
                        },
                        {
                            name: 'Espalda',
                        },
                        {
                            name: 'Abdomen',
                        },
                        {
                            name: 'Cuádriceps',
                        },
                        {
                            name: 'Glúteo',
                        },
                        {
                            name: 'Femoral',
                        },
                        {
                            name: 'Abductores',
                        },
                        {
                            name: 'Pantorrilla',
                        },
                        {
                            name: 'Gemelos',
                        }
                    ]).then(new_muscle_groups => {
                        if (!new_muscle_groups) {
                            console.log('Error al crear los grupos de ejercicios por defecto');
                        } else {
                            console.log('¡Grupos de ejercicios creados!');
                        }
                    }).catch((err) => {
                        console.log(err);
                    });

                }
            }).catch((err) => {
                console.log(err);
            });
    }).catch(err => {
        console.log(err);
    });

module.exports = mongoose;
