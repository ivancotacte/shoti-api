import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import { limiter } from './src/middlewares/rateLimiter.js';
import { connectToDatabase } from './src/db/mongoConnection.js';
import { router } from './src/routes/shotiRoutes.js';
dotenv.config();

connectToDatabase();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use('/api/', limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});