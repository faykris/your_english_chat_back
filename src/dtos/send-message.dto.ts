import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SendMessageDto {
  @IsNotEmpty()
  @IsString()
  classroomId: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  isModerator: boolean;

  @IsNotEmpty()
  @MinLength(1)
  message: string;
}