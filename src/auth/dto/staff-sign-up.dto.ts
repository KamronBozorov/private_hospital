import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsIn,
  IsNumber,
  IsDateString,
} from "class-validator";
import { Role } from "src/staffs/models/staff.model";

export class StaffSignUpDto {
  @ApiProperty({ example: "John", description: "Foydalanuvchi ismi" })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: "Doe", description: "Foydalanuvchi familiyasi" })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: "john.doe@example.com",
    description: "Foydalanuvchi emaili",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "password123", description: "Foydalanuvchi paroli" })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: "password123", description: "Foydalanuvchi paroli" })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

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

  @ApiProperty({ example: "Kardiolog" })
  @IsString()
  @IsOptional()
  specialization: string;

  @ApiProperty({ example: "LIC12345" })
  @IsString()
  @IsOptional()
  license_number: string;

  @ApiProperty({ example: "3-years" })
  @IsString()
  @IsOptional()
  experience: string;
}
