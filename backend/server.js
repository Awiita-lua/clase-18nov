const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { supabase } = require("../db.js"); // ← mismo directorio

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Tus rutas aquí...
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
  console.log(`✅ Servidor en http://localhost:${PORT}`);
});