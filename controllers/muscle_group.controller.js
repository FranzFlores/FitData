'use strict'

const MuscleGroup = require('../models/muscle_group.model');

var MuscleGroupController = {};

MuscleGroupController.getMuscleGroups = (req, res) => {
    MuscleGroup.find({})
        .then(muscleGroups => {
            res.status(200).send(muscleGroups);
        }).catch(err => {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al obtener los grupos musculares' });
        });
};

module.exports = MuscleGroupController;