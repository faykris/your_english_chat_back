import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  isModerator: boolean;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}