import { IsString, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly email: string;
  @IsString()
  password: string;
  readonly chats?: any;
  readonly roles?: any;
}