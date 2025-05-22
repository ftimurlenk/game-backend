import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import scoreRoutes from "./routes/scoreRoutes.js";

dotenv.config();

const mongoURI = process.env.MONGO_URI;
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',  // Geliştirme aşamasında sorun çıkmaz, prod ortamda frontend URL'si yazılması daha güvenli
  credentials: true,
}));
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect(mongoURI, { dbName: 'game' })
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch((err) => console.error('MongoDB bağlantı hatası:', err));

// Route'lar
app.use('/api/scores', scoreRoutes);

// Ana endpoint
app.get('/', (req, res) => {
  res.send('2048 Game Backend Çalışıyor!');
});

// Sunucuyu başlat (burada sadece bir kez olmalı)
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
