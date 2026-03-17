"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../../app.module");
const auth_service_1 = require("../../modules/auth/auth.service");
const User_entity_1 = require("../../database/entities/User.entity");
const typeorm_1 = require("@nestjs/typeorm");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const authService = app.get(auth_service_1.AuthService);
    const userRepository = app.get((0, typeorm_1.getRepositoryToken)(User_entity_1.User));
    const username = 'admin';
    const password = '123';
    const existingUser = await userRepository.findOne({ where: { username } });
    if (existingUser) {
        console.log('Admin user already exists');
    }
    else {
        const hashedPassword = await authService.hashPassword(password);
        const newUser = userRepository.create({
            username,
            password: hashedPassword,
            fullName: 'Administrator',
        });
        await userRepository.save(newUser);
        console.log('Admin user created successfully');
        console.log('Username: admin');
        console.log('Password: 123');
    }
    await app.close();
}
bootstrap().catch(console.error);
//# sourceMappingURL=seed-admin.js.map