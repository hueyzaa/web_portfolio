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
    app.use((req, res, next) => {
        if (req.method === 'GET' || req.method === 'HEAD') {
            const url = req.originalUrl || req.url;
            if (url.includes('/public/projects')) {
                res.setHeader('Cache-Control', 'public, max-age=3600');
            }
            else if (url.includes('/public/skills')) {
                res.setHeader('Cache-Control', 'public, max-age=600');
            }
            else if (url.includes('/public/news') || url.includes('/news')) {
                res.setHeader('Cache-Control', 'public, max-age=1800');
            }
            else if (url.includes('/public/profile') ||
                url.includes('/public/settings')) {
                res.setHeader('Cache-Control', 'public, max-age=3600');
            }
        }
        next();
    });
    const configService = app.get(config_1.ConfigService);
    const port = process.env.PORT || 9999;
    const corsOrigin = configService.get('env.cors_origin');
    app.enableCors({
        origin: corsOrigin,
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
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