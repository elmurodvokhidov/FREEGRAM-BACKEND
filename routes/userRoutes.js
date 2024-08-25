const express = require('express');
const router = express.Router();
const { getUsers, deleteUser } = require('../controllers/userController');
const authentication = require('../middleware/authentication');

router.get("/", authentication, getUsers);
router.delete("/:receiverId", authentication, deleteUser);

module.exports = router;