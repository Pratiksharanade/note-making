import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import noteRoutes from './Routes/NoteRoutes.js'; // ✅ use .js extension
import upload from './middleware/upload.js'; // ✅ use .js extension
import UserRoutes from './Routes/UserRoutes.js';


dotenv.config();
const app = express();
app.use('/uploads', express.static('uploads'));
app.use(cors());  
app.use(express.json());
app.use('/api/notes', noteRoutes);
app.use('/api/users', UserRoutes);
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection failed:', err));
