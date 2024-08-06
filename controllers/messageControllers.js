const Message = require('../models/message');
const Conversation = require('../models/conversation');

const sendMessage = async (req, res) => {
    try {
        // todo: Xabar jo'natish uchun mo'ljallangan controller funksiyada quyidagicha ish bajariladi:
        // todo: Xabar matni, jo'natuvchi va qabul qiluvchi idlarini aniqlab olinadi
        const { message } = req.body;
        const { receiverId: receiver } = req.params;
        const sender = req.auth;

        // todo: Avval mavjud suhbat qidiriladi, agar yo'q bo'lsa yangisi hosil qilinadi
        let conversation = await Conversation.findOne({
            participants: { $all: [sender, receiver] }
        });
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

const getMessages = async (req, res) => {
    try {
        // todo: Xabar jo'natuvchi hamda xabarni qabul qiluvchi id'larini aniqlab olish
        const { receiver } = req.params;
        const sender = req.auth;

        // todo: Ular asosida xabarlarni suhbatlar modelidan izlab topish
        // todo: Izlab topilgan xabarlarni populate qilish
        const conversation = await Conversation.findOne({
            participants: { $all: [sender, receiver] }
        }).populate([{
            path: "messages",
            model: "Message",
            populate: [
                { path: "sender", model: "Auth" },
                { path: "receiver", model: "Auth" }
            ]
        }]);
        if (!conversation) return res.status(200).send([]);

        // todo: Yakunda chaqiruvchiga topilgan xabarlarni qaytarish
        res.status(200).send(conversation.messages);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

module.exports = {
    sendMessage,
    getMessages,
}