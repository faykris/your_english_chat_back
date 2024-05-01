import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SendMessageDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  role: number;

  @IsNotEmpty()
  @MinLength(1)
  message: string;
}