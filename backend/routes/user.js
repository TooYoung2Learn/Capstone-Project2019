const express = require('express');
const router = express.Router();

const db = require('../model');


//const userCtrl = require('../controllers/user');

//router.post('/signup', userCtrl.signup);
//router.post('/login', userCtrl.login);




router.post('/signup', db.signup);
router.get('/', db.getUsers);

//router.get('/:id', db.getUserById);

//router.delete('/:id', db.deleteUser);



module.exports = router;