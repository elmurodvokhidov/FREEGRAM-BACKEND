const express = require('express');
const router = express.Router();
const {
    loginFunction,
    logoutFunction,
    registerFunction,
    verifyOTP,
    getCurrentAuth,
    resetRegistration
} = require('../controllers/authControllers');
const authentication = require('../middleware/authentication');

router.post("/register", registerFunction);
router.post("/reset", resetRegistration);
router.post("/verify/:otp", verifyOTP);
router.post("/login", loginFunction);
router.get("/me", authentication, getCurrentAuth);
router.post("/logout", logoutFunction);

module.exports = router;