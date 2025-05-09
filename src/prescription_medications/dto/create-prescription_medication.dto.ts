import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreatePrescriptionMedicationDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  visit_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  prescription_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  medication_id: number;

  @ApiProperty({ example: "1 tablet" })
  @IsString()
  @IsOptional()
  dosage: string;

  @ApiProperty({ example: "Kuni 2 marta" })
  @IsString()
  @IsOptional()
  frequency: string;

  @ApiProperty({ example: 7 })
  @IsNumber()
  @IsOptional()
  duration_days: number;
}
