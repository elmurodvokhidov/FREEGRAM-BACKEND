const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/userController');
const authentication = require('../middleware/authentication');

router.get("/", authentication, getAllUsers);

module.exports = router;