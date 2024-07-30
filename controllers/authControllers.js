const Auth = require("../models/authModel");
const sendSMS = require("../config/sendSMS");
const validateUser = require("../utils/validateUser");
const bcrypt = require('bcryptjs');
const OTP = require('../models/otpModel');
const generateToken = require("../utils/generateToken");

const registerFunction = async (req, res) => {
    try {
        const { fullname, phoneNumber, password } = req.body;

        const existingAuth = await Auth.findOne({ phoneNumber });
        if (existingAuth) return res.status(400).send("Ushbu telefon raqami avval foydalanilgan");

        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const hashedPassword = await bcrypt.hash(password, 15);
        const [firstName, lastName] = fullname.split(' ');
        const userAvatar = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;

        const newAuth = await Auth.create({
            fullname,
            phoneNumber: `998${phoneNumber}`,
            password: hashedPassword,
            avatar: userAvatar,
        });

        await sendSMS(newAuth.phoneNumber);
        res.status(200).json({ data: newAuth, message: "Xabar muvaffaqiyatli jo'natildi" });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

const verifyOTP = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const { otp } = req.params;
        const existingOTP = await OTP.findOne({ phoneNumber });
        if (!existingOTP) return res.status(404).send("Verifikatsiyadan o'tishda xatolik yoki allaqachon verifikatsiya qilib bo'lindi");
        if (existingOTP.expiresIn < Date.now()) {
            await OTP.deleteOne({ phoneNumber });
            await Auth.deleteOne({ phoneNumber });
            res.status(500).send("Afsuski amal qilish muddati tugadi, boshqatdan ro'yhatdan o'ting!");
        }
        else {
            const isValid = otp === existingOTP.code;
            if (!isValid) return res.status(500).send("Verifikatsiya ma'lumotlari yaroqsiz, iltimos qayta tekshirib ko'ring");
            const auth = await Auth.findOne({ phoneNumber });
            auth.verified = true;
            await OTP.deleteMany({ phoneNumber });
            generateToken(auth, res);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

const loginFunction = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;

        const auth = await Auth.findOne({ phoneNumber });
        if (!auth) return res.status(404).send("Foydalanuvchi topilmadi");

        const isMatch = await bcrypt.compare(password, auth.password);
        if (!isMatch) return res.status(400).send("Parol xato");

        generateToken(auth, res);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

const logoutFunction = async (req, res) => {
    try {
        res.status(200).cookie("token", "", { maxAge: 0 }).send("Muvaffaqiyatli xisobdan chiqildi");
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

module.exports = {
    registerFunction,
    verifyOTP,
    loginFunction,
    logoutFunction,
}