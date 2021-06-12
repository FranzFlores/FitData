'use strict'

const express = require('express');
const router = express.Router();

var userController = require("../controllers/user.controller");
var auth = require("../lib/auth");

router.post('/signup', userController.signup);
router.post('/signin',userController.signin);
router.get('/users',auth.ensureAuth,userController.getUsers);


module.exports = router;

