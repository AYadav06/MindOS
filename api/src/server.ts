import express from 'express'
import { ConnectDB } from "./config/db";
import { ENV } from "./config/env";
import { userRouter } from './routes/UserRouter';
import { contentRouter } from './routes/ContentRouter';
import { brainRouter } from './routes/BrainRouter';
import { searchRouter } from './routes/SearchRouter';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { router } from './middleware/auth';
const app=express();

const corsOption={
origin:["http://localhost:3000","http://localhost:5173"],
methods:'GET,POST,PUT,DELETE',
credentials:true,
optionsSuccessStatus:204
};
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1",userRouter);
app.use("/api/v1/content",contentRouter);
app.use("/api/v1/brain",brainRouter);
app.use("/api/v1/search",searchRouter);
app.use("/user",router);

async function startServer(){
app.listen(ENV.PORT,()=>{
    ConnectDB();
    console.log(`Server is running on port ${ENV.PORT}`);
    
})
}
startServer();