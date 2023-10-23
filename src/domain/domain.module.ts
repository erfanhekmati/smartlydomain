import { Module } from '@nestjs/common';
import { DomainController } from './domain.controller';
import { DomainService } from './domain.service';

@Module({
  controllers: [DomainController],
  providers: [DomainService]
})
export class DomainModule {}
