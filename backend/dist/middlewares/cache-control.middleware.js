"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheControlMiddleware = void 0;
const common_1 = require("@nestjs/common");
let CacheControlMiddleware = class CacheControlMiddleware {
    use(req, res, next) {
        const url = req.originalUrl || req.url;
        if (req.method === 'GET' || req.method === 'HEAD') {
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
    }
};
exports.CacheControlMiddleware = CacheControlMiddleware;
exports.CacheControlMiddleware = CacheControlMiddleware = __decorate([
    (0, common_1.Injectable)()
], CacheControlMiddleware);
//# sourceMappingURL=cache-control.middleware.js.map