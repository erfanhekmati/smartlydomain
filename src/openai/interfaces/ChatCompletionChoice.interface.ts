import { ChatCompletionMessageInterface } from './ChatCompletionMessage.interface';

export interface ChatCompletionChoiceInterface {
  index: number;
  message: ChatCompletionMessageInterface;
  finish_reason: string;
}
