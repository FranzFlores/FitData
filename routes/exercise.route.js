'use strict'

const express = require('express');
const multipart = require('connect-multiparty');

const router = express.Router();
const md_upload = multipart({ uploadDir: './uploads/exercises' });

var exerciseController = require("../controllers/exercise.controller");
var auth = require("../lib/auth");

router.post('/create', [auth.ensureAuth, md_upload], exerciseController.createExercise);
router.get('/all', auth.ensureAuth, exerciseController.getExercises);
router.get('/:id', auth.ensureAuth, exerciseController.getExercise);
router.put('/update/:id', auth.ensureAuth, exerciseController.updateExercise);
router.put('/updateStatus/:id', auth.ensureAuth, exerciseController.updateStatusExercise);
router.put('/uploadImage/:id', [auth.ensureAuth, md_upload], exerciseController.uploadMultimedia);
router.get('/getImage/:multimediaFile', exerciseController.getMultimediaFile);

module.exports = router;

