'use strict'

const Sleep = require('../models/sleep.model');
var SleepController = {};

SleepController.createSleepRoutine = (req, res) => {
    new Sleep({
        idUser: req.params.idUser,
        hours: req.body.hours,
        date: new Date()
    }).save()
        .then(newSleepRoutine => {
            if (!newSleepRoutine) {
                res.status(404).send({ msg: 'No se puedo crear la rutina de sueño' });
            } else {
                res.status(200).json(newSleepRoutine);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al crear la rutina de sueño' });
        });
}

SleepController.getSleepRoutines = (req, res) => {
    Sleep.find({ idUser: req.params.idUser })
        .then(sleepRoutines => {
            res.status(200).send(sleepRoutines);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al obtener las rutinas de sueño' });
        });
}

SleepController.updateSleepRoutines = (req,res) => {
    let sleepRoutineUpdate = {
        hours: req.body.hours
    }
    Sleep.findOneAndUpdate({_id: req.params.id},sleepRoutineUpdate)
        .then(result=>{
            if(!result) {
                res.status(404).send({ msg: 'No se puedo actualizar la rutina de sueño' });
            }else {
                res.status(200).send(result);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al actualizar la rutina de sueño' });
        });
}

module.exports = SleepController;
