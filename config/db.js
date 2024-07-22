const mongoose = require('mongoose');

module.exports = async function (app) {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Mongodb ga muvaffaqiyatli ulanish hosil qilindi...')
        const port = process.env.PORT || 5000;
        app.listen(port, () => console.log(`Loyiha http://localhost:${port} serverda ishlamoqda...`));
    } catch (error) {
        console.log('Mongodb ga ulanishda xatolik...', error);
    }
}