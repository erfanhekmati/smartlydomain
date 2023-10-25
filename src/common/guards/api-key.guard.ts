import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) return true;

    const apiKeys: string[] = this.configService.get('app.apiKeys');
    if (apiKeys == undefined || apiKeys.includes('')) return false;

    const request: any = context.switchToHttp().getRequest();
    const parts: string[] = String(request.headers['authorization']).split(' ');
    if (parts.length == 2 && parts[0].toLowerCase() == 'bearer')
      return apiKeys.includes(parts[1]);
    return false;
  }
}
