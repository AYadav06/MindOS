import dotenv from 'dotenv'
dotenv.config();

export const ENV={
    PORT:process.env.PORT || 3000,
    MONGODB_URL:process.env.MONGODB_URL ||'',
    JWT_SECRETE:process.env.JWT_SECRETE ||'defaultSecret',
    COOKIE_NAME:"token"

}