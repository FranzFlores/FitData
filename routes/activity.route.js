'use strict'

const express = require('express');
const router = express.Router();

var activityController = require("../controllers/activity.controller");
var auth = require("../lib/auth");

router.post('/create/:idUser', auth.ensureAuth, activityController.createActivity);
router.get('/all/:idUser', auth.ensureAuth, activityController.getActivities);
router.get('/:id',auth.ensureAuth,activityController.getActivity);
router.put('/update/:id', auth.ensureAuth, activityController.updateActivity);

module.exports = router;
