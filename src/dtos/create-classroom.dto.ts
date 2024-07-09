import { IsNotEmpty, IsString, IsUrl, MinLength } from 'class-validator';

export class CreateClassroomDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  description: string;

  @IsNotEmpty()
  @IsString()
  createdBy: string;

  @IsNotEmpty()
  @IsUrl()
  videoUrl: string;
}