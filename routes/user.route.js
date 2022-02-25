'use strict'

const express = require('express');
const multipart = require('connect-multiparty');

const router = express.Router();
const md_upload = multipart({ uploadDir: './backend/uploads/users' });

var userController = require("../controllers/user.controller");
var auth = require("../lib/auth");

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/users', auth.ensureAuth, userController.getUsers);
router.get('/:id',auth.ensureAuth, userController.getUser);
router.put('/update/:id', auth.ensureAuth, userController.updateUser);
router.put('/updatePassword/:id', auth.ensureAuth, userController.updatePassword);
router.put('/updateStatus/:id', auth.ensureAuth, userController.updateStatusUser);
router.put('/uploadImage/:id',[auth.ensureAuth,md_upload], userController.uploadImageUser);
router.get('/getImage/:imageFile', userController.getImageUser);

module.exports = router;

