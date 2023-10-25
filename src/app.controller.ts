import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from './common/decorators/is-public.decorator';

@ApiTags('Global')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ping')
  @IsPublic()
  ping() {
    return this.appService.ping();
  }
}
