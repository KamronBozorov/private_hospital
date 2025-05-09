import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from "class-validator";

export class CreateLaborderDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  visit_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  test_id: number;

  @ApiProperty({ example: "2025-05-10" })
  @IsDateString()
  @IsNotEmpty()
  order_date: Date;

  @ApiProperty({ example: "2025-05-12" })
  @IsDateString()
  @IsOptional()
  result_date: Date;
}
