import OpenAI from 'openai';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatCompletionRes } from './schemas/ChatCompletionRes.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  ChatCompletion as ChatCompletionType,
  ChatCompletionMessageParam,
} from 'openai/resources/chat/completions';

@Injectable()
export class OpenaiService {
  private readonly openai: OpenAI;

  constructor(
    @InjectModel(ChatCompletionRes.name)
    private openAiResModel: Model<ChatCompletionRes>,
    private readonly configService: ConfigService,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('openai.apiKey'),
    });
  }

  private saveChatCompletionRes(
    result: ChatCompletionType,
    promptMessages: ChatCompletionMessageParam[],
    description: string,
  ) {
    const { id, ...rest } = result;
    this.openAiResModel.create({
      gptId: id,
      ...rest,
      promptMessages,
      description,
    });
  }

  public async generateDomainNames(description: string): Promise<string[]> {
    let domainNames: string[] = [];
    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content:
          'You are a brand name assistant. Users provide you with details about their business, and in response, you generate a range of 3 to 5 brand names for them. desired pattern is json array. desired pattern should start with [ and end with ].',
      },
      { role: 'user', content: `Business is about ${description}` },
    ];
    const model: string = 'gpt-3.5-turbo';

    try {
      // Send request to OpenAi
      const chatCompletion = await this.openai.chat.completions.create({
        messages: messages,
        model: model,
      });

      // Save response on MongoDB
      this.saveChatCompletionRes(chatCompletion, messages, description);

      // Fetch brand names
      const { message, finish_reason } = chatCompletion.choices[0];
      if (finish_reason == 'stop') domainNames = JSON.parse(message.content);
      else Logger.error(chatCompletion);
    } catch (ex) {
      Logger.error(ex);
      throw new InternalServerErrorException('Oops! Something went wrong.');
    }

    return domainNames.map((item) => item.replace(' ', ''));
  }
}
