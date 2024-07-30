const jwt = require('jsonwebtoken');

module.exports = function (auth, res) {
    const token = jwt.sign({ auth: auth._id }, process.env.JWT_SECRET_KEY);
    res.status(200).cookie("token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
    }).json({ data: auth });
}