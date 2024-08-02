# FREEGRAM BACKEND

FREEGRAM BACKEND – FREEGRAM ilovasi uchun mo'ljallangan kuchli backend yechimidir. Ushbu repozitoriya ilovaning funktsiyalarini qo'llab-quvvatlaydigan server tomonidagi mantiq va API endpointlarini taqdim etadi.

## Xususiyatlar

- **Foydalanuvchi Tashkiliyati**: JWT yordamida xavfsiz kirish va ro'yxatdan o'tish funksiyalari.
- **Postlarni Boshqarish**: Postlarni yaratish, o'qish, yangilash va o'chirish.
- **Foydalanuvchi Profilini Boshqarish**: Foydalanuvchi profillarini boshqarish va boshqalarni kuzatish/izlash.
- **Izohlar va Yoqtirishlar**: Postlarga izohlar qo'shish va yoqtirishlar.
- **Haqiqiy Vaqt Yangilanishlari**: Postlar va bildirishnomalarda haqiqiy vaqt yangilanishlarini qo'llab-quvvatlash.

## Ishga Tushirish

### Talablar

- Node.js (v14.x yoki yuqori)
- MongoDB (mahalliy yoki bulutdagi versiya)

### O'rnatish

1. Repozitoriyani klonlash:

   ```bash
   git clone https://github.com/elmurodvokhidov/FREEGRAM-BACKEND.git
   ```

2. Loyihalar katalogiga o'tish:

   ```bash
   cd FREEGRAM-BACKEND
   ```

3. Kerakli bog'liqliklarni o'rnatish:

   ```bash
   npm install
   ```

4. Loyihaning ildiz katalogida `.env` faylini yarating va atrof-muhit o'zgaruvchilarini qo'shing:

   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=your_preferred_port
   ```

5. Serverni ishga tushiring:

   ```bash
   npm start
   ```

   Server sizning `.env` faylingizda ko'rsatilgan portda (standart `3000`) ishga tushadi.

## API Endpoints

- **POST /api/auth/register**: Yangi foydalanuvchini ro'yxatdan o'tkazish.
- **POST /api/auth/login**: Foydalanuvchini autentifikatsiya qilish va JWT token qaytarish.
- **GET /api/posts**: Barcha postlarni olish.
- **POST /api/posts**: Yangi post yaratish.
- **GET /api/posts/:id**: Ma'lum bir postni ID bo'yicha olish.
- **PUT /api/posts/:id**: Ma'lum bir postni ID bo'yicha yangilash.
- **DELETE /api/posts/:id**: Ma'lum bir postni ID bo'yicha o'chirish.
- **POST /api/posts/:id/like**: Ma'lum bir postni yoqtirish.
- **POST /api/posts/:id/comment**: Ma'lum bir postga izoh qo'shish.
- **GET /api/users/:id**: Ma'lum bir foydalanuvchi profilini ID bo'yicha olish.
- **PUT /api/users/:id**: Ma'lum bir foydalanuvchi profilini ID bo'yicha yangilash.
- **POST /api/users/:id/follow**: Foydalanuvchini kuzatish.
- **POST /api/users/:id/unfollow**: Foydalanuvchini kuzatishni to'xtatish.

## Hissa Qo'shish

Hissa qo'shishlar xush kelibsiz! Iltimos, repozitoriyani forking qiling va o'zgarishlaringiz bilan pull request yuboring. Kodlash standartlariga rioya qiling va aniq commit xabarlari yozing.

## Litsenziya

Ushbu loyiha MIT Litsenziyasi asosida litsenziyalangan - batafsil ma'lumot uchun [LICENSE](LICENSE) faylini ko'rib chiqing.

## Aloqa

Har qanday savollar yoki muammolar uchun [elmurodvokhidov@gmail.com](mailto:elmurodvokhidov@gmail.com) elektron pochta manziliga murojaat qiling.