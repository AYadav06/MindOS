import express from 'express'
import { ConnectDB } from "./config/db";
import { ENV } from "./config/env";
import { userRouter } from './routes/UserRouter';
import { contentRouter } from './routes/ContentRouter';
import { brainRouter } from './routes/BrainRouter';
import { searchRouter } from './routes/SearchRouter';
import { analysisRouter } from './routes/AnalysisRouter';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { router } from './middleware/auth';
const app=express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:4173",
  "https://mindos.amitdev.site",
  "https://mind-os-two.vercel.app",
];

if (ENV.FRONTEND_URL) {
  allowedOrigins.push(ENV.FRONTEND_URL);
}

const corsOption: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      /\.vercel\.app$/.test(origin) ||
      /amitdev\.site$/.test(origin)
    ) {
      return callback(null, true);
    }
    return callback(null, false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1",userRouter);
app.use("/api/v1/content",contentRouter);
app.use("/api/v1/brain",brainRouter);
app.use("/api/v1/search",searchRouter);
app.use("/api/v1/analyze",analysisRouter);
app.use("/user",router);

app.get("/health",(req,res)=>{
    res.json({
        messaeg:"server is running ..."
    })
})
async function startServer(){
app.listen(ENV.PORT,()=>{
    ConnectDB();
    console.log(`Server is running on port ${ENV.PORT}`);
    
})
}
startServer();