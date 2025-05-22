import Score from "../models/Score.js";
import { submitScoreToBlockchain } from "../utils/blockchain.js";

export const submitScore = async (req, res) => {
  try {
    const { wallet, score } = req.body; // wallet olarak değiştirildi
    if (!wallet || typeof score !== "number") {
      return res.status(400).json({ message: "Geçersiz istek" });
    }

    let userScore = await Score.findOne({ wallet });

    if (!userScore) {
      userScore = new Score({ wallet, score });
    } else if (score > userScore.score) {
      userScore.score = score;
    } else {
      return res.status(200).json({ message: "Daha düşük skor gönderildi, güncellenmedi." });
    }

    await userScore.save();
    const success = await submitScoreToBlockchain(wallet, score);

    if (!success) {
      return res.status(500).json({ message: "Blockchain'e yazılamadı" });
    }

    return res.status(200).json({ message: "Skor kaydedildi" });
  } catch (error) {
    console.error("Skor gönderim hatası:", error);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const topScores = await Score.find().sort({ score: -1 }).limit(10);
    return res.status(200).json(topScores);
  } catch (error) {
    console.error("Liderlik tablosu hatası:", error);
    return res.status(500).json({ message: "Sunucu hatası" });
  }
};
