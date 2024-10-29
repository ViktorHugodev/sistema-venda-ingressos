import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['x-api-token'];
    console.warn(
      '🚀 ~ file: auth.guard.ts:10 ~ AuthGuard ~ canActivate ~ token:',
      token,
    );
    return token === this.configService.get('API_TOKEN');
  }
}
