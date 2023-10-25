import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainModule } from './domain/domain.module';
import { OpenaiModule } from './openai/openai.module';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './common/guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('mongo.connection.url'),
      }),
      inject: [ConfigService],
    }),
    DomainModule,
    OpenaiModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
    AppService,
  ],
})
export class AppModule {}
