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

const allowedOrigins = ['http://localhost:5173'];

// MIDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins, credentials:true}));

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