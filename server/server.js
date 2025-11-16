// REAL IMPORT
import express from 'express';
import cors from 'cors';
import  dotenv from 'dotenv/config';
import cookieParser from 'cookie-parser';

// IMPORTED FROM FOLDERS
import { connectDB } from './config/mongoDbConnection.js';
import {authRouter} from './routes/authRoutes.js'
import userRouter from './routes/userRoute.js';

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'https://mern-authentication-system-jw.vercel.app',
  'https://mern-authentication-system-jw.vercel.app/*'
];

// MIDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like curl, mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Api Endpoints
app.get('/', (req, res) => {   
    res.send('<h1>Hello World!</h1>');
})
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(PORT, ()=> {
    console.log(`server is running on port http://localhost:${PORT}`);
}
)