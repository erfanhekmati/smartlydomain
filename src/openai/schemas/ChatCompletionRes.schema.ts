import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import {
  ChatCompletionChoiceInterface,
  ChatCompletionMessageInterface,
  ChatCompletionUsageInterface,
} from '../interfaces';

export type ChatCompletionResDocument = HydratedDocument<ChatCompletionRes>;

@Schema()
class ChatCompletionUsageDocument extends Document {
  @Prop({ required: true, type: Number })
  prompt_tokens: number;

  @Prop({ required: true, type: Number })
  completion_tokens: number;

  @Prop({ required: true, type: Number })
  total_tokens: number;
}
const UsageSchema = SchemaFactory.createForClass(ChatCompletionUsageDocument);

@Schema()
class ChatCompletionMessageDocument extends Document {
  @Prop({ required: true, type: String })
  role: string;

  @Prop({ required: true, type: String })
  content: string;
}
const MessageSchema = SchemaFactory.createForClass(
  ChatCompletionMessageDocument,
);

@Schema()
class ChatCompletionChoiceDocument extends Document {
  @Prop({ required: true, type: Number })
  index: number;

  @Prop({ required: true, type: MessageSchema })
  message: ChatCompletionMessageInterface;

  @Prop({ required: true, type: String })
  finish_reason: string;
}
const ChoiceSchema = SchemaFactory.createForClass(ChatCompletionChoiceDocument);

@Schema()
export class ChatCompletionRes {
  @Prop({ required: true, type: String })
  gptId: string;

  @Prop({ required: true, type: String })
  object: string;

  @Prop({ required: true, type: Number })
  created: number;

  @Prop({ required: true, type: String })
  model: string;

  @Prop({ required: true, type: [ChoiceSchema] })
  choices: ChatCompletionChoiceInterface[];

  @Prop({ required: true, type: UsageSchema })
  usage: ChatCompletionUsageInterface;

  @Prop({ required: true, type: [MessageSchema] })
  promptMessages: ChatCompletionMessageInterface[];

  @Prop({ required: true, type: String })
  description: string;
}

export const ChatCompletionResSchema =
  SchemaFactory.createForClass(ChatCompletionRes);
