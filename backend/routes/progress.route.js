'use strict'

const express = require('express');
const multipart = require('connect-multiparty');

const router = express.Router();
const md_upload = multipart({ uploadDir: './backend/uploads/progress' });

var progressController = require("../controllers/progress.controller");
var auth = require("../lib/auth");

router.post('/create/:idUser', auth.ensureAuth, progressController.createProgress);
router.get('/all/:idUser', auth.ensureAuth, progressController.getProgressRegisters);
router.get('/:id', auth.ensureAuth, progressController.getProgressRegister);
router.put('/update/:id', auth.ensureAuth, progressController.updateProgressRegister);
router.put('/uploadImages/:id', [auth.ensureAuth, md_upload], auth.ensureAuth, progressController.uploadImages);
router.get('/getImage/:imageFile',progressController.getImagesProgress);


module.exports = router;
