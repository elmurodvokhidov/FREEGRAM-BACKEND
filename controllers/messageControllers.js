const Message = require('../models/message');
const Conversation = require('../models/conversation');

const sendMessage = async (req, res) => {
    try {
        // todo: Xabar jo'natish uchun mo'ljallangan controller funksiyada quyidagicha ish bajariladi:
        const { message } = req.body;
        const { receiverId: receiver } = req.params;
        const sender = req.auth;

        // todo: Xabar matni, jo'natuvchi va qabul qiluvchi idlarini aniqlab olinadi
        let conversation = await Conversation.findOne({
            participants: { $all: [sender, receiver] }
        });

        // todo: Avval mavjud suhbat qidiriladi, agar yo'q bo'lsa yangisi hosil qilinadi
        if (!conversation) {
            conversation = new Conversation({
                participants: [sender, receiver],
            });
        }

        // todo: So'ng yangi xabar yaratiladi
        const newMessage = new Message({
            sender,
            receiver,
            message,
        });

        // todo: Hosil qilingan suhbatga yangi yaratilgan xabar idsi qo'shib qo'yiladi
        conversation.messages.push(newMessage._id);

        // todo: Barcha o'zgarishlar Database'ga saqlanadi
        await Promise.all([conversation.save(), newMessage.save()]);

        // todo: Eng so'nggida chaqiruvchiga yangi xabar qaytarib beriladi
        res.status(201).json(newMessage);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

module.exports = {
    sendMessage,
}