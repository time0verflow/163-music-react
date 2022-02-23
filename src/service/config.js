//开发环境和生存环境url的配置
const devBaseURL = "https://music-api.heheda.top/";
const proBaseURL = "https://music-api.heheda.top/";

export const BASE_URL =
    process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL;

export const TIMEOUT = 8000;
