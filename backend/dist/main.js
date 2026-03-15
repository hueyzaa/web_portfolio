"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (!global.crypto) {
    try {
        global.crypto =
            require('crypto').webcrypto ||
                require('crypto');
    }
    catch (e) {
        console.error('Failed to polyfill crypto:', e);
    }
}
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('env.port') || 9999;
    const corsOrigin = configService.get('env.cors_origin');
    app.enableCors({
        origin: corsOrigin,
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    const uploadPath = configService.get('env.upload_path') || 'uploads';
    app.useStaticAssets((0, path_1.join)(process.cwd(), uploadPath), {
        prefix: `/${uploadPath}`,
    });
    await app.listen(port || 9999, '0.0.0.0');
    console.log(`Application is running on: http://localhost:${port || 9999}`);
    console.log(`External access: http://192.168.1.103:${port || 9999}`);
}
bootstrap().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map