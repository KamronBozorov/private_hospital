import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  IsString,
  IsIn,
} from "class-validator";

export class CreateVisitDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  patient_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  doctor_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  room_id: number;

  @ApiProperty({ example: "2025-05-10" })
  @IsDateString()
  @IsNotEmpty()
  visit_date: Date;

  @ApiProperty({
    example: "scheduled",
    description: "Holati (scheduled, completed, canceled)",
  })
  @IsIn(["scheduled", "completed", "canceled"])
  @IsOptional()
  visit_type: string;

  @ApiProperty({ example: "Tashrif haqida eslatmalar" })
  @IsString()
  @IsOptional()
  notes: string;

  @ApiProperty({
    example: "SCHEDULED",
    description: "Holati (SCHEDULED, COMPLETED)",
  })
  @IsEnum(["SCHEDULED", "COMPLETED"])
  @IsOptional()
  status: string;
}
