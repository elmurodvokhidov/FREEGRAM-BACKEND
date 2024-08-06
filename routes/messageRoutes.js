const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageControllers');
const authentication = require('../middleware/authentication');
const router = express.Router();

router.post('/:receiverId', authentication, sendMessage);
router.get("/:receiver", authentication, getMessages);

module.exports = router;