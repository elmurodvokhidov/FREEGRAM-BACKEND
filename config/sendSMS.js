const OTP = require('../models/otpModel');
const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

module.exports = async function (number) {
    const expiresIn = Date.now() + 3600000;
    const code = Math.floor((Math.random() * 900000) + 100000);

    const message = await client.messages.create({
        from: '+19382531528',
        to: `+${number}`,
        body: `Freegram hisobingizga kirish uchun quyidagi tasdiqlash kodidan foydalaning: ${code}. Kodning amal qilish muddati 1 soat.`
    });

    await OTP.create({
        phoneNumber: number,
        code,
        expiresIn,
    });

    console.log(message.sid);
}