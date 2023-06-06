import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config'

import AppRouter from './routes/index';
import { connectMongo } from './config/database';
import { errorHandler } from './middleware/error-handler-middleware';
import cookieParser from 'cookie-parser';

const app = express();
const router = new AppRouter(app);

// Connect to MongoDB
connectMongo();

// Express configuration
app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(cookieParser());

router.init();

// Error handler
app.use(errorHandler) // This middleware should always remain the last one

const port = app.get('port');
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

export default server;
