const registerFunction = async (req, res) => {
    res.send("register route");
};

const loginFunction = async (req, res) => {
    res.send("login route");
};

const logoutFunction = async (req, res) => {
    res.send("logout route");
};

module.exports = {
    registerFunction,
    loginFunction,
    logoutFunction,
}