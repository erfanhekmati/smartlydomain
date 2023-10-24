import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ChatCompletionRes,
  ChatCompletionResSchema,
} from './schemas/ChatCompletionRes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChatCompletionRes.name, schema: ChatCompletionResSchema },
    ]),
  ],
  providers: [OpenaiService],
  exports: [OpenaiService],
})
export class OpenaiModule {}
