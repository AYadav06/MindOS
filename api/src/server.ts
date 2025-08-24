import express from 'express'
import { ConnectDB } from "./config/db";
import { ENV } from "./config/env";
import { userRouter } from './routes/UserRouter';
import { contentTypes } from './models/user';
import { contentRouter } from './routes/ContentRouter';
import { brainRouter } from './routes/BrainRouter';

const app=express();

app.use(express.json())
app.use("/api/v1",userRouter);
app.use("/api/v1/content",contentRouter);
app.use("/api/v1/brain",brainRouter)


async function startServer(){
app.listen(ENV.PORT,()=>{
    ConnectDB();
    console.log(`Server is running on port ${ENV.PORT}`);
    
})
}
startServer();