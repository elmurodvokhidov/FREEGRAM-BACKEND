const Auth = require("../models/authModel");
const Conversation = require("../models/conversation");

const getUsers = async (req, res) => {
    try {
        const loggedUser = req.auth;
        const { search } = req.query;

        // todo: Agar so'rovda query xossasi bo'ladigan bo'lsa, u holda foydalanuvchilarni search qilinayotganligi na'zarda tutiladi...
        if (search) {
            // todo: Regular expression yordamida so'rovni kichik xarflarga o'tkazish...
            const searchRegEx = new RegExp(search, "i");
            // todo: Login qilgan foydalanuvchidan tashqari barcha foydalanuvchini ismi yordamida qidirish...
            const foundUser = await Auth.find({ _id: { $ne: loggedUser }, fullname: searchRegEx, privacy: "everybody" });
            // todo: Return yordamida so'rov jo'natib keyingi qatorlarni ishlashini to'xtatish...
            return res.status(200).send(foundUser);
        }

        // todo: Xisobga kirgan foydalanuvchi barcha suhbatlarini aniqlash...
        const conversations = await Conversation.find({
            participants: loggedUser
        }).populate('participants', 'Auth');

        // todo: Topilgan barcha suhbatlar ichidan xisobga kirgan foydalanuvchidan tashqari barcha foydalanuvchilarni olish...
        const messagedUsers = [];
        conversations.forEach(conversation => {
            conversation.participants.forEach(participant => {
                if (participant._id.toString() !== loggedUser.toString()) messagedUsers.push(participant);
            });
        });

        // todo: Xosil bo'lgan to'plamda foydalanuvchilar id'lari bo'ladi, shuning uchun ham ma'lumotlar omboridan foydalanuvchilarning to'lliq obyektini olish zarur...
        const users = await Auth.find({ _id: { $in: messagedUsers } });

        // todo: Chaqiruvchiga bir-biri bilan xabar yozishgan barcha foydalanuvchilarni qaytarish...
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = {
    getUsers,
}