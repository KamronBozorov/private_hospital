import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty, IsDateString } from "class-validator";

export class CreatePrescriptionDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  visit_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  doctor_id: number;

  @ApiProperty({ example: "2025-05-10T14:30:00Z" })
  @IsDateString()
  @IsNotEmpty()
  issue_date: Date;
}
