import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsOptional,
  IsDateString,
  IsNumber,
  IsIn,
} from "class-validator";
import { Role } from "../models/staff.model";

export class CreateStaffDto {
  user_id: number;

  @ApiProperty({
    example: "doctor",
    description: "Roli (doctor, nurse, technician, creator, admin)",
  })
  @IsIn(["doctor", "nurse", "technician", "creator", "admin"])
  role: Role;

  @ApiProperty({ example: "+998901234567" })
  @IsString()
  @IsOptional()
  contact_info: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  department_id: number;

  @ApiProperty({ example: "2025-01-01" })
  @IsDateString()
  @IsOptional()
  hire_date: Date;
}
