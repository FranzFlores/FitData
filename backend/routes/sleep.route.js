'use strict'

const express = require('express');
const router = express.Router();

var sleepController = require("../controllers/sleep.controller");
var auth = require("../lib/auth");

router.post('/create/:idUser', auth.ensureAuth, sleepController.createSleepRoutine);
router.get('/all/:idUser', auth.ensureAuth, sleepController.getSleepRoutines);
router.put('/update/:id', auth.ensureAuth, sleepController.updateSleepRoutines);

module.exports = router;
