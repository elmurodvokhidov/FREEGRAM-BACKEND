const { io, checkUserIsActive } = require("../config/socket");
const Auth = require("../models/authModel");
const Conversation = require("../models/conversation");
const Message = require("../models/message");

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

const deleteUser = async (req, res) => {
    try {
        const { receiverId } = req.params;
        const senderId = req.auth;

        // Faqatgina ikki kishi o'rtasidagi xabarlarni o'chirish
        await Message.deleteMany({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
            ]
        });

        // Faqatgina ikki kishi o'rtasidagi suhbatlarni o'chirish
        await Conversation.deleteMany({
            participants: { $all: [senderId, receiverId], $size: 2 }
        });

        const activeUserSocketIdReceiver = checkUserIsActive(receiverId);
        if (activeUserSocketIdReceiver) {
            io.to(activeUserSocketIdReceiver).emit("conversationDeleted", senderId);
        }

        res.status(200).send("Muvaffaqiyatli o'chirildi.");
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = {
    getUsers,
    deleteUser,
}