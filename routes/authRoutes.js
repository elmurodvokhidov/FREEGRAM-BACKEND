const express = require('express');
const router = express.Router();
const {
    loginFunction,
    logoutFunction,
    registerFunction,
    verifyOTP
} = require('../controllers/authControllers');

router.post("/register", registerFunction);
router.post("/verify/:otp", verifyOTP);
router.post("/login", loginFunction);
router.post("/logout", logoutFunction);

module.exports = router;