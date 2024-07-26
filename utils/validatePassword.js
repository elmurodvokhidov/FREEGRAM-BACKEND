const passwordComplexity = require("joi-password-complexity");

module.exports = (password) => {
    const schema = {
        min: 8,
        max: 30,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 2,
    };

    return passwordComplexity(schema).validate(password);
};