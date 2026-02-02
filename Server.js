import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import Lead from './models/Lead.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection (CORRECT)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

 

// ✅ API Route
app.post('/api/leads', async (req, res) => {
  console.log("POST /api/leads hit");
  console.log("Body:", req.body);
 

  try {
    const { name, reg, field, location, tel, email,wWebsite, app } = req.body;

    const lead = new Lead({ name, reg, field, location, tel, email,wWebsite, app });
    await lead.save();

    console.log("✅ Saved to MongoDB");

    res.status(201).json({ message: 'Lead saved successfully' });
  } catch (err) {
    console.error("❌ Save error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
