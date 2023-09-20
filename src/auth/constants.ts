require('dotenv').config();

export const jwtConstants = {
    secret: process.env.JWT_SECERT,
    secret_refresh: process.env.JWT_REFRESH_SECRET,
    expire_secret: process.env.JWT_SECERT_EXPIRES,
    expire_secret_refresh: process.env.JWT_REFRESH_SECRET_EXPIRES,
};