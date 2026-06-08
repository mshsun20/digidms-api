import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

const apienv = process.env.NODE_ENV || 'development';
let access='', refresh=''

switch(apienv) {
    case "development":
        access = String(process.env.ACCESS_EXP_DEV);
        refresh = String(process.env.REFRESH_EXP_DEV);
        break;
    case "quality":
        access = String(process.env.ACCESS_EXP_QAS);
        refresh = String(process.env.REFRESH_EXP_QAS);
        break;
    case "production":
        access = String(process.env.ACCESS_EXP_PRD);
        refresh = String(process.env.REFRESH_EXP_PRD);
        break;
}
// const access = env === 'dev' ? String(process.env.ACCESS_EXP_DEV) : String(process.env.ACCESS_EXP_LIVE);
// const refresh = env === 'dev' ? String(process.env.REFRESH_EXP_DEV) : String(process.env.REFRESH_EXP_LIVE);

export const generateAccessToken = (user) => {
    return jwt.sign({ sessacc: user._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: `${access}m` });
};

export const generateRefreshToken = (user) => {
    return jwt.sign({ sessacc: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: `${refresh}d` });
};

export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
