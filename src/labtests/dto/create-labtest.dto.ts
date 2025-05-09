import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class CreateLabtestDto {
  @ApiProperty({ example: "Qon tahlili" })
  @IsString()
  @IsNotEmpty()
  test_name: string;

  @ApiProperty({ example: "Umumiy qon tahlili" })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: 50.0 })
  @IsNumber()
  @IsOptional()
  standard_cost: number;
}
