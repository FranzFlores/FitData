'use strict'

const fs = require('fs');
const path = require('path');
const helpers = require('../lib/helpers');
const Exercise = require('../models/exercise.model');

var ExerciseController = {};

ExerciseController.createExercise = (req, res) => {
    const body = JSON.parse(req.body.exercise);
    Exercise.find({ name: body.name })
        .then(results => {
            if (results.length > 0) {
                res.status(200).send({ msg: 'El ejercicio ya está registrado' });
            } else {
                let file = (req.files) ? helpers.getImagePath(req.files.multimedia) : 'default.png';

                new Exercise({ ...body, multimedia: file })
                    .save()
                    .then(newExercise => {
                        if (!newExercise) {
                            res.status(404).send({ msg: 'No se pudo crear el ejercicio' });
                        } else {
                            res.status(200).json(newExercise);

                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send({ msg: 'Ocurrió un error al crear el ejercicio' });
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al crear el ejercicio' });
        });
};

ExerciseController.getExercises = (req, res) => {
    Exercise.find({ status: true })
        .then(exercises => {
            res.status(200).send(exercises);
        }).catch(err => {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al consultar el ejercicio' });
        });
};

ExerciseController.getExercise = (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            if (!exercise) {
                res.status(404).send({ msg: 'No se pudo consultar el ejercicio' });
            } else {
                res.status(200).json(exercise);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al consultar el ejercicio' });
        });
};

ExerciseController.updateExercise = (req, res) => {
    const body = JSON.parse(req.body.exercise);
    let exerciseUpdate = {
        name: body.name,
        description: body.description,
        muscle_group: body.muscle_group,
        url: body.url
    }

    Exercise.findOneAndUpdate({ _id: req.params.id }, exerciseUpdate)
        .then(result => {
            if (!result) {
                res.status(404).send({ msg: 'No se pudo actualizar la informacion del ejercicio' });
            } else {
                res.status(200).send({ msg: 'Se ha actualizado la información del ejercicio con éxito' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al actualizar el ejercicio' });
        });
}



ExerciseController.updateStatusExercise = (req, res) => {
    Exercise.findOneAndUpdate({ _id: req.params.id }, { status: req.body.status })
        .then(exercise => {
            if (!exercise) {
                res.status(404).send({ msg: "Ocurrió un error al realizar la acción" });
            } else {
                if (exercise.status == false) {
                    res.status(200).send({ msg: 'Se elimino el ejercicio con éxito' });
                } else {
                    res.status(200).send({ msg: 'Se restauró el ejercicio con éxito' });
                }
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ msg: 'Error al actualizar el ejercicio' });
        });
};

ExerciseController.uploadMultimedia = (req, res) => {
    if (req.files) {
        let filePath = req.files.multimedia.path;
        let fileSplit = filePath.split('\/');
        let fileName = fileSplit[fileSplit.length - 1];
        let extSplit = fileName.split('\.');
        var fileExt = extSplit[1];

        if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpge' || fileExt == 'JPG' ||
            fileExt == 'mp4') {
            Exercise.updateOne({ _id: req.params.id }, { multimedia: fileName })
                .then(exerciseUpdate => {
                    if (!exerciseUpdate) {
                        res.status(404).send({ msg: 'No se ha podido subir el archivo multimedia' });
                    } else {
                        res.status(200).send({ msg: 'Se ha subido el archivo multimedia correctamente' });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send({ msg: 'Error al subir el archivo multimedia' });
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

ExerciseController.getMultimediaFile = (req, res) => {
    var path_file = './uploads/exercises/' + req.params.multimediaFile;
    fs.stat(path_file, (error) => {
        if (!error) {
            return res.sendFile(path.resolve(path_file));
        } else {
            return res.status(204).send({
                msg: 'No existe el archivo multimedia'
            })
        }
    });
};

module.exports = ExerciseController;
