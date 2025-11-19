// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { supabase } from "../db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/dishes", async (req, res) => {
  try {
    const { data, error } = await supabase.from("dishes").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("🔥 Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});