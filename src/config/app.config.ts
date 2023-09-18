import { registerAs } from "@nestjs/config";
import { IAppConfig } from "./interfaces/app-config.interface";

export const AppConfig = registerAs<IAppConfig>('app', () => {
    return {
        app_port: parseInt(process.env.APP_PORT) || 4001,
        app_name: 'NestJs',
    };
});

export default AppConfig;