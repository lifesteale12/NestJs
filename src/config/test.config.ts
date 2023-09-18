import { registerAs } from "@nestjs/config";
import { ITestConfig } from "./interfaces/test-config.interfaces";

export const TestConfig = registerAs<ITestConfig>('test', () => {
    return {
        name: 'NestJS',
        version: '1.0.0',
    };
});

export default TestConfig;