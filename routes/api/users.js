const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');

// POST request to: /api/users
router.post('/', usersCtrl.create);

//export our router
module.exports = router;