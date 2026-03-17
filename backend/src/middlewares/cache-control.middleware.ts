import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CacheControlMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const url = req.originalUrl || req.url;
    if (req.method === 'GET' || req.method === 'HEAD') {
      if (url.includes('/public/projects')) {
        res.setHeader('Cache-Control', 'public, max-age=3600');
      } else if (url.includes('/public/skills')) {
        res.setHeader('Cache-Control', 'public, max-age=600');
      } else if (url.includes('/public/news') || url.includes('/news')) {
        res.setHeader('Cache-Control', 'public, max-age=1800');
      } else if (
        url.includes('/public/profile') ||
        url.includes('/public/settings')
      ) {
        res.setHeader('Cache-Control', 'public, max-age=3600');
      }
    }
    next();
  }
}
