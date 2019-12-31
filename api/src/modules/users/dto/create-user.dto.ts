import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly email: string;
  @IsString()
  password: string;
  @IsOptional()
  readonly chats?: any;
  @IsOptional()
  readonly roles?: any;
}