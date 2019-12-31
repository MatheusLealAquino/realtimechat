import { IsOptional } from "class-validator";

export class CreateChatDto {
  @IsOptional()
  readonly users?: any;
  @IsOptional()
  readonly messages?: any;
}