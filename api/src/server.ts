import express from 'express'
import { ConnectDB } from "./config/db";
import { ENV } from "./config/env";
import { userRouter } from './routes/UserRouter';

const app=express();

app.use(express.json())
app.use("/api",userRouter);

async function startServer(){
app.listen(ENV.PORT,()=>{
    ConnectDB();
    console.log(`Server is running on port ${ENV.PORT}`);
})
}
startServer();