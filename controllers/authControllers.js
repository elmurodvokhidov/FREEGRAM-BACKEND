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
            phoneNumber,
            password: hashedPassword,
            avatar: userAvatar,
        });

        await sendSMS(newAuth.phoneNumber);
        res.status(200).send(newAuth);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

const resetRegistration = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        await Promise.all([OTP.deleteMany({ phoneNumber }), Auth.deleteMany({ phoneNumber })]);
        res.status(200).send("Qayta ro'yhatdan o'tish mumkin");
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
        if (!existingOTP) return res.status(404).json({ type: "otp", message: "Allaqachon verifikatsiya qilib bo'lindi" });
        if (existingOTP.expiresIn < Date.now()) {
            await OTP.deleteOne({ phoneNumber });
            await Auth.deleteOne({ phoneNumber });
            res.status(500).json({ type: "otp", message: "Amal qilish muddati tugagan, qayta ro'yhatdan o'ting!" });
        }
        else {
            const isValid = otp === existingOTP.code;
            if (!isValid) return res.status(500).json({ type: "otp", message: "Kod xato, qayta tekshirib ko'ring" });
            const auth = await Auth.findOne({ phoneNumber });
            auth.verified = true;
            await auth.save();
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
        if (!auth) return res.status(404).json({ type: "phone", message: "Foydalanuvchi topilmadi" });

        if (!auth.verified) return res.status(400).json({ message: "Foydalanuvchi verifikatsiyadan o'tmagan" });

        const isMatch = await bcrypt.compare(password, auth.password);
        if (!isMatch) return res.status(400).json({ type: "password", message: "Parol xato" });

        generateToken(auth, res);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

const getCurrentAuth = async (req, res) => {
    try {
        const auth = await Auth.findById(req.auth);
        if (!auth) return res.status(404).send("Foydalanuvchi topilmadi");
        res.status(200).send(auth);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

const updateAuth = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullname, bio } = req.body;

        const updatedAuth = await Auth.findByIdAndUpdate(id, { fullname, bio }, { new: true });
        if (!updatedAuth) return res.status(404).send("Foydalanuvchi topilmadi");

        res.status(200).send(updatedAuth);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

const updatePrivacy = async (req, res) => {
    try {
        const { privacy } = req.body;

        const updatedUser = await Auth.findByIdAndUpdate(req.auth, { privacy }, { new: true });
        if (!updatedUser) return res.status(404).send('Foydalanuvchi topilmadi');

        res.status(200).json({ message: "Muvaffaqiyatli o'rnatildi.", data: updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).send('Serverda xatolik yuz berdi');
    }
};

const logoutFunction = async (req, res) => {
    try {
        res.cookie("token", "", { maxAge: 0 });
        res.status(200).send("Muvaffaqiyatli xisobdan chiqildi");
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
    getCurrentAuth,
    resetRegistration,
    updateAuth,
    updatePrivacy,
}