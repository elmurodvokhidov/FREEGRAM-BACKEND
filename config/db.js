const mongoose = require('mongoose');
const { server } = require('./socket');

module.exports = async function () {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Mongodb ga muvaffaqiyatli ulanish hosil qilindi...')
        const port = process.env.PORT || 5000;
        server.listen(port, () => console.log(`Loyiha http://localhost:${port} serverda ishlamoqda...`));
    } catch (error) {
        console.log('Mongodb ga ulanishda xatolik...', error);
    }
}