'use strict'

const Exercise = require('../models/exercise.model');
const Activity = require('../models/activity.model');


var ActivityController = {};

ActivityController.createActivity = (req, res) => {
    Exercise.findById(req.body.idExercise)
        .then(exercise => {
            if (exercise.muscle_group == 'Cardio') {
                new Activity({
                    idUser: req.params.idUser,
                    idExercise: req.body.idExercise,
                    duration: req.body.duration,
                    amount: req.body.amount,
                }).save()
                    .then(newActivity => {
                        if (!newActivity) {
                            res.status(404).send({ msg: 'No se pudo crear la actividad' });
                        } else {
                            res.status(200).json(newActivity);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send({ msg: 'Ocurrió un error al crear la actividad' });
                    });
            } else {
                new Activity({
                    idUser: req.params.idUser,
                    idExercise: req.body.idExercise,
                    sets: req.body.sets
                }).save()
                    .then(newActivity => {
                        if (!newActivity) {
                            res.status(404).send({ msg: 'No se pudo crear la actividad' });
                        } else {
                            res.status(200).send(newActivity);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send({ msg: 'Ocurrió un error al crear la actividad' });
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al crear la actividad' });
        });
};

ActivityController.getActivities = (req, res) => {
    Activity.find({ idUser: req.params.idUser, idExercise: req.body.idExercise })
        .then(activities => {
            res.status(200).send(activities);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al obtener las actividades' });
        })
};

ActivityController.getActivity = (req, res) => {
    Activity.findById(req.params.id)
        .then(result => {
            if (!result) {
                res.status(404).send({ msg: 'No se encontró la actividad' });
            } else {
                res.status(200).send(result);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al obtener la actividad' });
        })
};


ActivityController.updateActivity = (req, res) => {
    Exercise.findById(req.body.idExercise)
        .then(exercise => {
            if (exercise.muscle_group == 'Cardio') {
                let activityUpdate = {
                    duration: req.body.duration,
                    amount: req.body.amount,
                }
                Activity.findOneAndUpdate({ _id: req.params.id }, activityUpdate)
                    .then(result => {
                        if (!result) {
                            res.status(404).send({ msg: 'No se pudo actualizar la actividad' });
                        } else {
                            res.status(200).send(result);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send({ msg: 'Ocurrió un error al actualizar la actividad' });
                    });
            } else {
                let activityUpdate = {
                    sets: req.body.sets
                }
                Activity.findOneAndUpdate({ _id: req.params.id }, activityUpdate)
                    .then(result => {
                        if (!result) {
                            res.status(404).send({ msg: 'No se pudo actualizar la actividad' });
                        } else {
                            res.status(200).send(result);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send({ msg: 'Ocurrió un error al actualizar la actividad' });
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al actualizar la actividad' });
        });
};

module.exports = ActivityController;
