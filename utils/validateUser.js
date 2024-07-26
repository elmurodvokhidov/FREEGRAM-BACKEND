const Joi = require("joi");

module.exports = (auth) => {
    const schema = Joi.object({
        fullname: Joi.string().required().min(3).max(30),
        phoneNumber: Joi.number().required(),
        password: Joi.string(),
        // avatar: Joi.string(),
        // verified: Joi.boolean(),
    });

    return schema.validate(auth);
};