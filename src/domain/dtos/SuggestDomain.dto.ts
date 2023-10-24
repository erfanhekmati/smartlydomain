import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class SuggestDomainDto {
  @ApiProperty({ default: 'Your business description goes here.' })
  @IsString()
  @IsNotEmpty()
  @MinLength(30)
  @MaxLength(500)
  description: string;
}
