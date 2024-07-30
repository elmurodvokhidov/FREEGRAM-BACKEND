const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const token = await req.cookies.token;
        if (!token) return res.status(401).send("Token mavjud emas");

        const { auth } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.auth = auth;

        next();
    } catch (error) {
        res.status(403).send("Yaroqsiz token");
    }
}