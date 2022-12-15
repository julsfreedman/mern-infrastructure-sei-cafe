const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');

// POST request to: /api/users
router.post('/', usersCtrl.create);

// POST /api/users/login
router.post("/login", usersCtrl.login)

//export our router
module.exports = router;