const jwt = require('jsonwebtoken');

module.exports = function (authId, res) {
    const token = jwt.sign({ authId }, process.env.JWT_SECRET_KEY);
    res.status(200).cookie("token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
    }).json({ data: auth, message: "Verifikatsiya muvaffaqiyatli tugallandi" });
}