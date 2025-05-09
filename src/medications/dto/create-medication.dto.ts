import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
  IsIn,
} from "class-validator";

export class CreateMedicationDto {
  @ApiProperty({ example: "Paracetamol" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "Og'riq qoldiruvchi dori" })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: "PharmaCorp" })
  @IsString()
  @IsOptional()
  manufacturer: string;

  @ApiProperty({
    example: "tablet",
    description: "Dozaj shakli (tablet, capsule, liquid, injection, topical)",
  })
  @IsIn(["tablet", "capsule", "liquid", "injection", "topical"])
  dosage_form: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsOptional()
  stock_quantity: number;
}
