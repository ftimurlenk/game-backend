// blockchain.js
import { ethers } from "ethers";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// __dirname simülasyonu (ESM için)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// JSON dosyasını oku
const abiPath = path.join(__dirname, "../abi/GameScores.json");
const GameScoresABI = JSON.parse(fs.readFileSync(abiPath, "utf-8"));

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.BACKEND_PRIVATE_KEY, provider);
const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  GameScoresABI.abi,
  wallet
);

export const submitScoreToBlockchain = async (walletAddress, score) => {
  try {
    const tx = await contract.submitScoreByBackend(walletAddress, score);
    await tx.wait();
    return true;
  } catch (error) {
    console.error("Blockchain'e skor yazılamadı:", error);
    return false;
  }
};
