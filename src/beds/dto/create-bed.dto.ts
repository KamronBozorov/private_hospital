import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from "class-validator";

export class CreateBedDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  room_id: number;

  @ApiProperty({ example: "B1" })
  @IsString()
  @IsNotEmpty()
  bed_number: string;

  @ApiProperty({
    example: "AVAILABLE",
    description: "Holati (AVAILABLE, OCCUPIED)",
  })
  @IsEnum(["AVAILABLE", "OCCUPIED"])
  @IsOptional()
  status: string;
}
