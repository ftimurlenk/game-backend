import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  wallet: { type: String, required: true },
  score: { type: Number, required: true },
  savedToBlockchain: { type: Boolean, default: false }
});

const Score = mongoose.model('Score', scoreSchema);

export default Score;
