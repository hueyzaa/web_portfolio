"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheHeaderInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let CacheHeaderInterceptor = class CacheHeaderInterceptor {
    intercept(context, next) {
        const response = context.switchToHttp().getResponse();
        const request = context.switchToHttp().getRequest();
        return next.handle().pipe((0, operators_1.tap)(() => {
            console.log(`Checking request: ${request.method} ${request.url}`);
            if (request.method === 'GET' &&
                (request.url.includes('/public/') || request.url.includes('/news'))) {
                console.log(`Setting headers for ${request.url}`);
                if (request.url.includes('projects')) {
                    response.setHeader('Cache-Control', 'public, max-age=3600');
                }
                else if (request.url.includes('skills')) {
                    response.setHeader('Cache-Control', 'public, max-age=600');
                }
                else if (request.url.includes('news')) {
                    response.setHeader('Cache-Control', 'public, max-age=1800');
                }
                else {
                    response.setHeader('Cache-Control', 'public, max-age=300');
                }
            }
        }));
    }
};
exports.CacheHeaderInterceptor = CacheHeaderInterceptor;
exports.CacheHeaderInterceptor = CacheHeaderInterceptor = __decorate([
    (0, common_1.Injectable)()
], CacheHeaderInterceptor);
//# sourceMappingURL=cache-header.interceptor.js.map