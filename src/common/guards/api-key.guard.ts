import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly confidService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const apiKeys: string[] = this.confidService.get('app.apiKeys');
    if (apiKeys == undefined || apiKeys.includes('')) return false;

    const request: any = context.switchToHttp().getRequest();
    const parts: string[] = String(request.headers['authorization']).split(' ');
    if (parts.length == 2 && parts[0].toLowerCase() == 'bearer')
      return apiKeys.includes(parts[1]);
    return false;
  }
}
