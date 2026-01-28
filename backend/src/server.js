// const express = require('express');

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()); // req.body
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes); //make ready for deployment
if (process.env.NODE_ENV === 'production') { app.use(express.static(path.join(__dirname, '../../frontend/dist')));
    app.get('*', (_, res) => { res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
        
    });
}

(async () => {
    try {
        await connectDB();
        app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to database:', error);
        process.exit(1);
    }
})();