import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DomainService } from './domain.service';
import { SuggestDomainDto } from './dtos';

@ApiTags('Domain')
@ApiBearerAuth()
@Controller('domain')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Post('suggest-fake')
  @ApiOperation({ summary: 'Returns fake domain suggestions' })
  public async suggestFake() {
    return await this.domainService.suggestFakeDomains();
  }

  @Post('suggest')
  @ApiOperation({ summary: 'Returns domain suggestions for descriptipn' })
  public async suggest(@Body() { description }: SuggestDomainDto) {
    return await this.domainService.suggestDomains(description);
  }
}
