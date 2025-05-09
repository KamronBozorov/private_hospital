import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateMedicalrecordDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  visit_id: number;

  @ApiProperty({ example: "Gripp tashxisi" })
  @IsString()
  @IsOptional()
  diagnosis: string;

  @ApiProperty({ example: "Davolash bo'yicha eslatmalar" })
  @IsString()
  @IsOptional()
  treatment_notes: string;
}
