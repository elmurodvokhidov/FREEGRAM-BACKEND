const express = require('express');
const router = express.Router();
const {
    loginFunction,
    logoutFunction,
    // registerFunction,
    // verifyOTP,
    getCurrentAuth,
    // resetRegistration,
    updateAuth,
    updatePrivacy,
} = require('../controllers/authControllers');
const authentication = require('../middleware/authentication');

// router.post("/register", registerFunction);
// router.post("/reset", resetRegistration);
// router.post("/verify/:otp", verifyOTP);
router.post("/login", loginFunction);
router.get("/me", authentication, getCurrentAuth);
router.put("/privacy", authentication, updatePrivacy);
router.put("/:id", authentication, updateAuth);
router.post("/logout", logoutFunction);

module.exports = router;