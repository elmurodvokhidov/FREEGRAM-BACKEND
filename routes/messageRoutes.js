const express = require('express');
const { sendMessage } = require('../controllers/messageControllers');
const authentication = require('../middleware/authentication');
const router = express.Router();

router.post('/:receiverId', authentication, sendMessage);

module.exports = router;