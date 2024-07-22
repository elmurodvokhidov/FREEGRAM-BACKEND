const express = require('express');
const router = express.Router();
const {
    loginFunction,
    logoutFunction,
    registerFunction
} = require('../controllers/authControllers');

router.post("/register", registerFunction);
router.post("/login", loginFunction);
router.post("/logout", logoutFunction);

module.exports = router;