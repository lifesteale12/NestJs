import { registerAs } from "@nestjs/config";
import { IAppConfig } from "./interfaces/app-config.interface";

export const AppConfig = registerAs<IAppConfig>('app', () => {
    return {
        app_port: parseInt(process.env.APP_PORT) || 4001,
        app_name: 'NestJs',
        app_debug: process.env.DEBUG.toLowerCase() == 'true' ? true : false,
        secert: process.env.JWT_SECERT,
        secert_expries: process.env.JWT_SECERT_EXPIRES,
        secert_refresh: process.env.JWT_REFRESH_SECRET,
        secert_refresh_expries: process.env.JWT_REFRESH_SECRET_EXPIRES
    };
});

export default AppConfig;