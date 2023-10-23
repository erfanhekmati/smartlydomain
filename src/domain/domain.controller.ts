import { Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DomainService } from './domain.service';

@ApiTags('Domain')
@ApiBearerAuth()
@Controller('domain')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Post('suggest-fake')
  @ApiOperation({ summary: 'Returns fake domain suggestions' })
  public async suggest() {
    return await this.domainService.suggestFakeDomains();
  }
}
