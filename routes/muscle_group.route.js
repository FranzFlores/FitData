'use strict'

const express = require('express');
const router = express.Router();

var muscleGroupController = require('../controllers/muscle_group.controller');
var auth = require("../lib/auth");

router.get('/all', auth.ensureAuth, muscleGroupController.getMuscleGroups);

module.exports = router;