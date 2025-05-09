import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class CreateDepartmentDto {
  @ApiProperty({ example: "Kardiologiya" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "Yurak kasalliklari bo'limi" })
  @IsString()
  @IsOptional()
  description: string;
}
