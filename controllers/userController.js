const Auth = require("../models/authModel");

const getAllUsers = async (req, res) => {
    try {
        const loggedUser = req.auth;
        const users = await Auth.find({ _id: { $ne: loggedUser } });
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = {
    getAllUsers,
}