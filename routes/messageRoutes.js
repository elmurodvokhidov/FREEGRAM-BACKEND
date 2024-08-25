const express = require('express');
const { sendMessage, getMessages, deleteMessage } = require('../controllers/messageControllers');
const authentication = require('../middleware/authentication');
const router = express.Router();

router.post("/:receiverId", authentication, sendMessage);
router.get("/:receiver", authentication, getMessages);
router.delete("/:messageId", authentication, deleteMessage);

module.exports = router;