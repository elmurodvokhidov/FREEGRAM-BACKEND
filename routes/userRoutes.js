const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');
const authentication = require('../middleware/authentication');

router.get("/", authentication, getUsers);

module.exports = router;